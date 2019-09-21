<template>
  <el-row type="flex" align="middle" class="layout-header" justify="space-between">
    <el-col :span="10">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智博客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img class="head-img" :src="userInfo.photo" alt="" />
    <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
        </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer${token}` }
      }).then(result => {
        debugger
        this.userInfo = result.data.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header{
    height: 50px;
    .el-icon-s-unfold{
        font-size: 22px;
    }
    .title{
        vertical-align: top;
        margin-left: 4px;
    }
    .head-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 4px;
    }
}
</style>
