<template>
  <div>
    <div id="head">
      <span id="head1">课程资源</span>
      <br>
      <span id="head2">Source</span>
    </div>

    <div class="sidebar">
      <sourcebar></sourcebar>
    </div>

    <div class="part">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import sourcebar from "../source/sourcebar";
  export default {
    name: "sourcelist",
    components: {
      sourcebar
    }
  }
</script>

<style scoped>
#head{
  font-size: 20px;
  height: 70px;
  margin-left: 50px;
  margin-top: 20px;
}

#head2 {
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  background-color: rgb(255, 255, 255);
  float:right;
  width: 90%;
}

.sidebar{
  float: left;
  width: 10%;
}
</style>
