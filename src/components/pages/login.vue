<template>
  <div class="mark">
    <div class="cbox text-c">
      <h3>登录</h3>
      <!-- <select name id v-model="user.type">
        <option value disabled>--请选择--</option>
        <option value="0">超级管理员</option>
        <option value="1">普通管理员</option>
        <option value="2">用户</option>
      </select>-->
      <el-select v-model="user.type" placeholder="请选择角色">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="user.name" placeholder="请输入账号"></el-input>
      <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>

      <el-button type="warning" plain @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    login() {
      // console.log(this.user);

      this.axios({
        url: API.login,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          sessionStorage.setItem('isAdmin',res.data.type)
          this.$message({
            message: res.data.info,
            type: "success"
          });
          sessionStorage.setItem('username',this.user.name)
          this.$router.push("/index");
        } else {
          this.$message.error(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';

// .mark >>>.el-input__inner {
// width: 80%;
// margin 5px auto
// }
.el-select, .el-input {
  width: 80%;
  margin: 5px auto;
}

.el-button--warning {
  display: block;
  color: $color4;
  margin: 10px auto 0;
}
</style>