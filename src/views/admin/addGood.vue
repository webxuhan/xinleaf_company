<template>
	<div>
		<head-top></head-top>
	  <el-row class="reg-wrap">
      <el-col :span="12" :offset="6">
        <el-form :model="goodForm" :rules="rules" ref="goodForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品名称：" prop="goods_name">
            <el-input v-model="goodForm.goods_name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品图片：" prop="uploadPicture">
            <el-upload
              action="http://localhost:1225/admin/goodPicture_upload"
              list-type="picture-card"
              enctype="multipart/form-data"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleUploadSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addGood('goodForm')">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
	</div>
</template>
<script>
	import headTop from '../../components/headTop';
	export default {
		components:{
			headTop
		},
		  data() {
      return {
        goodForm: {
          goods_name:'',
          uploadPicture:''
        },
        rules:{},
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      addGood(){

      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
      	console.log('row:',row);
      	console.log('val:',value);
      	console.log(row.tag === value)
        return row.tag === value;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log('false:',file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
     handleUploadSuccess(res, file, fileList){
      console.log("response:",res)
        console.log(res,file,fileList);
      }
    }
	}
</script>