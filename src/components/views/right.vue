<template>
  <div class="right text-c" >
    <h3>{{$route.name}}</h3>
    <router-view></router-view>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';

.right {
  flex: 1;
}
.right h3{
    font-size 30px
    line-height 50px
    color $h3
}
</style>