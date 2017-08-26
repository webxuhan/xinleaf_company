<template>
	<div>
		<head-top></head-top>
		<div :data='tableData' v-for='(val,key,index) in tableData'>
			<p>	val: {{val}} </p>
			<p>{{val.register_time}}</p>
			<p>key : {{key}}</p>
		</div>
		<el-row class="reg-wrap">
			<el-table :data="tableData" v-for='(val,key,index) in tableData'  border :span="12" >
			    <el-table-column prop="val.register_time" label="日期" sortable width="180"></el-table-column>
			    <el-table-column prop="val.userName" label="员工姓名" width="180"></el-table-column>
			    <el-table-column prop="val.phoneNum" label="手机号码" :formatter="formatter"></el-table-column> 
			    <el-table-column prop="val.email" label="邮箱" :formatter="formatter"></el-table-column> 
			    <el-table-column prop="val.role" label="员工角色" width="100" 
			     :filters="[{ text: '管理人员', value: '管理人员' }, { text: '普通人员', value: '普通人员' }]"
			      :filter-method="filterTag" filter-placement="bottom-end">
			      <template scope="scope">
			        <el-tag :type="scope.row.tag === '管理人员' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
		  		 </template>
		   		</el-table-column>
		   		<el-table-column label="操作">
			      <template scope="scope">
			        <el-button
			          size="small"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="small"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</el-row>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default{
		mounted(){
			this.$http.post('http://localhost:1225/admin/getStaffList').then((res) =>{
				console.log(res.data.data);
				this.tableData = res.data.data;
				console.log(typeof this.tableData);
				// [
				// 	this.tableData.data,
				// 	this.tableData.name,
				// 	this.tableData.phoneNum,
				// 	this.tableData.email,
				// 	this.tableData.role
				// ] = [
				// 	res.data.data.register_time,
				// 	res.data.data.userName,
				// 	res.data.data.phoneNum,
				// 	res.data.data.email,
				// 	res.data.data.role,
				// ];
				console.log('tableData:',this.tableData);
			})
		},
		data() {
			return {
				tableData : [{
					register_time: '',
					userName: '',
					phoneNum:'',
					email:'',
					role:''
				}]
				// tableData: [{
				// date: '2016-05-02',
				// name: '王小虎',
				// phoneNum: '上海市普陀区金沙江路 1518 弄',
				// email:'24546',
				// tag: '管理人员'
				// }, {
				// date: '2016-05-04',
				// name: '王小虎',
				// address: '上海市普陀区金沙江路 1517 弄',
				// tag: '普通人员'
				// }, {
				// date: '2016-05-01',
				// name: '王小虎',
				// address: '上海市普陀区金沙江路 1519 弄',
				// tag: '管理人员'
				// }, {
				// date: '2016-05-03',
				// name: '王小虎',
				// address: '上海市普陀区金沙江路 1516 弄',
				// tag: '普通人员'
				// }]
			}
		},
		methods: {
			formatter(row, column) {
			return row.address;
			},
			filterTag(value, row) {
			return row.tag === value;
			},
			handleEdit(index, row) {
			console.log(index, row);
			},
			handleDelete(index, row) {
			console.log(index, row);
			}
		},
		components:{
			headTop
		}
	}
</script>
<style>
.reg-wrap{
	padding:10px 0;
}
</style>