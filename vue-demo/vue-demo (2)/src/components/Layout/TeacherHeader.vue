<template>
  <div id="nav_bar">
    <img src="../../assets/soft.png" id="logo">
    <div id="nav">
      <router-link  to="/teacher/home" tag="button" >首页</router-link>
      <router-link to="/teacher/source" tag="button">课程资源</router-link>
      <router-link to="/teacher/activity" tag="button">课程活动</router-link>
<!--      <router-link to="/teacher/signin" tag="button">课程签到</router-link>-->
      <router-link to="/teacher/comment" tag="button">答疑讨论</router-link>
      <router-link to="/teacher/result" tag="button">学科成绩</router-link>
      <router-link to="/teacher/manage" tag="button">学生管理</router-link>
      <img src="../../assets/logo.png" id="icon">
      <router-link to="/login/login" tag="button" @click.native="logout" id="exit">注销</router-link>
    </div>

  </div>
</template>

<script>

export default {
  name: "teacherheader",

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
#nav_bar{
  width: 100%;
  height: 60px;
}

#nav{
  height: 100%;
  width: 60%;
  float: right;
  text-align: center;
  margin-right:10%;
}
button{
  height: 100%;
  width: 11%;
  border: none;
  background-color: white;
}
#logo{
  margin-left: 10%;
  width: 13%;
  height: 100%;
}
#icon{
  height:50%;
  width: 5%;
  float: right;
  margin-top:1.5%;
  margin-right: -7%;
}
#exit{
  height:70%;
  width: 6%;
  float: right;
  margin-top:0.8%;
  margin-right: -15%;
  border: solid 1px;

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
