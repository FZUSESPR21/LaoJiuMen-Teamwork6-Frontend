<template>
  <div>
    <div id="head">学科成绩
      <p class="english">Result</p>
    </div>
    <div class="part">
      <el-row class="cardgroup">
        <el-card class="box-card1">
          <div slot="header" class="clearfix">
            <span>期末笔试成绩：</span>
            {{writtenScore}}({{Math.round(writtenScore*0.7)}})
          </div>
          <div></div>
        </el-card>
<!--        <el-card class="box-card2">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>作业成绩：</span>-->

<!--          </div>-->
<!--          <div></div>-->
<!--        </el-card>-->
        <el-card class="box-card3">
          <div slot="header" class="clearfix">
            <span>期末总成绩：</span>
            {{totalScore}}
          </div>
          1、70%期末笔试成绩<br>
          2、30%平时成绩：<br>
          (1)缺勤1次扣3分，课堂表现积极加1分<br>
          (2)小测：满分A2/90-80B1/70-30C0/20-OD-1/缺交E-2<br>
          (3)个人作业<br>
        </el-card>
<!--        <el-card class="box-card4">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>小测成绩：</span>-->
<!--          </div>-->
<!--          <div></div>-->
<!--        </el-card>-->
        <el-card class="box-card5">
          <div slot="header" class="clearfix">
            <span>平时成绩：</span>
            {{usualScore}}
          </div>
          <div></div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>





<script>
export default {
  name: "resultshow",

  data(){
    return{
      totalScore:'',
      writtenScore:'',
      usualScore:''
    }
  },
  methods:{
    showresult(){
      let info={}
      this.$axios({
        methods:'get',
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(info),

          url: 'http://1.15.149.222:8080/coursewebsite/student/score/search?sid='+localStorage.getItem('id'),

      }).then((response) => {
        /*
                  console.log(response)       //请求成功返回的数据
          alert(JSON.stringify(response))
          */
        console.log(response.data.data)
        this.usualScore=response.data.data.usualScore
        this.totalScore=response.data.data.totalScore
        this.writtenScore=response.data.data.writtenScore

      }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
    },
  },
  created () {
      this.showresult();
  }
}
</script>


<style>
.text {
  font-size: 14px;
  width:100%;
}

.item {
  margin-bottom: 10px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card1 {
  width: 20%;
  border-radius: 30px;
  margin-top:10%;
  background-color: rgb(196, 255, 196);
  float: left;
}
.box-card2 {
  width: 15%;
  border-radius: 30px;
  margin-top:8%;
  background-color:rgb(236, 196, 255);
  float:right;
}
.box-card3 {
  width: 80%;
  border-radius: 30px;
  margin-top:-5%;
  margin-left: 14%;
  float: left;
  background-color:rgb(162, 229, 255)
}
.box-card4 {
  width: 15%;
  border-radius: 30px;
  margin-top:-2%;
  margin-left: 10%;
  float: left;
  background-color:rgb(255, 202, 202)
}
.box-card5 {
  width: 22%;
  border-radius: 30px;
  margin-top:-11%;
  margin-left: 75%;
  float: left;
  background-color:rgb(255, 255, 189)
}
.cardgroup{
  margin-top:5%;
  background-color: white;
}
#head{
  background-color: white;
  font-size: 20px;
  height: 100%;
  margin-top: 8%;
  margin-left: 4%;
  margin-bottom: 6%;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  margin-top: -15px;
  background-color: rgb(228, 228, 228);
}
</style>



