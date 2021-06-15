<template>
  <div id="div1">
    <div>
      <span id="span1">提交情况</span>
    </div>

    <div id="file">
      <i class="el-icon-folder-opened"></i>
      <span v-model="filename">{{filename}}</span>
<!--      <el-button type="primary" plain size="mini" id="button" @click="downloadClick">下载</el-button>-->

     <el-popover
        placement="top"
        width="160"
        v-model="visible">
        <p>确定下载该作业文件吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="downloadClick, visible = false">确定</el-button>
        </div>
        <el-button slot="reference" type="primary" plain size="mini" id="button">下载</el-button>
      </el-popover>

<!--      <el-button type="primary" plain size="mini" id="button" @click="downloadClick">下载</el-button>-->
    </div>

    <div id="input1">
      <el-input v-model="input1" rows="9" type="textarea" placeholder="回答的内容" resize="none" readonly></el-input>
    </div>

    <div id="input2">
      <span id="span2">教师评语</span>
      <el-input id="pinglun" v-model="input2" rows="5" type="textarea" placeholder="评论内容" resize="none" readonly></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "submittedhomeworkdetail",
  data() {
    return {
      visible: false,

      input1: this.$route.query.content,
      input2: this.$route.query.remark,

      filename: this.$route.query.filepath.split("\\")[this.$route.query.filepath.split("\\").length-1],
      id: this.$route.query.id,

      title: this.$route.query.title,
      homeworkContent: this.$route.query.homeworkContent,
    }
  },

  methods: {
    downloadClick() {
      this.queryDownload()
    },

    queryDownload() {
      window.location.href = 'http://1.15.149.222:8080/coursewebsite/homework_result/download?id='+this.id;

    },

  },

}
</script>

<style scoped>
#div1 {
  margin-bottom: 2%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#button {
  color: white;
  background-color: #4ab2ee;
}

#span1 {
  font-weight: bold;
  margin-left: 1%;
}

#span2 {
  font-weight: bold;
  font-size: 15px;
}

#file {
  margin-left: 3%;
  margin-top: 2%;
}

#input1 {
  margin-top: 2%;
  margin-left: 3%;
  margin-right: 3%;
}

#input2 {
  margin-top: 2%;
  margin-left: 3%;
  margin-right: 3%;
}

</style>
