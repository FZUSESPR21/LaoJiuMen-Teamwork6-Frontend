<template>
  <div id="div1">
    <div id="divP">
      <p class="p1">发布作业</p>
    </div>

    <p id="p2">作业内容</p>
    <el-dialog
      title="提示"
      :visible.sync=tipBox>
      <span>作业标题重复，请修改</span>
    </el-dialog>

    <div id="divSelect">
      <span class="text">班级：</span>
      <el-select size="mini" v-model="value" placeholder="请选择班级" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''">
        </el-option>
      </el-select>
    </div>

    <br>

    <div id="divContent">
      <el-form :model="publishForm" :rules="rules" ref="publishForm">
        <el-form-item prop="title">
          <i class="el-icon-star-on"></i>
          <span class="text">标题</span>
          <el-input v-model="publishForm.title" placeholder="请输入作业标题" resize="none"></el-input>
        </el-form-item>

        <el-form-item prop="time1">
          <i class="el-icon-star-on"></i>
          <span class="text">发布时间</span>
          <br>
          <el-date-picker
            v-model="date2"
            type="datetime"
            placeholder="选择发布时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item prop="time2">
          <i class="el-icon-star-on"></i>
          <span class="text">截止时间</span>
          <br>
          <el-date-picker
              v-model="date1"
              type="datetime"
              placeholder="选择截止时间"
              value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>


        <el-form-item prop="content">
          <i class="el-icon-star-on"></i>
          <span class="text">内容</span>
          <el-input v-model="publishForm.content" rows="4" type="textarea" placeholder="请输入作业内容" resize="none"></el-input>
        </el-form-item>

        <el-form-item>
          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>确定发布该作业吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="publishClick('publishForm'), visible=false">确定</el-button>
            </div>
            <el-button slot="reference" type="primary" plain size="mini" class="button" id="publishbutton">发布</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "publishhomework",
  data() {
    var validateTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标题不能为空，请输入'));
      } else {
          callback();
        }
    };

    var validateContent = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空，请输入'));
      } else {
        callback();
      }
    };

    /*var validateTime1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('发布时间不能为空，请选择'));
      } else {
        callback();
      }
    };

    var validateTime2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('截止时间不能为空，请选择'));
      } else {
        callback();
      }
    };*/

    return {
      visible: false,
      options: [],
      value: '',

      publishForm: {
        title: '',
        content: ''
      },

      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      date1: '',
      date2: '',

      rules: {
        title:  { validator: validateTitle, trigger: 'blur' },
        content: { validator: validateContent, trigger: 'blur' },
        /*time1: { validator: validateTime1, trigger: 'blur' },
        time2: { validator: validateTime2, trigger: 'blur' },*/
      },

      tipBox: false,
    }
  },

  created() {
    this.options = JSON.parse(localStorage.getItem('clazzInfo'))
    this.value = this.options[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.value)
    else this.value = localStorage.getItem('clazzvalue')
  },

  methods: {
    selectChange() {
      localStorage.setItem('clazzvalue', this.value)
    },

    publishClick(formName) {
      let info = {
        id:"",
        clazzId: this.value,
        title: this.publishForm.title,
        content: this.publishForm.content,
        startAt: this.date2,
        endAt: this.date1
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {

      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/teacher/homework/add',
      }).then((response) => {          //这里使用了ES6的语法
        if (response.data.code==='200') {
          alert('发布成功')
          this.$router.push('/teacher/activity/homeworklist')
          this.$router.go(0)
        }
        console.log(response)
        if (response.data.code==='500') {
          alert("标题重复,请修改")
        }
      }).catch((error) => {
        console.log(error)
      })} else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
#div1 {
  background-color: white;
  margin-top: -1%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#divP {
  background-color: #e8e8e8;
}

.p1 {
  font-size: 15px;
  font-weight: bold;
  margin-left: 2%;
  padding-top: 1%;
  padding-bottom: 1%;
}

#p2 {
  font-weight: bold;
  margin-left: 3%;
}

#divSelect {
  float: right;
  margin-right: 3%;
}
#divContent {
  margin-left: 3%;
  margin-right: 3%;
}

.button {
  color: white;
  background-color: #4ab2ee;
}

.text {
  font-weight: bold;
}

#publishbutton {
  float: right;
  margin-bottom: 2%;
}
</style>
