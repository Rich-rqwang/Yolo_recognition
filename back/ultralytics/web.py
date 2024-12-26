import cv2
import os
import shutil
from moviepy.editor import VideoFileClip, ImageSequenceClip
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import base64
#缺少添加AI功能
app = Flask(__name__)  # 满足跨域措施
CORS(app, resources={r"/*": {"origins": "*"}})

WEIGHTS_DIR = 'PtSource'
UPLOAD_DIR = 'uploads'
RESULTS_DIR = 'runs/predict/latest'

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
if not os.path.exists(RESULTS_DIR):
    os.makedirs(RESULTS_DIR)

@app.route('/detect', methods=['POST'])
def detect():
    weight_file = request.form.get('weight_file')
    file = request.files.get('source')

    print("Received weight_file:", weight_file)
    print("Received file:", file)

    if not weight_file or not file:
        return jsonify({"error": "Missing weight_file or source parameter"}), 400

    weight_path = os.path.join(WEIGHTS_DIR, weight_file)
    if not os.path.exists(weight_path):
        return jsonify({"error": f"Weight file {weight_file} not found"}), 404

    source_path = os.path.join(UPLOAD_DIR, file.filename)
    file.save(source_path)

    if os.path.exists(RESULTS_DIR):
        shutil.rmtree(RESULTS_DIR)
    os.makedirs(RESULTS_DIR)

    model = YOLO(weight_path)

    # 处理视频文件
    if file.filename.lower().endswith(('.mp4', '.avi', '.mov', '.flv', '.wmv')):
        cap = cv2.VideoCapture(source_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        frames = []

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            results = model.predict(frame, save=False, imgsz=640, conf=0.25, iou=0.45)
            annotated_frame = results[0].plot()
            frames.append(annotated_frame)

        cap.release()

        if not frames:
            return jsonify({"error": "No frames processed, video might be corrupted or empty"}), 400

        processed_video = ImageSequenceClip(frames, fps=fps)
        result_file_path = os.path.join(RESULTS_DIR, 'processed_' + file.filename)
        processed_video.write_videofile(result_file_path, codec='libx264')

        with open(result_file_path, "rb") as video_file:
            base64_encoded_result = base64.b64encode(video_file.read()).decode('utf-8')

    # 处理图像文件
    elif file.filename.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp', '.gif')):
        image = cv2.imread(source_path)
        results = model.predict(source_path, imgsz=640, conf=0.3, iou=0.5)
        annotated_image = results[0].plot()

        # 保存结果图像
        result_file_path = os.path.join(RESULTS_DIR, file.filename)
        cv2.imwrite(result_file_path, annotated_image)

        # 将处理后的图像转换为Base64格式
        with open(result_file_path, "rb") as image_file:
            base64_encoded_result = base64.b64encode(image_file.read()).decode('utf-8')

    else:
        return jsonify({"error": "Unsupported file format"}), 400

    try:
        os.remove(source_path)
        print("Uploaded file deleted:", source_path)
    except Exception as e:
        print("Error deleting file:", e)

    return jsonify({"result": base64_encoded_result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
