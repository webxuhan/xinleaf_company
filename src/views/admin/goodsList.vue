<template>
	<div>
		<head-top></head-top>
		<el-select v-model="form.a" placeholder="请选择">
    <el-option v-for="item in form.options" :key="item.a" :label="item.label" :value="item.a">
    </el-option>
  </el-select>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default {
		data() {
	      return {
	        form:{
	        	options: [{
		          a: '选项1',
		          label: '黄金糕'
		        }, {
		          a: '选项2',
		          label: '双皮奶'
		        }, {
		          a: '选项3',
		          label: '蚵仔煎'
		        }, {
		          a: '选项4',
		          label: '龙须面'
		        }, {
		          a: '选项5',
		          label: '北京烤鸭'
		        }],
		        a: ''
		      }
	        }
	    },
		components:{
			headTop
		}
	}
</script>