<template>
  <div>
    <div id="head">答疑讨论
      <p class="english">QA</p>
    </div>
    <div class="part">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "main",
  components: {

  }
}


</script>

<style scoped>
#head{
  background-color: white;
  font-size: 20px;
  height: 100%;
  margin-top: 8%;
  margin-left: 4%;
  margin-bottom: 6%;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  margin-top: -15px;
  background-color: rgb(228, 228, 228);
}

.sidebar {
  margin-top: 0%;
  float: left;
}
</style>
