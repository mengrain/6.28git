<template>
	<div class="label">
		<div class="labelleft">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				
				<el-form-item label="品种名称" prop="name" style="width: 300px;">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="放置内容" prop="name" style="width: 300px;">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="使用年限" prop="name" style="width: 300px;">
					<el-time-select v-model="value1" placeholder="填写时间">
					</el-time-select>
				</el-form-item>

				<el-form-item label="尺寸数值" prop="name">
					<el-input v-model="ruleForm.name" style="width: 100px;"></el-input>
					X
					<el-input v-model="ruleForm.name" style="width: 100px;"></el-input>
					X
					<el-input v-model="ruleForm.name" style="width: 100px;"></el-input>
				</el-form-item>

				<el-form-item label="生产日期" prop="name" style="width: 300px;">
					<el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="生产厂商" prop="name" style="width: 300px;">
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="特殊标签" prop="name" style="width: 100%;">
					<el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
						{{tag.name}}
					</el-tag>
				</el-form-item>

				<el-form-item label="标品简要" prop="name" style="width: 500px;">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
					</el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="labelright"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value1: '',
				state3: '',
				textarea: '',
				imageUrl: '',
				input:'',
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',

				},
				rules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					region: [
						{ required: true, message: '请选择活动区域', trigger: 'change' }
					],
					date1: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					date2: [
						{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					type: [
						{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
					],
					resource: [
						{ required: true, message: '请选择活动资源', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写活动形式', trigger: 'blur' }
					]
				},
				tags: [
					{ name: '标签一', type: '' },
					{ name: '标签二', type: 'success' },
					{ name: '标签三', type: 'info' },
					{ name: '标签四', type: 'warning' },
					{ name: '标签五', type: 'danger' }
				]
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
		}
	}
</script>

<style>
	.label {
		width: 95%;
		float: left;
		margin-left: 2.5%;
		margin-top: 15px;
		border: 1px solid #ccc;
	}
	
	.labelleft {
		width: 80%;
		float: left;
		border-right: 1px solid #ccc;
		position: relative;
	}
	
	.labelright {
		width: 20%;
		float: right;
	}
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: absolute;
		overflow: hidden;
		float: right;
		right: 20px;
		top: 20px;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>