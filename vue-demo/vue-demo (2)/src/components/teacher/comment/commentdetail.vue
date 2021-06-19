<template>
  <div>
    <div class="part">
      <!--      讨论列表-->
      <ul id="app">
        <li id="topic">
          <div class="comment-item">
            <div class="comment-title">
              {{title}}
            </div>
            <div class="comment-contains">
              {{content}}
            </div>
            <div class="comment-info">
              <span class="comment-name">{{name}}</span>
              <span>发布于</span>
              <span class="comment-time">{{released_at}}</span>
            </div>
          </div>
        </li>
        <li v-for="item in commentList">
          <div class="comment-item">
            <div class="comment-title">

            </div>
            <div class="comment-contains">
              {{item.content}}
            </div>
            <div class="comment-info">
              <span class="comment-name">{{item.name}}</span>
              <span>发布于</span>
              <span class="comment-time">{{item.releasedAt}}</span>
              <el-button class="deleteBtn" @click="deleteComment(item.id)">删除</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--    虚线-->
    <div class="dash">

    </div>
    <div class="commentBottom">
      <div class="comment-left">
        评论：
      </div>
      <textarea  placeholder="输入评论" class="comment-text" ref="commentValue">

      </textarea>
      <el-button type="submit" class="submitBtn" @click="addComment">
        发表评论
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "commentdetail",
  data(){
    return{
      commentList:[],
      topicID:'',
      comment:'',
      item:{},
      title:'',
      name:'',
      content:'',
      released_at:''
    }
  },
  created() {
    this.topicID=this.$route.query.detailID
    // this.item=this.$route.query.topic
    this.title=this.$route.query.title
    this.name=this.$route.query.name
    this.content=this.$route.query.content
    this.released_at=this.$route.query.released_at
    this.getCommentInfo();
  },
  methods:{
    getCommentInfo:function (){
      let id = this.topicID
      this.$axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        url: 'http://1.15.149.222:8080/coursewebsite/comment/all?topicId='+id,
      }).then((response) => {          //这里使用了ES6的语法
        // console.log(JSON.stringify(response))
        console.log("6666666666666666")
        // console.log(this.topicID)//请求成功返回的数据
        console.log(response)
        this.commentList = response.data.data.list
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    deleteComment:function (e){
      let info = {
        id: e
      }
      this.$axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(info),
        url: 'http://1.15.149.222:8080/coursewebsite/comment/delete',
      }).then((response) => {
        // console.log(6666666666666666)
        console.log(e)
        this.getCommentInfo();
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    addComment:function (){
      this.comment=this.$refs.commentValue.value
      if(this.comment=='')
        alert("请输入评论！")
      else {
        this.$axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json;charset=UTF-8'
          },
          url: 'http://1.15.149.222:8080/coursewebsite/comment/add',
          data: {
            account: localStorage.getItem('account'),
            topicId: this.topicID,
            content: this.comment
          }
        }).then((response) =>{
          console.log(response.data)
          this.$refs.commentValue.value=''
          this.getCommentInfo()
          this.$router.go(0)
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })

      }
    }
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
#topic{
  border: #0e4d74 2px solid;
  border-radius: 12px;
  margin-top: 50px;
  width: 94%;
  margin-left: 3%;
  padding-top: 20px;
  margin-bottom: 80px;
}
.part{
  margin-top: 7px;
  background: rgb(255,255,255);
  border: rgb(186,186,186) solid 1px;
  box-shadow: 5px 5px 10px #b6b4b4 ;
  margin-bottom: 10px;
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
  margin-top: 5px;
}
#search{
  margin-top: auto;
}

#search{
  height: 25px;
  border-radius: 5px;
  padding-left: 5px;
  width: 700px;
  text-align: center;
  border: none;
  margin-left: 4%;
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
.deleteBtn{
  margin-bottom: 2px;
  float: right;
  color: red;
  border: red 1px solid;
  height: 5px;
  margin-right: 10px;
  line-height: 5px;
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

</style>
