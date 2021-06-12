<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div id="head">
      <span id="head1">课程活动</span>
      <br>
      <span id="head2">Activity</span>
    </div>

    <div class="sidebar">
      <activitybar></activitybar>
    </div>

    <div class="part">
      <router-view></router-view>
    </div>

  </div>


</template>


<script>
import activitybar from "./activitybar";
export default {
  name: "activitymain",
  components: {
    activitybar
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
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
  background-color: rgb(255, 255, 255);
  float:right;
  width: 90%;
}

.sidebar{
  margin-top: -2.8%;
  float: left;
  width: 10%;
}
</style>
