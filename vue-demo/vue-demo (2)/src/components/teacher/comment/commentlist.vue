<template>
  <div>

    <div class="part">
      <!--      search部分-->
      <div class="searchPart">

          <select id="selectPart" v-model="type">
            <option value="文章标题">文章标题</option>
            <option value="作者">作者</option>
          </select>
          <input type="text"  id="search" v-model="search"></input>
          <button id="searchBtn" @click="goToSearch">搜索</button>
          <el-button class="searchBtn" @click="ToOwnlist">仅看自己</el-button>
          <el-button class="searchBtn" @click="insertTopic">发表新话题</el-button>


      </div>
      <!--      title&contain-->
      <div class="titleContain">
        <div class="title" >
          标题：
        </div>
        <input type="text"  placeholder="输入标题" class="titleText" ref="titleValue">

        </input>
        <div class="contain">
          内容：
        </div>
        <input type="text"  placeholder="输入内容" class="containText" ref="containValue">

        </input>
      </div>
      <!--      讨论列表-->
      <ul id="app">
        <li v-for="item in commentList">
          <div class="comment-item">
            <div class="comment-title">
              {{item.title}}
            </div>
            <div class="comment-contains" @click="ToDetail(item)">
              {{item.content}}
            </div>
            <div class="comment-info">
              <span class="comment-name">{{item.name}}</span>
              <span>发布于</span>
              <span class="comment-time">{{item.releasedAt}}</span>
              <el-button size="mini" @click="deleteOne(item.id)" id="deletebtn">删除</el-button>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentlist",
  data(){
    return{
      commentList:[],
      newTitle:'',
      newContain:'',
      type:'文章标题',
      search:''
    }
  },
  created() {
    this.getCommentInfo();
  },
  methods:{
    ToOwnlist:function (){
      this.$router.push({
        path: '/teacher/comment/owncommentlist',
      })
    },
    ToDetail(e){
      this.$router.push({
        path: '/teacher/comment/commentdetail',
        query:{
          detailID:e.id,
            title:e.title,
            name:e.name,
            content:e.content,
            released_at:e.releasedAt
        }
      })
    },
    getCommentInfo:function (){
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: 'http://1.15.149.222:8080/coursewebsite/topic/all',
      }).then((response) => {          //这里使用了ES6的语法
        console.log(JSON.stringify(response))       //请求成功返回的数据
        // console.log(response.data.data.list)
        this.commentList = response.data.data.list
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    goToSearch:function (){
      let type,search
      type = this.type
      search = this.search
      let searchList = {}
      let url
      if(type==="文章标题")
      {
          searchList = {
            "title" : search,
            "pn" : 1
          }
          url = 'http://1.15.149.222:8080/coursewebsite/topic/srh_t?title='+search
      }
      else{
        searchList = {
          "name" : search,
          "pn" : 1
        }
        url = 'http://1.15.149.222:8080/coursewebsite/topic/srh_n?name='+search
      }
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: url,
        // data: searchList
      }).then((response) =>{
        console.log(response.data)
        // this.$refs.containValue.value=''
        // this.$refs.titleValue.value=''
        // this.getCommentInfo()
        // this.$router.go(0)
        this.commentList = response.data.data.list
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    insertTopic:function (){
      this.newContain=this.$refs.containValue.value
      this.newTitle=this.$refs.titleValue.value
      console.log(this.newTitle)
      if(this.newContain==''||this.newTitle=='')
        alert("请输入话题！")
      else {
        this.$axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          url: 'http://1.15.149.222:8080/coursewebsite/topic/add',
          data: {
            account: localStorage.getItem('account'),
            title: this.newTitle,
            content: this.newContain
          }
        }).then((response) =>{
          console.log(response.data)
          this.$refs.containValue.value=''
          this.$refs.titleValue.value=''
          this.getCommentInfo()
          this.$router.go(0)
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      }
    },
    deleteOne(topicId){
      let info = {
        id: topicId
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/topic/delete',
      }).then((response) =>{
        this.getCommentInfo();
        this.$router.go(0)
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    }
  }
}

</script>

<style scoped>
#head{
  background-color: white;
  font-size: 20px;
  height: 100%;
  margin-top: 8%;
  margin-left: 4%;
  margin-bottom: 6%;
}

.english{
  color: rgb(179, 179, 179);
  margin-top: 0;
  font-size: 15px;
}

.part{
  margin-top: 7px;
  background: rgb(255,255,255);
  border: rgb(186,186,186) solid 1px;
  box-shadow: 5px 5px 10px #b6b4b4 ;
  margin-bottom: 10px;
}
#searchBtn{
  width: 60px;
  height: 25px;
  font-size: 10px;
  margin-left: 30px;
  margin-top: auto;
  background: rgb(253, 253, 253);
  border: 1px solid;
  border-radius: 3px;
}
/*searchPart*/
.searchPart{
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: rgb(190,188,191) 1px solid;
}
.searchBtn{
  background: rgb(57,187,255);
  color: white;
  float: right;
  height: 90%;
  margin-right: 10px;
  margin-top: 3px;
}
#search,#selectPart{
  margin-top: auto;
}
#selectPart{
  height: 30px;
  border: 1px solid;
  border-radius: 3px;
  width: 100px;
  margin-left: 4%;
}
#search{
  height: 25px;
  border: 1px solid;
  border-radius: 5px;
  padding-left: 5px;
  width: 250px;
  margin-left: 15px;
}
/*讨论详情style*/
ul{
  padding:0;
}
li{
  list-style: none;
  width: 100%;
}
.comment-title{
  font-size: 18px;
  font-family: bold;
  margin-bottom: 8px;
}
.comment-item{
  width: 96%;
  margin-left: 2%;
  height: 180px;
  font-size: 13px;
  border-bottom: 1px solid rgb(185,185,185);
  background: rgb(255,255,255);
}
.comment-time,.comment-name{
  color: deepskyblue;
}
.comment-contains{
  width: 100%;
  height: 60%;
}
.comment-info{
  margin-bottom: 2px;
}

/*分页*/
.block{
  margin-top:20px;
  margin-bottom: 20px;
}
/*.page{*/
/*  margin-right: 0;*/
/*}*/
/*bottom发表评论*/
.comment-left{
  height: 80px;
  line-height: 80px;
  padding-left: 10px;
  border: black solid 1px;
  width: 8%;
  float: left;
}
.comment-text{
  height: 80px;
  float: right;
  resize: none;
  border: black solid 1px;
  padding-top: 0;
  width: 89%;
}
.submitBtn{
  margin-top:20px;
  float: right;
  background: rgb(57,187,255);
  color: white;
}
/*虚线*/
.dash{
  height: 0;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: black 1px dashed;
}
/*title&contain*/
.titleContain{
  height: 180px;
  border-top: rgb(227,227,227) 1px solid;
  padding-top: 20px;

}
.title{
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  border: rgb(187,187,187) solid 1px;
  width: 6%;
  float: left;
  margin-left: 4.5%;
}
.contain{
  height: 100px;
  line-height: 80px;
  padding-left: 10px;
  border: rgb(187,187,187) solid 1px;
  margin-top: 10px;
  width: 6%;
  float: left;
  margin-left: 4.5%;
}
.titleText{
  height: 30px;
  float: right;
  resize: none;
  border: rgb(187,187,187) solid 1px;
  padding-top: 0;
  margin-right: 4.5%;
  width: 82%;
}
.containText{
  height: 100px;
  float: right;
  resize: none;
  border: rgb(187,187,187) solid 1px;
  padding-top: 0;
  margin-top: 10px;
  width: 82%;
  margin-right: 4.5%;
}
#deletebtn{
  border-color: red;
  color: red;
  float: right;
  margin-right: 50px;
}

</style>
