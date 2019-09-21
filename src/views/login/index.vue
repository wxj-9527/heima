<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:10px">
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
                  <el-button style="float:right">发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button @click="login" type="primary" style="width:100%" >登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
    //   if (value) {
    //     callBkack()
    //   } else {
    //     callBkack(new Error('请在阅读后勾选确认'))
    //   }
      value ? callBack() : callBack(new Error('请在阅读后勾选确认'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入您的手机号码' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号码' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码不正确' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.login {
    background-image: url('../../assets/img/005.jpg');
    // width: 100%;
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 440px;
        height: 340px;
        .title{
            text-align: center;
            img{
                height: 45px;
            }
        }
    }
}
</style>
