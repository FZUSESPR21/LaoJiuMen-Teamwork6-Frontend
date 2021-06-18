<template>

  <div id="div1">

    <div id="div2">


      <!-- <div id="clazzname">
        班级：
        <el-select v-model="clazzvalue" placeholder="请选择" class="kuang" @change="changeClazz">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.clazzName"
            :value="item.id+''">
          </el-option>
        </el-select> -->

    </div>
    <div id="div3" style="display: flex;align-items: center;">

      <el-select v-model="clazzvalue" placeholder="请选择" class="kuang" @change="changeClazz">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''">
        </el-option>
      </el-select>
      <span class="text">{{qiandaochar+":"}}</span>
      <!-- <span class="text">{{name}}</span> -->

      <el-input placeholder="请输入签到名称" class="kuang" size="medium" v-model="input" clearable style="width:14% ">
      </el-input>
      <span class="text" id='jshutime'>{{qiandaochar2+":"}}</span>

      <div class="block">
        <span class="demonstration"></span>
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="发布签到结束时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </div>

      <el-button @click="publishClick"  id="publishbutton" >发布签到</el-button>
    </div>






    <div class="part">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">

        <el-table-column  v-for="(item,i) in tablecol"
                          :key="i"
                          :prop="item.prop"
                          :label="item.label"
                          :width="item.width"
                          height="57">
        </el-table-column>


        <el-table-column label="签到结果" v-if="showOper" align="center" width="180">
          <template slot-scope="scope">
            <!--          <router-link to="/teacher/signin/signinlist" tag="button" >签到结果</router-link>-->
            <el-button type='text' @click="lookClick(scope.row)" id="lookbutton">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="修改结束时间" v-if="showOper" align="center" width="170">
          <template slot-scope="scope">
            <!--          <router-link to="/teacher/signin/signinchange" tag="button" >修改结束时间</router-link>-->
            <el-button @click="editClick(scope.$index,scope.row)" type="text" id="lookbutton">编辑</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
    prop="Releasetime"
    label="发布时间"
    width="220"
        height="57">
  </el-table-column>

        <el-table-column
    prop="Endtime"
    label="结束时间"
        width="220"
        height="57">
  </el-table-column>

        <el-table-column
        prop="Checkintime"
        label="签到时间"
        width="220"
        height="57">
        </el-table-column>

        <el-table-column
    prop="state"
    label="状态"
    width="167"
        height="57">
  </el-table-column>

        <el-table-column
    prop="Checkinresults"
    label="签到结果"
    width="120"
        height="57">
  </el-table-column>  -->

      </el-table>
    </div>
  </div>


  </div>
</template>

<script>
export default {
  name: "signinlist",

  data() {
    return {
      options: [],
      clazzvalue: '',

      showOper:'true',
      //搜索框文字
      qiandaochar:'签到名称',
      qiandaocishu:'第x次签到',

      qiandaochar2:'结束时间',
      //时间
      updateTime:'',

      clazzvalue: '',
      resultname:'',
      author:'',
      //搜索框
      input:'',
      Id:'',



      value1: '',




      tablecol:[
        {prop:"attendanceName",label:"签到名称",width:"108px"},
        {prop:"startAt",label:"发布时间",width:"220"},
        {prop:"endAt",label:"结束时间",width:"220"},
        {prop:"state",label:"状态",width:"167"},

      ],

      tableData: []




    };


  },

  created() {
    this.options = JSON.parse(localStorage.getItem('clazzInfo'))
    this.clazzvalue = this.options[0].id+''
    this.author=this.options[0].teacherName+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.clazzvalue)
    else this.clazzvalue = localStorage.getItem('clazzvalue')
    this.queryList()
  },



  methods:{
    changeClazz() {
      this.queryList()
      localStorage.setItem('clazzvalue', this.clazzvalue)
    },
    queryList(){
      let info = {
        clazzId:this.clazzvalue
      }
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        // data:JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/attendance/teacherAll?clazzId='+this.clazzvalue
      }).then((response) => {          //这里使用了ES6的语法
        //console.log(JSON.stringify(response))       //请求成功返回的数据
        //console.log(response.data.data)
        //this.tableData = response.data.data
        let that = this
        response.data.data.forEach(function(item,index){
          that.tableData.push(item)
          that.tableData[index].state = that.tableData[index].state==true?"进行中":"已结束"
        })
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    lookClick(row) {
      // this.resultname=row.attendanceName;
      this.$router.push({
        path: '/teacher/signin/signindetail',
        query: {
          resultname:row.attendanceName,
          Id:row.id
        }
      })
      // this.$router.push({name: '/student/activity/homeworkdetail', params: {userId: this.userID,name: this.name}})
    },
    editClick(index,row) {
      // this.resultname=row.attendanceName
      this.$router.push({
        path: '/teacher/signin/signinchange',
        query: {
          resultname:row.attendanceName,
          Id:this.tableData[index].id
        }
      })
      // this.$router.push({name: '/student/activity/homeworkdetail', params: {userId: this.userID,name: this.name}})
    },

    publishClick() {
      let info = {
        endAt:this.value1,
        attendanceName:this.input,
        clazzId:this.clazzvalue,
        issuer:this.author
      }

      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/attendance/release',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(JSON.stringify(response))       //请求成功返回的数据
        // alert(JSON.stringify(response))
        alert('发布成功')

        this.$router.push({
          path: '/teacher/signin/signinlist',

        })
        this.$router.go(0)
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    }

  },

}




</script>

<style scoped>

#div1{
  width: 100%px;
  margin-left: 0px;
  margin-top: 5%px;

  background-color: rgba(245, 242, 242, 100);
}
#clazzname{
  float: left;


}
#div2{
  width:100 %;
  margin-top: 10%px;
  margin-left: 0px;
  background-color: white;

  text-align: center;

}
#div3{

  margin-top: -5;
  display: flex;
  align-items: center;
  height: 48px;
  width: 1060px;
  border: 1px solid rgba(187, 187, 187, 100);
}
#jshutime{
  margin-left: 40px;
}
.text {
  font-size: 16px;
  color: black;
  margin-left: 14px;
}

.kuang{
  height: 40px;
}
.part{
  margin-top: 0px;
  margin-left: 0px;
  background-color: rgb(228, 228, 228);

}
</style>
