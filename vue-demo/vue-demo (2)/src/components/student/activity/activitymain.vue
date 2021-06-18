<template>
  <div>
    <div id="head">
      <span id="head1">课程作业</span>
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
    }
  }
</script>

<style scoped>
#head{
  font-size: 20px;
  height: 75px;
  margin-left: 50px;
  margin-top: 20px;
}

#head1 {
  margin-bottom: 10px;
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
