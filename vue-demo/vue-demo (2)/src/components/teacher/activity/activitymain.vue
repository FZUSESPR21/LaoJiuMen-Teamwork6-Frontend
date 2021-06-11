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
  font-size: 20px;
  height: 100px;
}
#noticedeliver{
  margin-top:0%;
  background-color: white;
  /*border-style:solid;
  border-width:1px;
  border-color:gray;
  border-radius:20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
}
#noticehead{
  font-size:21px;
  margin-top:0.2%;
  margin-bottom:2%;
  margin-left:7.5%;
}
.tac{
  width:30%;
  margin-top:10%;
}
</style>


<style scoped>
#head{
  background-color: white;
  font-size: 20px;
  height: 100px;
  margin-top: 8%;
}

#head1 {
  position: absolute;
  left: 30px;
  width: 200px;

}

#head2 {
  color: rgb(179, 179, 179);
  font-size: 15px;

  position: absolute;
  left: 30px;
  width: 200px;
}

.part{
  margin-top: -5.6%;
  background-color: rgb(255, 255, 255);
  float:left;
  width: 900px;
}

.sidebar{
  margin-top: -4.5%;
  float: left;
}
</style>
