<template>

  <div id="app">
    <div id="nav_box">
      <img src="../../assets/soft.png" id="logo">
    </div>
    <div id="content">
      <div id="loginbox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
}
</script>

<style scoped>
#nav_box{
  width: 100%;
  height: 60px;
}
#logo{
  margin-left: 140px;
  height: 100%;
}
#content{
  width: 100%;
  top: 60px;
  bottom: 0;
  position: absolute;
  background-image: url("../../assets/loginback.png") ;
  background-size: 100% 100%;
}
#loginbox{
  width: 450px;
  height:500px;
  float: right;
  margin-right: 15%;
  margin-top: 10%;
  background-color: white;
  box-shadow: 0px 0px 3px gray inset,3px 8px 7px #3b3a3a;
}
</style>
