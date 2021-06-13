<template>
  <div id="box">
    <div id="head">
      <p class="title">学生管理</p>
      <p class="english">Student</p>
    </div>
    <div class="part">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentmanage"
}
</script>

<style scoped>
#box{

}
#head{
  font-size: 20px;
  height: 75px;
  margin-left: 50px;

}
.title{
  margin-bottom: 10px;
}
.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}
.part{
  margin-top: -14px;
}

</style>
