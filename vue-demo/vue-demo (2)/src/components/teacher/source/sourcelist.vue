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
  height: 100px;
  margin-top: 8%;
}

#head1 {
  position: absolute;

  margin-left: 3%;
}

#head2 {
  color: rgb(179, 179, 179);
  font-size: 15px;

  position: absolute;
  margin-left: 3%;
}

.part{
  margin-top: -2.8%;
  background-color: rgb(255, 252, 252);
  float:right;
  width: 90%;
}

.sidebar{
  margin-top: -2.8%;
  float: left;
  width: 10%;
}
</style>
