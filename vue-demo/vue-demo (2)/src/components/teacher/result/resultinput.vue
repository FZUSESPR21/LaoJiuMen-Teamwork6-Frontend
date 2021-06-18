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
