<template>
  <div>
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
      <el-button type="primary" size="mini" @click="createclass" id="newclazz">新建班级</el-button>
    </div>
    <div id="stulistbox">
      <div id="stulist">
        <div id="listhead">
          <input type="checkbox" id="selectAll" :checked="selectArr.length === studentlist.length" @change='selectAll()'></input>
          <span id="accounthead">学号</span>
          <span id="namehead">姓名</span>
          <span id="emailhead">邮箱</span>
          <span id="oprationhead">操作</span>
        </div>
        <div v-for="item in studentlist">
          <div id="listitem">
            <input type="checkbox" id="itemcheckbox" :checked="selectArr.indexOf(item.id) > -1"  @change='selectOne(item.id)'></input>
            <div id="item">
              <span id="account">{{ item.account }}</span>
              <span id="studentname">{{ item.studentName }}</span>
              <span id="email">{{ item.email }}</span>
              <el-button type="text" id="itemeditbtn" @click="editstudent(item.id,item.account,item.studentName,item.email)">编辑</el-button>
              <el-button type="text" id="itemdelbtn" @click="deleteOne(item.id)">删除</el-button>
            </div>
          </div>
        </div>
        <div id="listfoot">
          <el-button size="mini" id="deleteSelbtn" @click="deleteSel">删除</el-button>
          <input class="file" name="file_excel" type="file"  @change="select"/>
          <el-button size="mini" id="uploadbtn" icon="el-icon-upload2">上传Excel生成学生列表</el-button>
          <el-button size="mini" id="downloadbtn" icon="el-icon-download" @click="download">下载上传须知</el-button>
          <el-button size="mini" type="primary" id="newstu" @click="createstudent">新增</el-button>
          <el-pagination
            id="pagination"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "studentlist",
  data() {
    return {
      options: [],
      clazzvalue: '',
      selectArr: [],
      isCheckedAll: false,
      studentlist: [],
      pagesize: 5,
      //当前页码
      currentPage: 1,
      //查询的页码
      start: 1,
      //默认数据总数
      totalCount: 1,
      //搜索条件
      criteria: '',
    }
  },
  created() {
    this.options = JSON.parse(localStorage.getItem('clazzInfo'))
    this.clazzvalue = this.options[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.clazzvalue)
    else this.clazzvalue = localStorage.getItem('clazzvalue')
    this.querytest(this.currentPage)
  },
  methods: {

    //页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.querytest(this.currentPage);
    },
    querytest(pageNum) {
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },

        url: 'http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/all?clazzId=' + this.clazzvalue +'&pn='+pageNum,
      }).then((response) => {          //这里使用了ES6的语法
        //console.log(JSON.stringify(response))       //请求成功返回的数据
        console.log(response.data)
        this.studentlist = response.data.data.list
        this.totalCount = response.data.data.total
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    createstudent() {//新增学生
      this.$router.push({
        path: '/teacher/manage/createstudent',
        query: {
          type: '0',
        }
      })
    },

    changeClazz() {
      this.querytest(this.currentPage)
      localStorage.setItem('clazzvalue', this.clazzvalue)
    },

    createclass() {
      this.$router.push('/teacher/manage/createclass')
    },

    editstudent(stu_id, stu_account, stu_name, stu_email) {//编辑学生
      this.$router.push({
        path: '/teacher/manage/createstudent',
        query: {
          studentId: stu_id,
          account: stu_account,
          student_name: stu_name,
          email: stu_email,
          type: '1'
        }
      })
    },

    download() {
      // this.$axios({
      //   method: 'post',
      //   url: 'http://localhost:8081/coursewebsite_war_exploded/teacher/stu_mgt/down',
      //   // data: {},
      //   headers:{
      //     'Content-type': 'application/x-www-form-urlencoded',
      //     'Authorization': localStorage.getItem('token')
      //   },
      //   responseType: 'arraybuffer'
      // }).then(function (res) {
      //   var blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'}); //指定格式为vnd.ms-excel
      //   var downloadElement = document.createElement('a');
      //   var href = window.URL.createObjectURL(blob); //创建下载的链接
      //   downloadElement.href = href;
      //   downloadElement.download = 'xxx.xls'; //下载后文件名
      //   document.body.appendChild(downloadElement);
      //   downloadElement.click(); //点击下载
      //   document.body.removeChild(downloadElement); //下载完成移除元素
      //   window.URL.revokeObjectURL(href); //释放掉blob对象
      // }).catch((error) => {
      //   console.log(error)
      // })

      window.location.href = 'http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/down'
    },

    select(e) {

      this.file = e.target.files[0]
      // console.log(file)
      let param = new FormData() // 创建form对象
      param.append('file', this.file, this.file.name) // 通过append向form对象添加数据
      param.append('clazzId', this.clazzvalue)
      // withCredentials: true 使得后台可以接收表单数据  跨域请求
      const instance = this.$axios.create({
        withCredentials: true
      })
      // url为后台接口
      instance.post('http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/excel', param)
        .then((response) => {
          console.log(response.data)
          // this.$router.push('/teacher/manage/studentlist')
          // this.$router.go(0)
        }) // 成功返回信息 调用函数  函数需自己定义，此处后面省略
        .catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
    },
    deleteOne(stuId) {
      let index
      let delOneMessage = {
        id: stuId
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(delOneMessage),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/delete',
      }).then((response) => {          //这里使用了ES6的语法
        // console.log(JSON.stringify(response))       //请求成功返回的数据
        // console.log(response.data.data)
        if (response.data.code === '200' && response.data.data === 1) {
          this.$router.push('/teacher/manage/studentlist')
          this.$router.go(0)
          alert('删除学生成功!');
        } else {
          alert('删除学生失败!');
        }
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    deleteSel() {
      let message = []
      for (let i = 0; i < this.selectArr.length; i++) {
        let _t = {
          id: this.selectArr[i]
        }
        message.push(_t)
      }
      if (this.selectArr.length == 0)
        alert("没有要删除的选项")
      else {
        let index
        this.$axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          data: JSON.stringify(message),
          url: 'http://1.15.149.222:8080/coursewebsite/teacher/stu_mgt/dlt_li',
        }).then((response) => {          //这里使用了ES6的语法
          if (response.data.code === '200') {
            alert(response.data.data)
            this.$router.push('/teacher/manage/studentlist')
            this.$router.go(0)
          }
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      }
    },
    selectOne(studentId) {
      let idIndex = this.selectArr.indexOf(studentId)
      if (idIndex >= 0) {
        this.selectArr.splice(idIndex, 1)
      } else {
        this.selectArr.push(studentId)
      }
    },
    selectAll() {
      this.isCheckedAll = !this.isCheckedAll
      if (this.isCheckedAll) {
        this.selectArr = []
        const _that = this
        this.studentlist.forEach((val, index) => {
          this.selectArr.push(val.id)
        })
      } else {
        this.selectArr = []
      }
    }
  }
}
</script>

<style scoped>
#clazzname{
  float: right;
  margin-top: -40px;
  margin-right: 45px;
}
#newclazz{
  background-color: #4ab2ee;
}
#stulistbox{
  margin-top: 15px;
  margin-left: 7px;
  margin-right: 5px;
  border: 1px solid #c2c1c1;
  border-radius: 20px;
}
#stulist{
  margin-left: 10%;
  margin-right: 10%;
  font-size: 12px;
}
#listhead{
  margin-top: 20px;
}
#selectAll{
  margin-right: 8%;
}
#accounthead{
  margin-right: 0;
}
#namehead{
  margin-right:0;
}
#emailhead{
  margin-right: 0;
}
#oprationhead{
  margin-right: 0;
}
#listitem{
  height: 35px;
  margin-top: 10px;

}
#itemcheckbox{
  margin-top: 10px;
}
#item{
  background-color: #fafafa;
  float: right;
  width: 97%;
  height: 100%;
  border: 1px solid #dcdbdb;
  border-radius: 8px;
  line-height: 300%;
}
#account{
  margin-left: 5%;
}
#studentname{
  margin-left: 13%;
}
#email{
  margin-left: 11%;
}
#itemdelbtn{
  float: right;
  margin-right: 1%;
}
#itemeditbtn{
  float: right;
  margin-right: 3%;
}
#listfoot{
  margin-top: 20px;
  margin-bottom: 100px;
}
#deleteSelbtn{
  color: red;
  border: 1px solid red;
}
#uploadbtn{
  display: inline;
  margin-left: -178px;
  margin-right: 10px;
}
#downloadbtn{
  color: red;
  border: 1px solid red;
  margin-left: 0;
}
#newstu{
  background-color: #4ab2ee;
}
#pagination{
  float: right;
}
.file {
  position: relative;
  display: inline-block;
  width: 175px;
  height: 28px;
  margin-left: 10px;
  opacity: 0;
}
.file input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
