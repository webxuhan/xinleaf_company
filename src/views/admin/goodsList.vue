<template>
	<div>
		<head-top></head-top>
		<el-upload
		  action="http://localhost:1225/admin/goodPicture_upload"
		  list-type="picture-card"
		  :on-preview="handlePictureCardPreview"
		  :on-remove="handleRemove">
		  <i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog v-model="dialogVisible" size="tiny">
		  <img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default {
		data() {
	      return {
	        dialogImageUrl: '',
    		dialogVisible: false
	        }
	    },
	    methods: {
	      handleRemove(file, fileList) {
	        console.log(file, fileList);
	      },
	      handlePictureCardPreview(file) {
	      	console.log('false:',file)
	        this.dialogImageUrl = file.url;
	        this.dialogVisible = true;
	      }
	    },
		components:{
			headTop
		}
	}
</script>