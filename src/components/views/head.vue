<template>
  <div>
    <h3>账号：{{username}}</h3>
    <el-button type="danger" plain @click="exit">退出登录</el-button>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      username: sessionStorage.getItem("username")
    };
  },
  methods: {
    exit() {
      this.axios({
        url: API.exit
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          sessionStorage.setItem('username','')
          this.$router.replace("/login");
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

div {
  height: 80px;
  background-color: $head;
  color: $color2;
  line-height: 80px;
  font-size: 20px;
  text-align: right;
}

h3 {
  display: inline-block;
  font-size: 25px;
}

button {
  margin: 0 30px;
}
</style>