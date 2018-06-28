<template>
  <section class="app-main">
	<transition name="fade" mode="out-in">
	  <!-- <router-view :key="key"></router-view> -->
	   
	  
	  <router-view></router-view>
	</transition>  
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppMain",
  components: {
		},
  data(){
  	return {
  		arr:[]
  	}
  },
  computed: mapState(["navList"]),
  
};
</script>

<style lang="scss" scoped>
.app-main {
  /*flex: 1 1 0;*/
  background-color: white;
  min-height: calc(100vh - 75px);
  padding-left: 10px;
  padding-top: 10px;
}
.wholedata{
	width: 100%;
	background-color: gold;
	line-height: 100%;
	font-size: 14px;
}
</style>
