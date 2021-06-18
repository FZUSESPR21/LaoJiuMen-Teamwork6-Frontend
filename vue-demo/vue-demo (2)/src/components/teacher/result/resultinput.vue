<template>
  <div>
      <!--上传学生成绩excel-->
    <div class="rinput">
<!--      <el-upload-->
<!--        class="upload-demo"-->
<!--        action="https://jsonplaceholder.typicode.com/posts/"-->
<!--        :on-preview="handlePreview"-->
<!--        :on-remove="handleRemove"-->
<!--        :before-remove="beforeRemove"-->
<!--        multiple-->
<!--        :limit="3"-->
<!--        :on-exceed="handleExceed"-->
<!--        :file-list="fileList">-->
<!--        <el-button size="small" type="primary">点击上传</el-button>-->
<!--        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>-->
<!--      </el-upload>-->
      <input class="file" name="file_excel" type="file"  @change="select"/>
      <el-button size="mini" id="uploadbtn" icon="el-icon-upload2">上传Excel录入成绩</el-button>
      <el-button size="small" type="primary" @click="downTemplate">下载文件</el-button>
    </div>

<!--平时成绩占比选择-->
    <div class="normalpro">
      <p>请选择平时成绩占比</p>
      <el-radio v-model="radio" label="1">20%</el-radio>
      <el-radio v-model="radio" label="2">30%</el-radio>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="getrule"
      >
      <el-table-column label="课堂表现得分规则/次">
        <el-table-column prop="abs" label="缺勤">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.abs" placeholder="缺勤"></el-input>
            <span v-else>{{scope.row.abs}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leave" label="请假">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.leave" placeholder="请假"></el-input>
            <span v-else>{{scope.row.leave}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="positivescore" label="表现积极">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.positivescore" placeholder="表现积极"></el-input>
            <span v-else>{{scope.row.positivescore}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="小测得分规则/次">
        <el-table-column prop="scoreA" label="A100">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.scoreA" placeholder="A"></el-input>
            <span v-else>{{scope.row.scoreA}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scoreB" label="B90-80">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.scoreB" placeholder="B"></el-input>
            <span v-else>{{scope.row.scoreB}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scoreC" label="C70-30">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.scoreC" placeholder="C"></el-input>
            <span v-else>{{scope.row.scoreC}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scoreD" label="D20-0">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.scoreD" placeholder="D"></el-input>
            <span v-else>{{scope.row.scoreD}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scoreF" label="F缺交">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.scoreF" placeholder="F"></el-input>
            <span v-else>{{scope.row.scoreF}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="作业得分规则/次">
        <el-table-column prop="homescore" label="缺交">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.homescore" placeholder="缺交"></el-input>
            <span v-else>{{scope.row.homescore}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="text" size="medium" @click="confirmAdd(scope.row)">
              <i class="el-icon-check" aria-hidden="true"></i>
            </el-button>
            <div v-else>
              <el-button type="text" size="medium" @click="editData(scope.row)">
                <i class="el-icon-edit" aria-hidden="true"></i>
              </el-button>
              <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                <i class="el-icon-delete" aria-hidden="true"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <el-button type="text" @click="addData">添加数据</el-button>
    <el-divider></el-divider>
    <el-button @click="submitData">提交 </el-button>

<!--录入单个学生成绩-->
    <div class="getscore">
      <el-table :data="tableData" border stripe style="width: 100%;">
        <el-table-column prop="number" label="学号">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.number" placeholder="学号"></el-input>
            <span v-else>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="absence" label="缺勤次数">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.absence" placeholder="缺勤次数"></el-input>
            <span v-else>{{scope.row.absence}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="positive" label="表现积极次数">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.positive" placeholder="表现积极次数"></el-input>
            <span v-else>{{scope.row.positive}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getA" label="小测获得A">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.getA" placeholder="A"></el-input>
            <span v-else>{{scope.row.getA}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getB" label="小测获得B">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.getB" placeholder="B"></el-input>
            <span v-else>{{scope.row.getB}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getC" label="小测获得C">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.getC" placeholder="C"></el-input>
            <span v-else>{{scope.row.getC}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getD" label="小测获得D">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.getD" placeholder="D"></el-input>
            <span v-else>{{scope.row.getD}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="getF" label="小测获得F">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.getF" placeholder="F"></el-input>
            <span v-else>{{scope.row.getF}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="homeworkScore" label="作业最终分数">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.homeworkScore" placeholder="最终分数"></el-input>
            <span v-else>{{scope.row.homeworkScore}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="homeworkMiss" label="作业缺交次数">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.homeworkMiss" placeholder="缺交次数"></el-input>
            <span v-else>{{scope.row.homeworkMiss}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="results" label="卷面成绩">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.results" placeholder="卷面成绩"></el-input>
            <span v-else>{{scope.row.results}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="text" size="medium" @click="confirmAdd(scope.row)">
              <i class="el-icon-check" aria-hidden="true"></i>
            </el-button>
            <div v-else>
              <el-button type="text" size="medium" @click="editData(scope.row)">
                <i class="el-icon-edit" aria-hidden="true"></i>
              </el-button>
              <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
                <i class="el-icon-delete" aria-hidden="true"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="总分">
          <template slot-scope="scope">
            <span>{{scope.row.total}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="text" @click="addData">添加数据</el-button>
      <el-divider></el-divider>
      <el-button @click="submitData">提交 </el-button>
      <el-button @click="calculateData">计算 </el-button>
    </div>

    <!--搜索单个学生的成绩-->
    <div>
      <div class="searchcondition">
        学号：
        <el-input
            placeholder="请输入学号"
            prefix-icon="el-icon-search"
            v-model="input1"
            style="width:20%"
            >
        </el-input>
        <el-button @click="searchData">搜索 </el-button>
      </div>
      <div>
        该生在本课程网站上签到的缺勤次数：
        <el-divider></el-divider>
        该生在本课程网站上的作业得分情况：
            <el-table
            :data="homeworkData"
            style="width: 80%;margin-top: 2%">
              <el-table-column
                prop="homeName"
                label="课程名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="homeScore"
                label="得分（满分100）"
                width="180">
              </el-table-column>
            </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "resultinput",
  data () {
    return {
      radio: '1',
      input1: '',
      tableData: [],
      fileList: [{name: '', url: ''}],//已上传的文件
        homeworkData: [
        {
          homeName: '第一次作业',
          homeScore: '',
        },
        {
          homeName: '第二次作业',
          homeScore: '',
        },
        {
          homeName: '第三次作业',
          homeScore: '',
        },
        {
          homeName: '第四次作业',
          homeScore: '',
        },
        {
          homeName: '第五次作业',
          homeScore: '',
        }]
      }
    },
    methods: {
	  //添加
      addData() {
        this.tableData.push({
          edit: true,
        });
      },
      //确认添加
      confirmAdd(row) {
        row.edit = false;
      },
      //修改
      editData(row) {
        row.edit = true;
      },
      //删除
      deleteData(row, index) {
        this.tableData.splice(index, 1);
      },
      submitData() {
        alert(JSON.stringify(this.tableData))
      },
      calculateData() {
        alert(JSON.stringify(this.tableData))
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      downTemplate () {
        window.location.href = 'http://1.15.149.222:8080/coursewebsite/teacher/score/down?clazzId='+localStorage.getItem('clazzvalue')
        // axios({
        //   method: 'get',
        //   url:'xxx相对地址xxx',
        //   responseType: 'blob'
        // }).then(res => this.downloads(res.data, res.headers.filename))
      },

      // 创建模板下载链接
      // downloads (data, name){
      //   if(!data){
      //       return
      //   }
      //   let url = window.URL.createObjectURL(new Blob([data]))
      //   let link = document.createElement('a')
      //   link.style.display ='none'
      //   link.href = url
      //   link.setAttribute('download', `前端拼接后端返回的名字${name}.xlsx`)
      //   document.body.appendChild(link)
      //   link.click()
      //   document.body.removeChild(link)
      //   window.URL.revokeObjectURL(url)
      // },

      searchData(){

      },

      select(e) {

        this.file = e.target.files[0]
        // console.log(file)
        let param = new FormData() // 创建form对象
        param.append('file_excel', this.file, this.file.name) // 通过append向form对象添加数据
        // withCredentials: true 使得后台可以接收表单数据  跨域请求
        const instance = this.$axios.create({
          withCredentials: true
        })
        // url为后台接口
        instance.post('http://1.15.149.222:8080/coursewebsite/teacher/score/excel', param)
          .then((response) => {
            console.log(response.data)
            // this.$router.push('/teacher/manage/studentlist')
            // this.$router.go(0)
          }) // 成功返回信息 调用函数  函数需自己定义，此处后面省略
          .catch(this.serverError) // 服务器错误 调用对应函数  函数需自己定义，此处后面省略
      },

    }
  }

</script>


<style>
.normalpro{
  margin-top:2%
}
.getrule{
  margin-top:2%
}
.getscore{
  margin-top:5%
}
.searchcondition{
  margin-top:5%;
  margin-bottom: 2%;
}
.upload-demo{
    margin-top:2%
}
</style>

<style scoped>
#head{
  background-color: white;
  font-size: 20px;
  height: 100px;
  margin-top: 8%;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  margin-top: -4%;
  background-color: rgb(228, 228, 228);
}
.rinput{
  margin-top:5%;
}
#uploadbtn{
  display: inline;
  margin-left: -178px;
  margin-right: 10px;
}
.file {
  position: relative;
  display: inline-block;
  width: 175px;
  height: 28px;
  margin-left: 15px;
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
