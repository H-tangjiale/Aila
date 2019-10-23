<template>
  <div class="left">
    <router-link to="/index/admin" active-class="select" v-if="isAdmin==0">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select" v-if="isAdmin==1">banner管理</router-link>
    <router-link to="/index/hometeach" active-class="select" v-if="isAdmin==1">家教管理</router-link>
    <router-link to="/index/water" active-class="select" v-if="isAdmin==1">水站管理</router-link>
     <router-link to="/index/maintenance" active-class="select" v-if="isAdmin==1">维修管理</router-link>
    <router-link to="/index/housework" active-class="select" v-if="isAdmin==1">家政管理</router-link>
    <router-link to="/index/cpassword" active-class="select" v-if="isAdmin==1">修改密码</router-link>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      isAdmin: sessionStorage.getItem("isAdmin")
    };
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';

.left {
  width: 200px;
  background-color: $left;
}

.left a {
  display: block;
  padding-left: 30px;
  font-size: 20px;
  line-height: 60px;
}

.select {
  background-color: $select;
  color: $color2;
}
</style>