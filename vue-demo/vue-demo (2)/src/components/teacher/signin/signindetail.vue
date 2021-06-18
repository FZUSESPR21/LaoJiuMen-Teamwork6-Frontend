<template>
	<div id="div1">
		<el-card class="box-card">
			<div class="part">
				<el-table
					:data="tableData"
					stripe
					:row-style="{height:'60px'}"
					:cell-style="{padding:'0px'}"
					style="width: 100%;margin-top: -18px;">
			
					<el-table-column  v-for="(item,i) in tablecol"
									  :key="i"
									  :prop="item.prop"
									  :label="item.label"
									  :width="item.width"
									  style="height: 40px;">
					</el-table-column>
				</el-table>	
			</div>
		</el-card>	
	</div>
</template>

<script>
	export default {
	  name: "signindetail",
		
		data() {
		    return {
				showOper:'true',
				//搜索框文字
				qiandaochar:'签到名称',
				qiandaocishu:'第x次签到',
				
				qiandaochar2:'结束时间',
				
				resultname:this.$route.query.resultname,
				Id:this.$route.query.Id,
				
				
				
				
				//搜索框
				input:'',						
				valueyear: '',
				valuemonth: '',
				valueday: '',
				valuehour: '',
				valuemin: '',
				values:'',
				tablecol:[
					{prop:"attendanceId",label:"学号",width:"210px"},
					{prop:"studentId",label:"姓名",width:"320"},
					{prop:"attendedAt",label:"签到时间",width:"320"},
					
					{prop:"signinresult",label:"签到结果",width:"227"},
					
				],
				tableData: [{
				      studentsname:'冠儒',
					  studentsnumber:'221292999',
					  signintime:'1555-5-47  15:65:96',
					  signinresult:'未出勤',
				    }, {
				      studentsname:'王儒',
					  studentsnumber:'221292999',
					  signintime:'1555-5-47  15:65:96',
					  signinresult:'未出勤',
				    },{
				      studentsname:'王冠儒',
					  studentsnumber:'221292999',
					  signintime:'1555-5-47  15:65:96',
					  signinresult:'未出勤',
				    },{
				      studentsname:'王冠儒',
					  studentsnumber:'221292999',
					  signintime:'1555-5-47  15:65:96',
					  signinresult:'未出勤',
				    }]
							
						
							
							
				  }
						
			},
				
		created() {
			this.queryList()
			
		},
		
		methods:{
			
			// queryList(){
			// 	let delOneMessage = {
					
			// 	}
			// 	this.$axios({
			// 			method: 'get',
			// 			headers: {
			// 			  'Content-type': 'application/json;charset=UTF-8'
			// 			},
			// 		   // data: JSON.stringify(delOneMessage),
			// 			url: 'http://1.15.149.222:8080/coursewebsite/attendance/stuList?attendanceId=1'
			// 		  }).then((response) => {          //这里使用了ES6的语法
			// 			console.log(JSON.stringify(response))       //请求成功返回的数据
			// 			console.log(response.data.data.list)
			// 			this.tableData = response.data.data.list
			// 		  }).catch((error) => {
			// 			console.log(error)       //请求失败返回的数据
			// 		  })
			// }
		
			queryList(){
				let info = {
					attendanceId:this.Id
				}
				
				this.$axios({
				        method: 'get',
				        headers: {
				          'Content-type': 'application/json;charset=UTF-8'
				        },
				        data:JSON.stringify(info),
				        url: 'http://1.15.149.222:8080/coursewebsite/attendance/stuList?attendanceId='+this.Id
				      }).then((response) => {          //这里使用了ES6的语法
				        console.log(JSON.stringify(response))       //请求成功返回的数据
				        console.log(response.data.data)
						
				        this.tableData = response.data.data
				      }).catch((error) => {
				        console.log(error)       //请求失败返回的数据
				      })
				},
		
		}
		
		
	
	}
</script>

<style>
#div1{
	width: 2500px;
	margin-left: -500px;
    margin-top: 0px;
    text-align: center;
    background-color: rgba(245, 242, 242, 100);
}
.box-card {
	margin-left: 410px;
    width: 1190px;
	border-radius: 30px;
	
}
.part{
   margin-top: 0px;
   background-color: rgb(228, 228, 228);
   margin-left: 35px;
}
</style>
