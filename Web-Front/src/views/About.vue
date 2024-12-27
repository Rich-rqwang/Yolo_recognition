<template>
    <div class="background">
      <div id="Adout" class="container">
        <h2>我们的团队</h2>
        <div class="team">
          <div class="team-member" v-for="(member, index) in teamMembers" :key="index">
            <img :src="member.avatar" alt="Avatar" class="avatar" />
            <h3 class="name">{{ member.name }}</h3>
            <p class="position">{{ member.position }}</p>
            <p class="description">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          name: '王芮祺',
          position: '组长',
          avatar:  require('@/assets/figure/女B.png'),
          description: '负责整个项目的规划，及数据集训练，前端界面美化。'
        },
        {
          name: '李晓行',
          position: '前端开发',
          avatar:require('@/assets/figure/男B.png'),
          description: '负责前端开发和用户界面的设计。'
        },
        {
          name: '林泓宇',
          position: '后端开发',
          avatar: require('@/assets/figure/男A.png'),
          description: '负责后端架构和整合。'
        },
        {
          name: '方琳涵',
          position: '后端开发',
          avatar: require('@/assets/figure/女.png'),
          description: '负责后端架构和数据库管理。'
        }
      ]
    };
  }
}
</script>

<style scoped>
.background {
  background-color: #000; /* 整个背景变黑 */
  height: 1500px;
}
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #000000; /* 设置背景为黑色 */
  padding-top: 20px;
  padding-bottom: 200px;
}

h2 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
}

.team {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.team-member {
  width: 200px;
  text-align: center;
  margin: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  background-color: #000; /* 设置卡片背景为黑色 */
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 18px;
  padding-top: 10px;
  font-weight: bold;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
}

.position {
  font-size: 16px;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
}

.description {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  background: linear-gradient(to right, #e66465, #9198e5); /* 设置渐变背景 */
  -webkit-background-clip: text; /* Chrome 和 Safari */
  background-clip: text;
  color: transparent;
}
</style>