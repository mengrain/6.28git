<template>
	<div class="map">

		<el-menu :default-active="activeIndex2" id="zys" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-submenu index="1" v-for="(item,index) in arrList" v-if="index==0">
				<template slot="title">
					<span @click="shows(item)"> {{item.name}}</span>
				</template>
				<el-submenu index="2" v-for="(itm,index) in XGarr">
					<template slot="title">
						<span @click="navigation(itm)">{{itm.name}}</span>
					</template>
					<el-menu-item index="1-1-1" v-for="(i,index) in XGarrId">
						<router-link to="/camp">
							{{i.name}}
						</router-link>
					</el-menu-item>
				</el-submenu>
			</el-submenu>

			<el-submenu index="3" v-for="(item,index) in arrList" v-if="index==1">
				<template slot="title">
					<span @click="shows(item)"> {{item.name}}</span>
				</template>
				<el-submenu index="4" v-for="(itm,index) in SZarr">
					<template slot="title">
						<span @click="navigation(itm)">{{itm.name}}</span>
					</template>
					<el-menu-item index="2-4-1" v-for="(i,index) in XGarrId">
						<router-link to="/camp">
							{{i.name}}
						</router-link>
					</el-menu-item>
				</el-submenu>
			</el-submenu>

			<el-submenu index="4" v-for="(item,index) in arrList" v-if="index==2">
				<template slot="title">
					<span @click="shows(item)"> {{item.name}}</span>
				</template>
				<el-submenu index="5" v-for="(itm,index) in GZarr">
					<template slot="title">
						<span @click="navigation(itm)">{{itm.name}}</span>
					</template>
					<el-menu-item index="2-4-1" v-for="(i,index) in XGarrId">
						<router-link to="/camp">
							{{i.name}}
						</router-link>
					</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-submenu index="6" v-for="(item,index) in arrList" v-if="index==3">
				<template slot="title">
					<span @click="shows(item)"> {{item.name}}</span>
				</template>
				<el-submenu index="7" v-for="(itm,index) in DZarr">
					<template slot="title">
						<span @click="navigation(itm)">{{itm.name}}</span>
					</template>
					<el-menu-item index="2-4-1" v-for="(i,index) in XGarrId">
						<router-link to="/camp">
							{{i.name}}
						</router-link>
					</el-menu-item>
				</el-submenu>
			</el-submenu>
		</el-menu>

		<div id="container">
			<MakeWeekPlan />
			<div class="sidebarbtn" @click="sidebarBtn">
				<i class="el-icon-caret-left"></i>
			</div>
			<div class="sidebar" v-show="isShow">
				<div class="sidebarCon">
					<p>列表名称 <span @click="sidebarBtn"><<</span> </p>
					<div class="sidebarCon-text">
						<li>内容1</li>
						<li>内容2</li>
					</div>
					<div class="sidebarCon-text">
						<li>内容1</li>
						<li>内容2</li>
					</div>
					<p>
						<i class="el-icon-printer"></i> 打印
					</p>
					<ul class="ul">
						<li>功能导览</li>
						<li>功能导览</li>
						<li>功能导览</li>
						<li>功能导览</li>
						<li>功能导览</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import MakeWeekPlan from "./MakeWeekPlan.vue"
	export default {
		components: {
			MakeWeekPlan
		},
		data() {
			return {
				//				activeIndex: '1',
				activeIndex2: '1',
				isShow: false,
				arr: [],
				XGarr: [],
				XGarrId: [],
				SZarr: [],
				SZarrId: [],
				GZarr: [],
				DZarr: [],
				arrList: [],
				pid: '', //每次点击导航给此赋值
				arrList2: [], //二级
				arrList3: [], //三级
				FloorId: [],
			}
		},
		mounted(item, index) {
			//全部数据
			this.$axios.get("api/location/child?pId=root").then(
				response => {
					var arr = response.data;
					for(item of arr) {
						//						console.log(item,'222')
						this.arrList.push({
							id: item.id,
							name: item.name
						})
					}
					console.log(this.arrList, '333')
					console.log(response.data)
				},
				error => {
					console.info(error);
				}
			);
		},

		methods: {
			//点击导航
			shows: function(row) {
				this.pid = row.id;
				this.name = row.name;

				this.$axios.get("api/location/child?pId=" + this.pid).then(
					response => {
						if(this.name == "香港") {
							this.XGarr = response.data;
							console.log(1);
							console.log(this.XGarr)
						} else if(this.name == "深圳") {
							this.SZarr = response.data;
							console.log(2)
							console.log(this.SZarr)
						} else if(this.name == "广州") {
							this.GZarr = response.data;
							console.log(3)
							console.log(this.GZarr)
						} else if(this.name == "东莞") {
							this.DZarr = response.data;
							console.log(4)
							console.log(this.DZarr)
						}
					},
					error => {
						console.info(error);
					}
				);

			},
			navigation: function(roww) {
				var XGarrId=[];
				this.pid = roww.id;
				this.name = roww.name;
				this.$axios.get("api/location/child?pId=" + this.pid).then(
					response => {
						if(this.pid==roww.id){
							this.XGarrId = response.data;
						console.log(this.XGarrId, "111")
						}
						
					},
					error => {
						console.info(error);
					}
				);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			sidebarBtn() {
				this.isShow = !this.isShow;
				this.$axios.get("api/location/city-region?pId=root").then(
					response => {
						console.log(response.data, "2222")
					}
				)
			},
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	#container {
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	
	.sidebarbtn {
		width: 30px;
		height: 80px;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 80px;
		position: absolute;
		right: 0;
		top: 20px;
		z-index: 11;
	}
	
	.sidebar {
		width: 200px;
		height: 500px;
		background-color: #FFFFFF;
		position: absolute;
		top: 20px;
		right: 0;
		z-index: 12;
	}
	
	.sidebarCon {
		font-size: 12px;
		p {
			border-bottom: 1px solid #ccc;
			padding: 15px;
			span {
				float: right;
				font-size: 14px;
			}
		}
	}
	
	.sidebarCon-text {
		padding: 15px;
		border-bottom: 1px solid #ccc;
		li {
			list-style: none;
			line-height: 30px;
		}
	}
	
	ul {
		padding-left: 15px;
		li {
			list-style: none;
			line-height: 30px;
		}
	}
	
	#zys:hover {
		border: none;
	}
</style>