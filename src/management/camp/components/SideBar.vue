<template>
	<scroll-bar>
		<div class="logo">
			<a href="/">
				<img :src="logo">
				<span>营产营具管理系统</span>
			</a>
		</div>
		<div class="search">
			<i class="el-icon-search"></i>搜索 <input type="text" placeholder="搜索文档"/>
		</div>
		<Camp />
		
	</scroll-bar>
</template>

<script>
import ScrollBar from "./ScrollBar";
import Camp from "./../camp.vue";
import { asideMenuConfig } from "@/menuConfig";
import logoImage from "./../logo.png";
const logo = logoImage;
export default {
  components: {
  	ScrollBar,
  	Camp
  },
  name: "SideBar",
  props: {},
  data() {
    return {
      menuList: [],
      logo: logo
    };
  },
  mounted() {
    this.$axios.get("./api/sysResource/user").then(
      response => {
        this.menuList = response.data;
      },
      error => {
        console.info(error);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  background: #eceaec;
  color: rgba(0, 120, 238, 0.89);
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  img {
    width: 35px;
    vertical-align: middle;
    margin-bottom: 5px;
    margin-right: 5px;
  }
}
.search{
	width: 100%;
	height: 50px;
	background-color: #444B51;
	line-height: 50px;
	text-align: center;
	font-size: 14px;
	color: #FADB58;
	i{
		margin-right: 10px;
	}
	input{
		width: 50%;
		border-radius: 5px;
		outline: none;
		margin-left: 10%;
	}
}
.site-name {
  margin-left: 10px;
}
.sidebar-container {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.28s;
  width: 256px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  a {
    display: inline-block;
    width: 100%;
  }
  .el-menu {
    padding-top: 16px;
    width: 100% !important;
    border: none;
  }
  .el-submenu .el-menu-item {
    min-width: 256px !important;
    padding-left: 48px !important;
    background-color: #71767e !important;
    &:hover {
      color: #fff !important;
    }
  }
  .el-menu-item,
  .el-submenu {
    .el-menu-item {
      &.is-active {
        background-color: #63676e !important;
        color: #fff !important;
      }
    }
    .el-submenu__title {
      i {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.65);
      }
    }
    &.is-active {
      .el-submenu__title {
        color: #e6a23c;
        span {
          color: #e6a23c;
        }
        i {
          font-size: 16px;
          color: #e6a23c;
        }
      }
    }
  }
}
</style>
