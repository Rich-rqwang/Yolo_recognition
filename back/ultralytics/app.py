import logging
import os
import shutil
import time
import uuid

import cv2
import oss2
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from moviepy.editor import ImageSequenceClip
from volcenginesdkarkruntime import Ark

from ultralytics import YOLO

# 设置环境变量
os.environ['VOLC_ACCESSKEY'] = ''
os.environ['VOLC_SECRETKEY'] = ''

# Flask 应用初始化
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# 设置日志
logging.basicConfig(level=logging.INFO)

# 目录和路径
WEIGHTS_DIR = 'PtSource'
UPLOAD_DIR = 'uploads'
RESULTS_DIR = 'runs/predict/latest'

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

# 阿里云 OSS 配置
access_key_id = ''
access_key_secret = ''
bucket_name = ''
endpoint = ''

auth = oss2.Auth(access_key_id, access_key_secret)
bucket = oss2.Bucket(auth, endpoint, bucket_name)

# 大模型 API 客户端
client = Ark(
    base_url="https://ark.cn-beijing.volces.com/api/v3",
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect():
    """处理文件上传、模型预测和结果返回。"""
    if 'source' not in request.files:
        logging.error("No file part in request")
        return jsonify({"error": "No file part"}), 400

    file = request.files['source']
    weight_file = request.form.get('weight_file', '烟雾.pt')
    file_type = request.form.get('fileType', 'image')  # 默认为 'image'
    user_query = request.form.get('userQuery', '这是哪里？')  # 用户输入的问题

    logging.info(f"Received file: {file.filename}, weight_file: {weight_file}, file_type: {file_type}, user_query: {user_query}")

    if file.filename == '':
        logging.error("No selected file")
        return jsonify({"error": "No selected file"}), 400

    # 生成唯一的文件名
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    source_path = os.path.join(UPLOAD_DIR, unique_filename)
    file.save(source_path)

    # 清理输出目录
    clean_results_dir()

    try:
        # 加载 YOLO 模型
        model = YOLO(os.path.join(WEIGHTS_DIR, weight_file))
        logging.info(f"Model loaded successfully: {weight_file}")

        # 处理图片或视频
        if file_type == 'video':
            result_path = process_video(model, source_path)  # 处理视频
        else:
            result_path = process_image(model, source_path)  # 处理图像

        # 上传到阿里云 OSS
        oss_file_name = f"{uuid.uuid4()}_{os.path.basename(result_path)}"
        bucket.put_object_from_file(oss_file_name, result_path)
        oss_url = f'https://{bucket_name}.{endpoint}/{oss_file_name}?t={int(time.time())}'

        logging.info(f"File processed and uploaded. OSS URL: {oss_url}")

        # 清理临时文件
        safe_delete(source_path)
        safe_delete(result_path)

        return jsonify({"result": oss_url})

    except Exception as e:
        logging.error(f"Error processing file: {str(e)}")
        return jsonify({"error": str(e)}), 500

def process_video(model, source_path):
    """处理视频文件。"""
    cap = cv2.VideoCapture(source_path)
    if not cap.isOpened():
        logging.error(f"Failed to open video file: {source_path}")
        raise ValueError(f"Failed to open video file: {source_path}")

    fps = cap.get(cv2.CAP_PROP_FPS)
    frames = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        results = model.predict(frame, save=False, imgsz=640, conf=0.25, iou=0.45)
        if results is None or len(results) == 0:
            logging.error(f"Model prediction failed for frame")
            raise ValueError(f"Model prediction failed for frame")
        annotated_frame = results[0].plot()
        frames.append(annotated_frame)

    cap.release()

    # 生成唯一的文件名
    result_file_path = os.path.join(RESULTS_DIR, f'processed_video_{uuid.uuid4()}.mp4')
    processed_video = ImageSequenceClip(frames, fps=fps)
    try:
        processed_video.write_videofile(result_file_path, codec='libx264')
        logging.info(f"Video saved successfully: {result_file_path}")
    except Exception as e:
        logging.error(f"Error saving video: {str(e)}")
        raise e

    return result_file_path

def process_image(model, source_path):
    """处理图片文件。"""
    results = model.predict(source_path, imgsz=640, conf=0.3, iou=0.5)
    annotated_image = results[0].plot()

    # 生成唯一的文件名
    result_file_path = os.path.join(RESULTS_DIR, f'processed_image_{uuid.uuid4()}.jpg')

    # 安全写入文件，确保文件释放
    try:
        cv2.imwrite(result_file_path, annotated_image)
        logging.info(f"Image saved successfully: {result_file_path}")
    except Exception as e:
        logging.error(f"Error saving image: {str(e)}")
        raise e

    return result_file_path

def clean_results_dir():
    """清理 RESULTS_DIR 目录中的文件。"""
    if os.path.exists(RESULTS_DIR):
        try:
            for filename in os.listdir(RESULTS_DIR):
                file_path = os.path.join(RESULTS_DIR, filename)
                safe_delete(file_path)
            time.sleep(0.1)  # 等待文件系统释放资源
        except Exception as e:
            logging.error(f"Failed to clean RESULTS_DIR: {str(e)}")

def safe_delete(file_path):
    """安全地删除文件或目录。"""
    if os.path.exists(file_path):
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
            logging.info(f"Deleted: {file_path}")
        except Exception as e:
            logging.error(f"Failed to delete {file_path}. Reason: {str(e)}")

def remove_stars(text):
    """移除字符串中的星号。"""
    return text.replace('*', '')

def analyze_image(base64_image, user_query):
    """处理大模型分析请求。"""
    try:
        response = client.chat.completions.create(
            model="ep-20241226005252-vwwfd",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_query},
                        {
                            "type": "image_base64",
                            "image_base64": {
                                "base64": base64_image,
                                "image_type": "jpeg"
                            }
                        },
                    ],
                }
            ],
            extra_headers={'x-is-encrypted': 'true'},
        )

        analysis_result = response.choices[0].message.content
        return remove_stars(analysis_result)

    except Exception as e:
        logging.error(f"Error analyzing image: {str(e)}")
        raise e

@app.route('/analyze', methods=['POST'])
def analyze_endpoint():
    """处理大模型分析请求。"""
    data = request.json
    user_query = data.get('userQuery')
    image_url = data.get('imageUrl')

    if not user_query or not image_url:
        return jsonify({"error": "Missing user query or image URL"}), 400

    try:
        response = client.chat.completions.create(
            model="ep-20241226005252-vwwfd",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": user_query},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url
                            }
                        },
                    ],
                }
            ],
            extra_headers={'x-is-encrypted': 'true'},
        )

        analysis_result = response.choices[0].message.content
        return jsonify({"analysis_result": remove_stars(analysis_result)})

    except Exception as e:
        logging.error(f"Error analyzing image: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=8080, debug=True)
