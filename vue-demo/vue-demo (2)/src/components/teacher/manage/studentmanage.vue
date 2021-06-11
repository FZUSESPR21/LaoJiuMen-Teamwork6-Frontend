<template>
  <div id="box">
    <div id="head">
      学生管理
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
  margin-top: -170px;
}
#head{
  font-size: 20px;
  height: 75px;
  margin-left: 50px;
  margin-top: 104px;
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
