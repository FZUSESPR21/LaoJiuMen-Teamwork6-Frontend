<template>
  <div>
    <div id="head">课程签到
      <p class="english">Signin</p>
    </div>
    <div id="div1">

      <div class="part">
        <el-table
          :data="tableData"
          stripe
          :row-style="{height:'64px'}"
          :cell-style="{padding:'0px'}"
          style="width: 100%">

          <el-table-column  v-for="(item,i) in tablecol"
                            :key="i"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                            height="57">
          </el-table-column>

          <el-table-column label="签到结果"  align="center" width="120">
            <template slot-scope="scope">



              <!-- <el-button>
                <span v-if="!item.result">点击签到</span>
                <span v-else disabled="true">未出勤</span>
              </el-button> -->
              <el-button v-if="scope.row.result==='错误' && scope.row.state==='进行中'" type="text" @click="aClick(scope.row)"  class="button" >点击签到</el-button>
              <el-button v-else-if="scope.row.result=='正确'" type="text"  class="button" disabled="">已签到</el-button>
              <el-button v-else-if="scope.row.state=='已结束' && scope.row.result=='错误'" type="text"  class="button" disabled="" >未出勤</el-button>
              <!-- <el-button v-else-if="scope.row.state=='false' && scope.row.result=='false'" type="text" size="mini" @click="downloadClick(scope.$index)" class="button" >未签到</el-button> -->


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
  name: "signinmain",

  data() {
    return {
      updateTime:'',
      clazzvalue:'',
      studentId:'',
      gettime:'',
      id:'',
      tablecol:[
        {prop:"attendanceName",label:"签到名称",width:"108px"},
        {prop:"startAt",label:"发布时间",width:"220"},
        {prop:"endAt",label:"结束时间",width:"220"},
        {prop:"attendedAt",label:"签到时间",width:"220"},
        {prop:"state",label:"状态",width:"167"},


      ],

      tableData: [],
      total: 1,

      states : [],


    }
  },

  created() {
    this.clazzvalue=localStorage.getItem('clazzId')
    this.studentId=localStorage.getItem('id')
    this.queryList()

  },


  methods:{
    //获取当前年月日






    queryList(){

      let info = {
        clazzId :this.clazzvalue,
        id:localStorage.getItem('id')
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data:JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/attendance/all'
      }).then((response) => {          //这里使用了ES6的语法
        //console.log(JSON.stringify(response))       //请求成功返回的数据
        //console.log(response.data.data)
        //this.tableData = response.data.data
        console.log(response.data.data)
        this.total = response.data.data.length
        this.tableData = response.data.data
        for(var i = 0;i < this.total;i++) {
          this.tableData[i].state = this.tableData[i].state == true?"进行中":"已结束"
          this.tableData[i].result = this.tableData[i].result == true?"正确":"错误"
        }

        // console.log(this.total)
        // for(var i = 0;i < this.total;i++) {
        // 	console.log(this.tableData[i].result)
        // }


        /* let that = this

        response.data.data.forEach(function(item,index){
          that.tableData.push(item)
          that.states.push({
            "state" : that.tableData[index].state,
            "result" : that.tableData[index].result,
            "id" : item.id
          })
          that.tableData[index].state = that.tableData[index].state == true?"进行中":"已结束"


        })
        console.log(that.states) */
        //that.states[0].state = false
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    aClick(row){
      this.id=row.id
      row.result='正确'
      let yy = new Date().getFullYear();
      let mm = (new Date().getMonth()+1)<10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
      let dd = new Date().getDate()<10 ? '0'+new Date().getDate() : new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      let gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;

      let delOneMessage = {
        // attendedAt:gettime,
        attendanceId: this.id+'',
        studentId:this.studentId

      }
      console.log(delOneMessage)
      console.log("hhhhh")
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(delOneMessage),
        url: 'http://1.15.149.222:8080/coursewebsite/attendance/stuUpdate'
      }).then((response) => {          //这里使用了ES6的语法
        console.log(JSON.stringify(response))       //请求成功返回的数据
        this.queryList()
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

    // lookClick(e) {
    // this.show=false
    //       this.name = e.name
    //       this.endDate = e.endDate
    //       this.$router.push({
    //         // path: '/student/activity/noticedetail',
    //         query: {
    //           userId: this.userID,
    //           name: this.name,
    //           endDate: this.endDate
    //         }
    //       })
    //       // this.$router.push({name: '/student/activity/homeworkdetail', params: {userId: this.userID,name: this.name}})
    //     },






  }

}
</script>

<style scoped>
#head{
  font-size: 20px;
  height: 100px;
}
.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

#div1{
  width: 3000px;
  margin-left: 0px;
  margin-top: 0px;
  text-align: center;
  background-color: rgba(245, 242, 242, 100);
}

.part{
  margin-top: 0px;
  background-color: rgb(228, 228, 228);
  margin-left: 0px;
}
</style>
