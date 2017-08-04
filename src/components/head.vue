<template>
<div id="head">
	<el-row>
		<el-col :span="12">
			<div class="logo"></div>
		</el-col>
		<el-col :span="12">
			<div class="phone">
				<div class="p-top"></div>
				<div class="p-bottom">
					<el-input placeholder="请输入内容" icon="search" v-model="search" :on-icon-click="handleIconClick"></el-input>
				</div>
			</div>
		</el-col>
	</el-row>
</div>	
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    handleIconClick(ev) {
      console.log(this.search);
    }
  }
}
</script>
<style>
	
</style>
