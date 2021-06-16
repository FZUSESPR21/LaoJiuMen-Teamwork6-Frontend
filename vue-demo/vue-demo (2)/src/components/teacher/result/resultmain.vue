<template>
  <div>
    <div id="head">学科成绩
      <p class="english">Result</p>
    </div>
    <div class="part">
<!--      <router-link to="/teacher/result/resultlist" tag="button" >成绩列表</router-link>-->
<!--      <router-link to="/teacher/result/resultinput" tag="button">成绩录入</router-link>-->
<!--      <router-link to="/teacher/result/taskanalysis" tag="button">作业成绩分析</router-link>-->
<!--      <router-link to="/teacher/result/finalanalysis" tag="button">期末成绩分析</router-link>-->
    </div>
    <div id="contents">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
export default {
  name: "resultmain"
}
</script>


<style scoped>
#head{
  font-size: 20px;
  height: 70px;
  margin-left: 50px;
  margin-top: 20px;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  height: 100%;
  float: right;
  text-align: center;
}

button{
  width: 100%;
  border-style: solid;
  border-color: #f0eeee;
  background-color: white;

}

#contents{
    float:left;
    width:100%;
    height: 100%;
}
</style>
