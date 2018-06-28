<template>
  <div class="user-login">
    <div class="user-login-bg" :style="{'background-image':`url(${backgroundImage})`}"></div>
    <div class="content-wrapper">
      <h2 class="slogan">
        欢迎使用 <br /> ICE 内容管理系统
      </h2>
      <div class="form-container">
        <h4 class="form-title">登录</h4>
        <el-form ref="form" :model="user" label-width="0">
          <div class="form-items">
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="username" :rules="[ { required: true, message: '会员名/邮箱/手机号不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-edit-outline input-icon"></i>
                    <el-input placeholder="会员名/邮箱/手机号" v-model="user.username"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-item">
              <el-col>
                <el-form-item prop="password" :rules="[ { required: true, message: '密码不能为空'}]">
                  <div class="form-line">
                    <i class="el-icon-service input-icon"></i>
                    <el-input type="password" placeholder="密码" v-model="user.password"></el-input>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--<el-row class=form-item>-->
              <!--<el-col>-->
                <!--<el-form-item>-->
                  <!--<el-checkbox class="checkbox">记住账号</el-checkbox>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
            <el-row class="form-item">
              <el-button type="primary" class="submit-btn" size="small" @click="submitBtn">
                登 录
              </el-button>
            </el-row>
          </div>
          <!--<el-row class="tips">-->
            <!--<a href="/" class="link">-->
              <!--立即注册-->
            <!--</a>-->
            <!--<span class="line">|</span>-->
            <!--<a href="/" class="link">-->
              <!--忘记密码-->
            <!--</a>-->
          <!--</el-row>-->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import {RSAKey, hex2b64} from '../../../../utils/security'
const backgroundImage =
  'https://img.alicdn.com/tfs/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png';
export default {
  components: { BasicContainer },
  name: 'UserLogin',

  data() {
    return {
      backgroundImage: backgroundImage,
      user: {
        username: '',
        password: '',
      },
    };
  },

  created() {},

  methods: {
    submitBtn() {
      let _this = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$axios.get('./api/security/getkey').then(resp => {
            let res = resp.data;
            const rsa = new RSAKey();
            rsa.setPublic(res.n, res.e);

            const user = {
              username: this.user.username,
              password: hex2b64(rsa.encrypt(this.user.password)),
              serial: res.serial
            };
            this.$axios.post('./api/security/login', user).then(resp1 => {
              let res1 = resp1.data;
              localStorage.setItem('token', res1.token);
              localStorage.setItem('userId', res1.userId);
//              this.$message({
//                message: '登录成功',
//                type: 'success',
//              });
              if(this.$route.query.redirect)
                this.$router.push(this.$route.query.redirect);
              else
                this.$router.push('/');
            }, err => {
              console.log(err);
              this.msgs = [{severity: 'error', detail: err.error.text}];
            });
          });

        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './UserLogin.scss';
</style>
