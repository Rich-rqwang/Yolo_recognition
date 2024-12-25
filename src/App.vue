<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/Home">首页</router-link>
          <router-link class="nav-link" to="/project-intro">项目简介</router-link>
          <router-link class="nav-link" to="/product-market">产品市场</router-link>
          <router-link class="nav-link" to="/about">关于我们</router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 40px;
}

nav a {
  font-weight: bold;
  font-size: 20px;
  color: #2c3e50;
  padding: 150px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.nav-link {
  margin-right: 30px; /* 增加链接之间的距离 */
  
}
</style>