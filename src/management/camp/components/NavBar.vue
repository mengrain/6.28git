<template>
	<div class="navMain">
		<div class="navtop">
			<!--头部面包屑-->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>
					<a href="/">活动管理</a>
				</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>

			<div class="menu-icons">
				<span class="menu-icon"><i class="el-icon-message icon"></i></span>
				<div class="user-profile-body">
					<img class="user-avatar" src="https://img.alicdn.com/tfs/TB1ONhloamWBuNjy1XaXXXCbXXa-200-200.png">
					<span class="user-name">{{userInfo ? userInfo.realName:''}}</span>
				</div>
			</div>
		</div>
		<!--头部效果-->
		<div class="effect">
			<span><el-button type="primary" icon="el-icon-search">搜索</el-button></span>
			<span class="input"><el-input v-model="input" placeholder="搜索文档"></el-input></span>
			<span><el-button type="primary" icon="el-icon-search">待加</el-button></span>
			<span><el-button type="primary" icon="el-icon-search">待加</el-button></span>
			<el-button-group>
				<el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
				<el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			</el-button-group>
			<!--添加-->
			<span><el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button></span>
			<!--删除-->
			<span><el-button type="primary" icon="el-icon-delete"></el-button></span>
			<span><el-button  type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button></span>
		</div>
		<!--添加-->
		<el-dialog title="添加" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="新建楼宇" :label-width="formLabelWidth">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新建楼层" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="新建房间" :label-width="formLabelWidth">
					<el-input v-model="input" placeholder="填写房间号"></el-input>
					-
					<el-select v-model="form.region" placeholder="选择房间类别">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类别属性" :label-width="formLabelWidth">
					<el-radio-group v-model="form.resource">
						<el-radio label="线上品牌商赞助"></el-radio>
						<el-radio label="线下场地免费"></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogFormVisible = false">立即创建</el-button>
				<el-button @click="dialogFormVisible = false">取 消</el-button>

			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "NavBar",
		computed: mapState(["userInfo", "navList"]),
		data() {
			return {
				input: '',
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',
				
			}

		},
		methods: {
			logout() {
				this.$axios.get("/api/security/logout").then(res => {
					localStorage.removeItem("token");
					localStorage.removeItem("userId");
					this.$router.push("/login");
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.navMain {
		width: 100%;
		height: 64px;
		border-bottom: 1px solid #ccc;
		line-height: 64px;
		span {
			margin-left: 20px;
		}
	}
	
	.user-profile-body {
		float: right;
		margin-right: 30px;
	}
	
	.user-avatar {
		float: left;
		width: 24px;
		height: 24px;
		margin: 18px 0 0 5px;
	}
	
	.user-name {
		color: rgba(0, 0, 0, .65);
	}
	
	.navbar {
		height: 64px;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		.user-profile-container {
			position: absolute;
			right: 20px;
			cursor: pointer;
			.user-profile-content {
				display: flex;
				padding: 20px 0;
			}
			.menu-icons {
				display: flex;
				top: 0;
				align-items: center;
				.menu-icon {
					padding: 0 12px;
					.icon {
						display: inline-block;
						font-size: 18px;
						text-align: center;
					}
				}
			}
			.user-department {
				font-size: 12px;
				color: rgba(102, 102, 102, 0.65);
			}
			.el-icon-caret-bottom {
				position: absolute;
				right: 0;
				top: 13px;
				font-size: 12px;
			}
		}
	}
	
	.el-breadcrumb {
		line-height: 64px;
		height: 100%;
		float: left;
		padding-left: 50px;
	}
	
	.effect {
		float: left;
		width: 100%;
		height: 60px;
		background-color: #F3F5F6;
		line-height: 60px;
	}
	
	.el-input {
		width: 200px;
		height: 35px;
		line-height: 35px;
	}
	
	.el-button-group {
		margin-left: 20px;
	}
	
	.el-button {
		margin-left: 15px;
		padding: 8px 15px;
	}
</style>