<template>
  <div id="div1">
    <div>
      <span class="text">提交情况</span>
    </div>

    <br>

    <div>
      <div>
        <i class="el-icon-folder-opened"></i>
        <span>{{filename}}</span>
        <el-button type="primary" plain size="mini" class="button" @click="downloadClick" icon="el-icon-download">下载</el-button>

      </div>

      <br>

      <div>
        <el-input v-model="input1" rows="9" type="textarea" placeholder="回答的内容" resize="none" readonly></el-input>
      </div>

      <br>

      <div>
        <span id="span" class="text">评语</span>

      </div>
    </div>

    <br>

    <div>
      <el-form :model="commentForm" :rules="rules" ref="commentForm">
        <el-form-item prop="comment">
          <el-input v-model="commentForm.comment" type="textarea" placeholder="请输入评论" resize="none"></el-input>
        </el-form-item>

        <el-form-item id="publishButton">
          <el-button type="primary" plain size="mini" @click="publishClick" class="button">批改</el-button>
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

    }
  },
  methods: {
    downloadClick() {

      this.queryDownload()
    },
    publishClick() {
      this.queryUpdate()
      this.$router.push({
        path: '/teacher/activity/homeworkdetail',
        query: {
          hwId: this.hwId,

        }
      })

    },

    queryDownload() {
      window.location.href = 'http://1.15.149.222:8080/coursewebsite/homework_result/download?id='+this.id;

    },

    queryUpdate() {
      let info = {
        score: this.markForm.mark,
        remark: this.commentForm.comment,
        id: this.id
      }

      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework_result/update' ,
      }).then((response) => {          //这里使用了ES6的语法
        /*console.log(JSON.stringify(response))       //请求成功返回的数据
        alert(JSON.stringify(response))
        alert("成功")*/

        console.log(response.data.data.list)
        this.tableData = response.data.data.list
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },

  },

}
</script>

<style scoped>
#div1 {
  background-color: white;
  margin-top: 3%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

.button {
  color: white;
  background-color: #4ab2ee;
}

#span {
  font-size: 15px;
}

.text {
  font-weight: bold;
}

#publishButton {
  float: right;
}
</style>
