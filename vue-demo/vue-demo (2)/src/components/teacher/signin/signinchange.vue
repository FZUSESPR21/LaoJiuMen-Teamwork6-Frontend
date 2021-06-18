<template>
  <div id="div1">
    
		<div id="div2" >
		
					
			
			<div id="div3" style="display: flex;align-items: center;">
				<span class="text">{{qiandaochar+":"}}</span>
				<span class="text">第{{resultname}}次签到</span>
				
				
				<span class="text" id='jshutime'>{{qiandaochar2+":"}}</span>
				
				<div class="block">
				    <span class="demonstration"></span>
				    <el-date-picker
				      v-model="value1"
				      type="datetime"
				      placeholder="修改时间日期"
				      format="yyyy-MM-dd HH:mm:ss"
				      value-format="yyyy-MM-dd HH:mm:ss">
				    </el-date-picker>
				  </div>
				  
				<el-button @click="publishClick" style="margin-right:15px;" id="realeasebutton">修改</el-button>
			</div>

			

				
		
		</div>	
		
	
		
</div>
</template>

<script>
export default {
  name: "signinchange",
	
	data() {
	    return {
			qiandaochar:'签到名称',
			
			
			qiandaochar2:'修改时间为',
			updateTime:'',
			resultname:this.$route.query.resultname,
			Id:this.$route.query.Id,
			input:'',						
            value1: '',	
			
			
	    }
	  },
		
		
		
		 
		methods:{
		
			publishClick() {
	       let info = {
	        endAt:this.value1,
			
			id:this.Id
	      }
	      this.$axios({
	        method: 'post',
	        headers: {
	          'Content-type': 'application/json;charset=UTF-8'
	        },
	        data: JSON.stringify(info),
	        url: 'http://1.15.149.222:8080/coursewebsite/attendance/updateTime',
	      }).then((response) => {          //这里使用了ES6的语法
	        console.log(JSON.stringify(response))       //请求成功返回的数据
	        // alert(JSON.stringify(response))
			
			if (response.data.code==='200') {
			  alert('修改成功2')
			  this.$router.push({
			    path: '/teacher/signin/signinlist',
			    
			  })
			  this.$router.go(0)
			
			}
	      }).catch((error) => {
	        console.log(error)       //请求失败返回的数据
	      })
	    }
		// publishClick() {
		//       let info = {
		//         endAt:this.value1,
		// 		id:this.Id
		//       }
			  
		//       this.$axios({
		//         method: 'post',
		//         headers: {
		//           'Content-type': 'application/json;charset=UTF-8'
		//         },
		//         data: JSON.stringify(info),
		//         url: 'http://1.15.149.222:8080/coursewebsite/attendance/updateTime',
		//       }).then((response) => {          //这里使用了ES6的语法
		//         console.log(JSON.stringify(response))       //请求成功返回的数据
		//         // alert(JSON.stringify(response))
		// 		alert('修改成功')
				
		// 		this.$router.push({
		// 		  path: '/teacher/signin/signinlist',
				  
		// 		})
		// 		this.$router.go(0)
		//       }).catch((error) => {
		//         console.log(error)       //请求失败返回的数据
		//       })
		//     }
		
		
			
	}
}

</script>

<style scoped>

#div1{
	width: 500px;
	margin-left: 0px;
    margin-top: 0px;
    
    background-color: rgba(245, 242, 242, 100);
}

#div2{
	width: 1080px;
    margin-top: 0px;
	margin-left: -38px;
    background-color: white;
    
	text-align: center;
    
}
#div3{
	
	margin-top: 0;
	display: flex;
	align-items: center;
	height: 48px;
	border: 1px solid #BBBBBB;
}



#jshutime{
	margin-left: 40px;
}
 .text {
    font-size: 16px;
	color: black;
	margin-left: 14px;
  }

  
</style>
