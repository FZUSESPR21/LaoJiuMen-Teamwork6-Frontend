<template>
  <div id="div1">
    <div id="divP">
      <p class="p1">新建资源</p>
    </div>

    <div id="clazz">
      班级：
      <el-select size="mini" v-model="clazzValue" placeholder="请选择班级" @change="selectChange">
        <el-option
          v-for="item in classOptions"
          :key="item.id"
          :label="item.clazzName"
          :value="item.id+''">
        </el-option>
      </el-select>
    </div>

    <div id="divForm">
      <el-form :model="publishForm" ref="publishForm" label-position="top">
        <el-form-item label="资源信息" class="label">
          <i class="el-icon-star-on">选择分组</i>
          <br>
          <el-select v-model="typeValue" placeholder="课程资源">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item  label="资源内容" class="label">
          <i class="el-icon-star-on">上传文件</i>
          <br/>
          <input class="file" name="file" type="file"  @change="select"/>
          <p id="p">提示：单个文件不超过20MB</p>
        </el-form-item>

        <el-form-item>
          <el-button id="cancel" type="primary" plain size="mini" @click="cancelClick">取消</el-button>

          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>确定发布该资源吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="publishClick, visible = false">确定</el-button>
            </div>
            <el-button slot="reference" id="publish" class="button" type="primary" plain size="mini">发布</el-button>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addsource",
  data() {
    return {
      visible: false,

      classOptions: [],
      clazzValue: '',

      typeOptions: [{
        value: 0,
        label: '学习资源'
      }, {
        value: 1,
        label: '其他资源'
      },],
      typeValue: 0,

      publishForm: {
        title: ''
      },

      url: '',
      tId: 1,
      file: '',
    }
  },

  created() {
    this.classOptions = JSON.parse(localStorage.getItem('clazzInfo'))
    this.clazzValue = this.classOptions[0].id+''
    if (!localStorage.getItem('clazzvalue'))
      localStorage.setItem('clazzvalue', this.clazzValue)
    else this.clazzValue = localStorage.getItem('clazzvalue')
  },

  methods: {
    selectChange() {
      // this.queryView()
      localStorage.setItem('clazzvalue', this.clazzValue)
    },

    select (e) {
      this.file = e.target.files[0]
    },

    cancelClick() {
      this.$router.push({
        path: '/teacher/source/other',
        query: {

        }
      })
    },


    publishClick() {//确定上传
      let param = new FormData() // 创建form对象
      param.append('file', this.file, this.file.name) // 通过append向form对象添加数据
      param.append('teacherId', this.tId)
      param.append('clazzId',this.clazzValue)
      param.append('type',this.typeValue)// 添加form表单中其他数据
      // withCredentials: true 使得后台可以接收表单数据  跨域请求
      const instance = this.$axios.create({
        withCredentials: true
      })
      // url为后台接口
      instance.post('http://1.15.149.222:8080/coursewebsite/teacher/resource/upload', param)
        .then(this.succ)// 成功返回信息 调用函数  函数需自己定义，此处后面省略
        .catch(this.serverError) // 服务器错误 调用对应函数  函数需自己定义，此处后面省略


    }
  }
}
</script>

<style scoped>
#clazz {
  float: right;
  margin-right: 3%;
  margin-top: 3%;
}

#div1 {
  background-color: white;
  margin-top: -1%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#divP {
  background-color: #e8e8e8;
}

#divForm {
  margin-left: 3%;
  margin-right: 3%;
}

.p1 {
  font-size: 15px;
  font-weight: bold;
  margin-left: 2%;
}

.label {
  font-weight: bold;
}

.button {
  color: white;
  background-color: #4ab2ee;
  float: right;
  margin-bottom: 2%;
}

#publish {
  margin-right: 2%;
}

#cancel {
  color: #4ab2ee;
  background-color: white;
  float: right;
  margin-bottom: 2%;
}

</style>
