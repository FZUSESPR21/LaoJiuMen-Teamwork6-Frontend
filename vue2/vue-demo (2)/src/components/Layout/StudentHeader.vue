<template>
  <div id="nav_box">
    <img src="../../assets/soft.png" id="logo">
    <div id="nav">
      <router-link to="/student/home" tag="button" >首页</router-link>
      <router-link to="/student/source" tag="button">课程资源</router-link>
      <router-link to="/student/activity" tag="button">课程活动</router-link>
<!--      <router-link to="/student/signin" tag="button">课程签到</router-link>-->
      <router-link to="/student/comment" tag="button">答疑讨论</router-link>
      <router-link to="/student/result" tag="button">学科成绩</router-link>
      <img src="../../assets/logo.png" id="icon">
      <router-link to="/login/login" tag="button" @click.native="logout" id="exit">注销</router-link>
    </div>

  </div>
</template>

<script>

export default {
  name: "studentheader",

  methods:{

    logout() {
      localStorage.clear();
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: 'http://1.15.149.222:8080/coursewebsite/logout',
      }).then((response) => {
        localStorage.clear();
      }).catch((error) => {
        console.log(error);
      })
    }

  }

}
</script>

<style scoped>
#nav_box{
  width: 100%;
  height: 60px;
}

#nav{
  height: 100%;
  float: right;
  text-align: center;
  margin-right: 200px;
}
button{
  height: 100%;
  width: 100px;
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

  background-color: #4363a8;
}
.router-link-active-focus{
  border: none;
}
</style>
