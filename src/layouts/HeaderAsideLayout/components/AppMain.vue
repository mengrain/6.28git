<template>
  <section class="app-main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{routeName}}</el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  name: 'AppMain',
  computed: mapState([
    'routeName'
  ]),
};
</script>

<style lang="scss" scoped>
  .app-main{
    /*flex: 1 1 0;*/
    background-color: white;
    min-height: calc(100vh - 75px);
    padding-left: 10px;
    padding-top: 10px;
  }
  .el-breadcrumb{
    padding: 10px;
  }
</style>
