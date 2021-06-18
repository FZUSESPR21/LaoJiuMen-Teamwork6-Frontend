<template>
  <div>
    <div id="planbox">
      <p id="title">福州大学授课计划</p>
      <p>(2020-2021学年02学期)</p>
      <p>课程名称：《软件工程》</p>
      <div id="clazzname">
        班级：
        <el-select v-model="clazzvalue" placeholder="请选择" size="mini" @change="changeClazz">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.clazzName"
            :value="item.id+''">
          </el-option>
        </el-select>
      </div>
      <table id="plantable"  border="2" cellspacing="0">
        <tr>
          <td rowspan="2" width="11%" style="font-weight: bold">任课教师</td>
          <td rowspan="2" width="11%"><el-input v-model="planMessage.teacher"></el-input></td>
          <td rowspan="2" width="11%" style="font-weight: bold">课程学分</td>
          <td rowspan="2" width="11%"><el-input v-model="planMessage.credit"></el-input></td>
          <td height="50" width="11%" style="font-weight: bold">总学时</td>
          <td width="11%" style="font-weight: bold">理论</td>
          <td width="11%" style="font-weight: bold">实践</td>
          <td rowspan="2" width="11%" style="font-weight: bold">开课对象</td>
          <td rowspan="2" width="11%"><el-input v-model="planMessage.object"></el-input></td>
        </tr>
        <tr>
          <td><el-input v-model="planMessage.totalPeriod"></el-input></td>
          <td><el-input v-model="planMessage.theory"></el-input></td>
          <td><el-input v-model="planMessage.practice"></el-input></td>
        </tr>
        <tr>
          <td height="50" style="font-weight: bold">起止周数</td>
          <td colspan="8"><el-input v-model="planMessage.lastWeeks"></el-input></td>
        </tr>


        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">课程教学目的</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
            v-model="planMessage.goal"
            type="textarea"
            :rows="4"
            placeholder="请输入教学目的">
          </el-input>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">课程教学的总体安排</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
            v-model="planMessage.arrange"
            type="textarea"
            :rows="4"
            placeholder="请输入课程教学的总体安排">
          </el-input>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">教学方法及考核方案</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
            v-model="planMessage.appraisal"
            type="textarea"
            :rows="4"
            placeholder="请输入教学方法及考核方案">
          </el-input>
          </td>
        </tr>


        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">线上授课情况(有使用的平台请在平台前复选框中打勾，将具体信息填入该行相应框中)</td>
        </tr>
        <tr>
          <td colspan="9" height="50" bgcolor="#e0e0e0">(1)线上教学实施措施</td>
        </tr>
        <tr bgcolor="#e0e0e0">
          <td colspan="2" height="50">课程教学平台</td>
          <td>课程名称</td>
          <td>开课学校</td>
          <td>主讲教师</td>
          <td colspan="4">课程链接（备注）</td>
        </tr>
        <tr v-for="(item,index) in planMessage.platforms">
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox" :checked=planMessage.platforms[index].checked
                                                                            @change="select(index)"></input>{{item.platName}}</td>
          <td><el-input v-model="item.name"></el-input></td>
          <td><el-input v-model="item.school"></el-input></td>
          <td><el-input v-model="item.teacher"></el-input></td>
          <td colspan="4"><el-input v-model="item.link"></el-input></td>
        </tr>


        <tr>
          <td colspan="9" height="50" bgcolor="#e0e0e0">(2)教学联系群</td>
        </tr>
        <tr>
          <td colspan="2" height="50">QQ群号</td>
          <td colspan="2" >微信群号</td>
          <td colspan="5">其他</td>
        </tr>
        <tr>
          <td colspan="2" height="50"><el-input v-model="planMessage.QQGrouqp"></el-input></td>
          <td colspan="2" ><el-input v-model="planMessage.WechatGroup"></el-input></td>
          <td colspan="5"><el-input v-model="planMessage.otherGroup"></el-input></td>
        </tr>
        <tr>
          <td colspan="9" height="20" bgcolor="#e0e0e0"></td>
        </tr>


        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">教材信息</td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            教材类型：
            <el-radio-group v-model="planMessage.bookType">
              <el-radio :label="1">教育部国家级规划教材</el-radio>
              <el-radio :label="2">省部级规划教材</el-radio>
              <el-radio :label="3">教育部国家级精品教材</el-radio>
              <el-radio :label="4">省部级精品教材</el-radio>
              <el-radio :label="5">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            课程教材使用情况：
            <el-radio-group v-model="planMessage.bookCondition">
              <el-radio :label="1">选用</el-radio>
              <el-radio :label="2">自编</el-radio>
              <el-radio :label="3">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            是否属于马工程教材：
            <el-radio-group v-model="planMessage.isMagong">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            是否属于哲学社会科学教材：
            <el-radio-group v-model="planMessage.isZexue">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            是否属于境外原本教材：
            <el-radio-group v-model="planMessage.isForeign">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="100">
            <p></p>
            教材名称：<input id="bookname" v-model="planMessage.bookName"></input><p></p>
            出版社：<input id="bookpress" v-model="planMessage.bookPress"></input><p></p>
            教材编者：<input id="bookauthor" v-model="planMessage.bookAuthor"></input><p></p>
            教材版本：<input id="bookversion" v-model="planMessage.bookVersion"></input><p></p>
            出版时间：<input id="pulishtime" v-model="planMessage.publishTime"></input><p></p>
          </td>
        </tr>


        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">主要教学参考资料</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
            v-model="planMessage.message"
            type="textarea"
            :rows="4"
            placeholder="请输入主要教学参考资料">
          </el-input>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">本课程对学生的要求</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
            v-model="planMessage.require"
            type="textarea"
            :rows="4"
            placeholder="请输入本课程对学生的要求">
          </el-input>
          </td>
        </tr>

      </table>
      <table id="plantable2" border="2" cellspacing="0">
        <tr>
          <td height="50" rowspan="2">课次</td>
          <td rowspan="2">周次</td>
          <td rowspan="2">日期</td>
          <td rowspan="2">教学内容</td>
          <td rowspan="2">教学形式</td>
          <td rowspan="2">节次</td>
          <td colspan="2" height="25">任课教师</td>
          <td rowspan="2">上课地点</td>
        </tr>
        <tr>
          <td height="25">授课教师</td>
          <td>辅导教师</td>
        </tr>
        <tr v-for="row in planMessage.tableData">
          <td height="50"><el-input v-model="row.clazzTime"></el-input></td>
          <td><el-input v-model="row.weekTime"></el-input></td>
          <td><el-input v-model="row.date"></el-input></td>
          <td><el-input v-model="row.contend"></el-input></td>
          <td><el-input v-model="row.form"></el-input></td>
          <td><el-input v-model="row.time"></el-input></td>
          <td><el-input v-model="row.lecture"></el-input></td>
          <td><el-input v-model="row.tutor"></el-input></td>
          <td><el-input v-model="row.place"></el-input></td>
        </tr>

      </table>
      <div id="addbtnbox">
        <el-button id="addbtn" type="text" @click="addData">添加数据</el-button>
      </div>
      <el-divider></el-divider>
      <el-button type="primary" @click="submit">确定</el-button>
      <div id="aa"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coursePlan",
  data(){
    return{
      options: [],
      clazzvalue: '',
      result:{},
      planMessage:{
        teacher:'',
        credit:'',
        totalPeriod:'',
        theory:'',
        practice:'',
        object:'',
        lastWeeks:'',
        goal:'',
        arrange:'',
        appraisal:'',
        platforms:[
          {
            checked:false,
            platName:'福州大学课程平台',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'中国大学MOOC平台（爱课程）',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'福州大学雨课堂',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'福州大学学堂云',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'超星“一平三端“智慧教学平台',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'超星尔雅',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'学银在线',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'智慧树在线教育平台',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'国家虚拟仿真实验教学项目工作网',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'Moodle',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
          {
            checked:false,
            platName:'腾讯课堂',
            name:'',
            school:'',
            teacher:'',
            link:''
          },
        ],
        selectPlatform:[],
        QQGrouqp:'',
        WechatGroup:'',
        otherGroup:'',
        bookType:'',
        bookCondition:'',
        isMagong:'',
        isZexue:'',
        isForeign:'',
        bookName:'',
        bookPress:'',
        bookAuthor:'',
        bookVersion:'',
        publishTime:'',
        message:'',
        require:'',
        tableData:[
          {
            clazzTime:'',
            weekTime:'',
            date:'',
            contend:'',
            form:'',
            time:'',
            lecture:'',
            tutor:'',
            place:''
          }
        ],
      }
    }
  },
  created() {
    console.log(JSON.stringify(this.planMessage.platforms[0]))
    console.log(JSON.stringify(this.planMessage.selectPlatform).indexOf(JSON.stringify(this.planMessage.platforms[0])))
    this.options = JSON.parse(localStorage.getItem('clazzInfo'))
    this.clazzvalue = this.options[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.clazzvalue)
    else this.clazzvalue = localStorage.getItem('clazzvalue')
    this.getMessage()
  },
  methods:{
    changeClazz() {
      this.getMessage()
      localStorage.setItem('clazzvalue', this.clazzvalue)
    },
    getMessage(){
      const plan = {
        clazzId:this.clazzvalue,
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(plan),
        url: 'http://1.15.149.222:8080/coursewebsite/resource/get_plan',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(response.data.data)
        if (response.data.data === null){
          this.submit()
        }
        this.planMessage = JSON.parse(response.data.data)
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    submit(){
      const plan = {
        clazzId:this.clazzvalue,
        planMessage: JSON.stringify(this.planMessage)
      }
alert(JSON.stringify(this.planMessage))
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(plan),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/resource/upload_plan',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(response.data.data)
        this.result = response.data.data
        console.log(this.result)
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    addData() {
      let row = {
        clazzTime:'',
        weekTime:'',
        date:'',
        contend:'',
        form:'',
        time:'',
        lecture:'',
        tutor:'',
        place:''
      }
      this.planMessage.tableData.push(row)
    },
    select(index){
      let cnt = 0;
      for (let i = 0;i < this.planMessage.selectPlatform.length;i++){
        if (this.planMessage.selectPlatform[i].platName === this.planMessage.platforms[index].platName){
          cnt = 1
          this.planMessage.selectPlatform.splice(i,1)
          break
        }
      }
      if (cnt === 0) {
        this.planMessage.selectPlatform.push(this.planMessage.platforms[index])
      }
    }
  }
}
</script>

<style scoped>
#clazzname{
  float: left;
  margin-bottom: 10px;
  margin-left: 20px;
}
#planbox{
  text-align: center;
  margin-left: 10%;
  width: 80%;
  height: 200px;
  position: relative;
}
#title{
  font-size: 18px;
  font-weight: 900;
}
#plantable,#plantable2{
  width: 100%;
  border-color: #f5f5f5;
}
#bookname,#bookpress,#bookauthor,#bookversion,#pulishtime{
  width: 70%;
}
#addbtnbox{
  width: 100%;
  height: 30px;
}
#addbtn{
  float: left;
}
#aa{
  width: 100%;
  height: 100px;
}
</style>
