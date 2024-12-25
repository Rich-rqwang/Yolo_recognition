<template>
  <div>
    <h1>Product Market</h1>
    <div class="container">
      <div class="row" v-for="j in 3" :key="j">
        <div class="col-md-3" v-for="i in 4" :key="i">
          <div class="card" @click="$router.push('/Test')" :style="{ height: '200px', width: '300px' }">
            <div class="card-body">
              <p>{{  (j - 1) * 4 + i }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductMarket',
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}
.row {
  margin-bottom: 50px;
}
.card {
  margin-right: 50px;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.75);
  z-index: 1;
}
</style>