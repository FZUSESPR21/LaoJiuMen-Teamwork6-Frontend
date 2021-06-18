<template>
  <div id="div1">
    <div id="span1">
      <span class="text">提交情况</span>
    </div>

    <div id="divContent">
      <div>
        <i class="el-icon-folder-opened"></i>
        <span>{{filename}}</span>
<!--        <el-button type="primary" plain size="mini" class="button" @click="downloadClick" icon="el-icon-download">下载</el-button>-->
        <el-popover
          placement="top"
          width="160"
          v-model="visible">
          <p>确定下载该作业文件吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="downloadClick">确定</el-button>
          </div>
          <el-button slot="reference" type="primary" plain size="mini" id="button">下载</el-button>
        </el-popover>
      </div>

      <div class="input1">
        <el-input v-model="input1" rows="9" type="textarea" placeholder="回答的内容" resize="none" readonly></el-input>
      </div>

      <div id="span2">
        <span class="text">评语</span>
      </div>

      <div>
        <el-form :model="commentForm" :rules="rules" ref="commentForm">
          <el-form-item prop="comment" class="input1">
            <el-input v-model="commentForm.comment" type="textarea" placeholder="请输入评论" resize="none"></el-input>
          </el-form-item>

          <el-form-item id="publishButton">
            <el-button type="primary" plain size="mini" @click="publishClick('markForm')" class="button">批改</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-form :model="markForm" :rules="rules" ref="markForm" inline="true">
          <el-form-item>
            <span class="text">评分：</span>
          </el-form-item>

          <el-form-item prop="mark">
            <el-input v-model="markForm.mark" size="mini" placeholder="请输入分数" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import SetPassword from "../../Login/SetPassword";
export default {
  name: "submittedhomeworkdetail",
  components: {SetPassword},
  data() {

    var validateMark = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('分数不能为空'));
      } else {
        if (value < 0 || value > 100) {
          callback(new Error('分数为0-100'));
        } else {
          callback();
        }
      }
    };

    return {
      visible: false,
      input1: this.$route.query.content,

      commentForm: {
        comment: this.$route.query.remark,
      },
      markForm: {
        mark: ''
      },

      rules: {
        mark:  { validator: validateMark, trigger: 'blur' },
      },

      id: this.$route.query.id,
      hwId: this.$route.query.hwId,
      filename: this.$route.query.filepath.split("\\")[this.$route.query.filepath.split("\\").length-1],

      hwName: this.$route.query.hwName,
      hwEndDate: this.$route.query.hwEndDate,
      hwContent: this.$route.query.hwContent,
    }
  },
  methods: {
    downloadClick() {
      this.queryDownload()
    },

    publishClick(formName) {
      this.queryUpdate(formName)
    },

    queryDownload() {
      fetch('http://1.15.149.222:8080/coursewebsite/homework_result/download?id='+this.id, {
        method: 'GET',
        headers: new Headers({
          //自己加的头信息全都要转成string
          'Content-type': 'application/json;charset=UTF-8',
          'Authorization': localStorage.getItem('token')

        }),
      })
        .then(res => res.blob())
        .then(data => {
          const blobUrl = window.URL.createObjectURL(data);
          this.download2(blobUrl);
        });
    },
    //模拟a标签实现下载excel文件
    download2(blobUrl) {
      const a = document.createElement('a');
      a.download = this.filename;
      a.href = blobUrl;
      a.click();
    },

    /*queryDownload() {
      window.location.href = 'http://1.15.149.222:8080/coursewebsite/homework_result/download?id='+this.id;
    },*/

    queryUpdate(formName) {
      let info = {
        score: this.markForm.mark,
        remark: this.commentForm.comment,
        id: this.id
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            },
            data: JSON.stringify(info),
            url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework_result/update' ,
          }).then((response) => {          //这里使用了ES6的语法
            if (response.data.code==='200') {
              alert('发布成功')
              this.$router.push({
                path: '/teacher/activity/homeworkdetail',
                query: {
                  hwId: this.hwId,

                  hwName: this.hwName,
                  hwEndDate: this.hwEndDate,
                  hwContent: this.hwContent,
                }
              })
              this.$router.go(0)
            }
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        }})
      /*this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework_result/update' ,
      }).then((response) => {          //这里使用了ES6的语法
        /!*console.log(JSON.stringify(response))       //请求成功返回的数据
        alert(JSON.stringify(response))
        alert("成功")*!/

        console.log(response.data.data.list)
        this.tableData = response.data.data.list
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })*/
    },

  },

}
</script>

<style scoped>
#div1 {
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
  margin-bottom: 2%;
}

#divContent {
  margin-top: 2%;
  margin-left: 3%;
  margin-right: 3%;
}

.button {
  color: white;
  background-color: #4ab2ee;
  margin-right: 3%;
}

#button {
  color: white;
  background-color: #4ab2ee;
}

.input1 {
  margin-top: 2%;
}

#span1 {
  margin-left: 2%;
}

#span2 {
  font-size: 15px;
  margin-top: 2%;
}

.text {
  font-weight: bold;
}

#publishButton {
  float: right;
  margin-right: 2%;
}
</style>
