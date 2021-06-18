<template>
  <div>
    <img src="../../assets/mainimg2.png" id="mainimg">
    <div id="content">
      <div id="messagebox">
        <div id="teacherMessage">
          <div id="tMhead">
            <span>教师信息</span>
          </div>
          <div id="info">
            <span>
              {{ teacherList.data }}
            </span>
          </div>
        </div>
        <!--        <div id="courseMessage">-->
        <!--          <div id="cMhead">-->
        <!--            <span>课程信息</span>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div id="introducebox">
        <div id="introduce">
          <div id="introducehead">
            <span>课程信息</span>
          </div>
          <p id="courseText">
            &nbsp;&nbsp; &nbsp;&nbsp;软件工程是一门普通高等学校本科专业，属计算机类专业，基本修业年限为四年，授予工学学士学位。
            该专业涉及程序设计语言、数据库、软件开发工具、系统平台、设计模式等方面，培养学生适应计算机应用学科的发展，
            特别是软件产业的发展，使其具备计算机软件的基础理论、基本知识和基本技能，
            具有用软件工程的思想、方法和技术来分析、设计和实现计算机软件系统的能力。
          </p>
        </div>
      </div>
      <div id="noticebox">
        <div id="noticelist">
          <div id="noticehead">
            <span>通知列表</span>
            <ul id="noticeUl">
              <template v-for="(item,index) of notificationList">
                <li style="list-style: none">
                  <span>
                    {{ item.notificationName }}
                  </span>:
                  <span>
                    {{ item.releasedAt }}
                  </span>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data(){
    return {
      notificationList: [],
      teacherList:[]
    }
  },
  name: "home",
  created() {
    let clazzId = JSON.parse(localStorage.clazzInfo)[0].id
    let info = {}
    let that = this
// console.log(clazzId)
    this.$axios({
      method: 'get',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      data: JSON.stringify(info),
      url: 'http://1.15.149.222:8080/coursewebsite/notice/all?clazzId='+ clazzId +'&pn='+ 1,
    }).then(function(response)  {
      // console.log(response.data.data.list)
      that.notificationList = response.data.data.list
      that.notificationList = that.notificationList.slice(0,7)
    }).catch((error) => {
      console.log(error)       //请求失败返回的数据
    })
    this.$axios({
      method: 'get',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      data: JSON.stringify(info),
      url: 'http://1.15.149.222:8080/coursewebsite/tch_info/show?clazzId='+ clazzId,
    }).then(function(response)  {
      console.log(response.data)
      that.teacherList = response.data
      that.teacherList = that.teacherList.slice(0,7)
    }).catch((error) => {
      console.log(error)       //请求失败返回的数据
    })
  }
}
</script>

<style scoped>
#info{
  width: 80%;
  margin-top: 50px;
  text-align: center;
}
#mainimg{
  width: 100%;
}
#noticeUl{
  color: #4363a8;
  padding: 0;
}
#courseText{
  margin: 40px;
}
#content{
  width: 100%;
  height: 350px;
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
  height: 100%;
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
  color: #263f71;
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
#introducehead{
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
