<template>
  <div>
    <img src="../../assets/mainimg2.png" id="mainimg">
    <div id="content">
      <div id="messagebox">
        <div id="teacherMessage">
          <div id="tMhead">
            <span>教师信息</span>
          </div>
        </div>
        <div id="courseMessage">
          <div id="cMhead">
            <span>课程信息</span>
          </div>
        </div>
      </div>
      <div id="introducebox">
        <div id="introduce">

        </div>
      </div>
      <div id="noticebox">
        <div id="noticelist">
          <div id="noticehead">
            <span>通知列表</span>
          </div>
        </div>
      </div>
    </div>
    <div id="content2">
      <div id="introducebox2">

      </div>
      <div id="introduceimg">

      </div>
    </div>
    <div id="foot">

    </div>
  </div>
</template>

<script>

export default {
  name: "home",
}
</script>

<style scoped>
#mainimg{
  width: 100%;
}
#content{
  width: 100%;
  height: 600px;
  margin-top: 50px;
}
#messagebox{
  width: 25%;
  height: 100%;
  float: left;
}
#teacherMessage{
  background-color: #f3f3f3;
  margin-left: 20%;
  width: 80%;
  height: 200px;
  box-shadow: 1px 3px 5px #bababa;
}
#tMhead{
  background-color: #34a2e0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 235%;
  color: white;
}
#courseMessage{
  background-color: #f3f3f3;
  margin-left: 20%;
  margin-top: 50px;
  width: 80%;
  height: 200px;
  box-shadow: 1px 3px 5px #bababa;
}
#cMhead{
  background-color: #34a2e0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 235%;
  color: white;
}
#introducebox{
  float: left;
  width: 53%;
  height: 100%;
}
#introduce{
  background-color: #f3f3f3;
  height: 100%;
  margin-left: 7%;
  margin-bottom: 50px;
  box-shadow: 1px 3px 5px #bababa;
}
#noticebox{
  float: right;
  width: 22%;
  height: 100%;
}
#noticehead{
  background-color: #34a2e0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 235%;
  color: white;
}
#noticelist{
  background-color: #f3f3f3;
  height: 100%;
  margin-left: 10%;
  margin-right: 8%;
  box-shadow: 1px 3px 5px #bababa;
}
#content2{
  width: 100%;
  height: 600px;
  margin-top: 50px;
  background-color: #f3f3f3;
  position: relative;
}
#introducebox2{
  background-color: #4363a8;
  width: 55%;
  height: 400px;
  top: 100px;
  left: 15%;
  position: absolute;
}
#introduceimg{
  background-color: #2caff6;
  width: 28%;
  height: 380px;
  right: 15%;
  top: 150px;
  position: absolute;
}
#foot{
  width: 100%;
  height: 200px;
}
</style>
