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
#head {
  font-size: 20px;
  height: 100px;
  background-color: white;

}

#head1 {
  position: absolute;
  left: 30px;
  width: 200px;

}

#head2 {
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;

  position: absolute;
  left: 30px;
  width: 200px;

}

.part {
  margin-top: -3%;
  background-color: white;
  float:left;
  width: 900px;
}

.sidebar {
  margin-top: -3%;
  float: left;

}


#activitybar{
  width: 100%;
  height: 500px;
  float: left;
}

#noticenav{
  height: 200px;
  float: left;
  width:20%;
  text-align: center;
  margin-left: 0px;
  margin-top:3%
}
#content{
  float:right;
  margin-right: 0%;
  width:80%;
}
button{
  height: 50px;
  width: 200px;
  border: none;
  background-color: white;
}
#logo{
  margin-left: 140px;
  height: 100%;
}
#icon{
  height:50%;
  width: 5%;
  float: right;
  margin-top:1.5%;
  margin-right: -15%;
}
#exit{
  height:70%;
  width: 50px;
  float: right;
  margin-top:0.8%;
  margin-right: -22%;
  border: 1px;
  border-style:dotted;
  border-block-color: black;
}
.router-link-active{
  color: white;
  background-color: #4ab2ee;
}
.router-link-active-focus{
  border: none;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

</style>
