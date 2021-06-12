<template>
  <div id="div1">
    <el-table id="table"
              :data="tableData"
              style="width: 100%;"
              :row-style="{height:'100px'}"
              :show-header="status"
              border>
      <el-table-column
        v-for="(item,i) in tableCol"
        :key="i"
        :prop="item.prop"
        :width="item.width">
      </el-table-column>
    </el-table>


  </div>
</template>

<script>

export default {
  name: "noticedetail",
  data() {
    return {
      status: false,

      tableCol: [
        {prop: "key", label: "键", width: 249},
        {prop: "value", label: "值", width: 650},

      ],

      tableData: [
        {key: "标题：", value: this.$route.query.nname},
        {key: "通知内容：", value: this.$route.query.content},

      ],

      sId: this.$route.query.stuId,
      content: '',
      file: ''

    };
  },


  methods: {

  },

}
</script>

<style scoped>
#table {
  border-radius: 10px;
  box-shadow: 2px 2px 10px #b3b1b1;
}

#div1 {
  background-color: white;
}
</style>
