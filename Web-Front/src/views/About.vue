<template>
  <div id="Adout">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
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
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

.position {
  font-size: 16px;
  color: gray;
}

.description {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
</style>
