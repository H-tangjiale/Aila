<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input :placeholder="form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原始密码">
        <el-input v-model="form.oldpass" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newpass" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="confim" show-password></el-input>
      </el-form-item>
      <el-button type="primary" round @click="update">修改</el-button>
    </el-form>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
    data(){
        return{
            form:{
                name:sessionStorage.getItem('username'),
                oldpass:'',
                newpass:'',
            },
            confim:'',
           
        }
    },
    methods: {
      update(){
        this.axios({
          url:API.changepass,
          method:'post',
          data:this.form,
        }).then(res=>{
          if(res.data.isok){
            this.$message({
            message: res.data.info,
            type: "success",
          });
          this.$router.replace("/login");
          }else{
             this.$message.error( res.data.info);
          }
          
        })
      }
    }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';
</style>