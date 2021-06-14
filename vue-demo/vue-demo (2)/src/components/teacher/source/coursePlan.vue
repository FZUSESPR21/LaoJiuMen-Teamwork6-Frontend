<template>
  <div>
    <div id="planbox">
      <p id="title">福州大学授课计划</p>
      <p>(2020-2021学年02学期)</p>
      <p>课程名称：《软件工程》</p>
      <table id="plantable"  border="2" cellspacing="0">
        <tr>
          <td rowspan="2" width="11%" style="font-weight: bold">任课教师</td>
          <td rowspan="2" width="11%"><el-input></el-input></td>
          <td rowspan="2" width="11%" style="font-weight: bold">课程学分</td>
          <td rowspan="2" width="11%"><el-input></el-input></td>
          <td height="50" width="11%" style="font-weight: bold">总学时</td>
          <td width="11%" style="font-weight: bold">理论</td>
          <td width="11%" style="font-weight: bold">实践</td>
          <td rowspan="2" width="11%" style="font-weight: bold">开课对象</td>
          <td rowspan="2" width="11%"><el-input></el-input></td>
        </tr>
        <tr>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
        </tr>
        <tr>
          <td height="50" style="font-weight: bold">起止周数</td>
          <td colspan="8"><el-input></el-input></td>
        </tr>


        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">课程教学目的</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
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
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>福州大学课程平台</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>中国大学MOOC平台（爱课程）</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>福州大学雨课堂</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>福州大学学堂云</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>超星“一平三端”智慧教学平台</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>超星尔雅</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>学银在线</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>智慧树在线教育平台</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>国家虚拟仿真实验教学项目工作网</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>Moodle</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
        </tr>
        <tr>
          <td colspan="2" height="50" align="left" bgcolor="#e0e0e0"><input type="checkbox"></input>腾讯课堂</td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td><el-input></el-input></td>
          <td colspan="4"><el-input></el-input></td>
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
          <td colspan="2" height="50"><el-input></el-input></td>
          <td colspan="2" ><el-input></el-input></td>
          <td colspan="5"><el-input></el-input></td>
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
            <el-radio-group>
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
            <el-radio-group>
              <el-radio :label="1">选用</el-radio>
              <el-radio :label="2">自编</el-radio>
              <el-radio :label="3">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            是否属于马工程教材：
            <el-radio-group>
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            是否属于哲学社会科学教材：
            <el-radio-group>
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="50" align="left">
            是否属于境外原本教材：
            <el-radio-group>
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">无</el-radio>
            </el-radio-group>
          </td>
        </tr>
        <tr>
          <td colspan="9" height="100">
            <p></p>
            教材名称：<input id="bookname"></input><p></p>
            出版社：<input id="bookpress"></input><p></p>
            教材编者：<input id="bookauthor"></input><p></p>
            教材版本：<input id="bookversion"></input><p></p>
            出版时间：<input id="pulishtime"></input><p></p>
          </td>
        </tr>


        <tr>
          <td colspan="9" height="50" align="left" style="font-weight: bold">主要教学参考资料</td>
        </tr>
        <tr>
          <td colspan="9" height="50"><el-input
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
        <tr v-for="row in tableData">
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
      <el-button type="primary">确定</el-button>
      <div id="aa"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coursePlan",
  data(){
    return{
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
  },
  methods:{
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
      this.tableData.push(row)
    }
  }
}
</script>

<style scoped>
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
