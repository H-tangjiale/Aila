<template>
  <div>
    <el-button type="primary" round @click="addopen">添加</el-button>
    <el-dialog title="添加|修改管理员信息" :visible.sync="dialogFormVisible" @close="close()">
      <el-form :model="user">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="user.name" autocomplete="off" :disabled="isFind"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" v-if="!isFind">
          <el-input placeholder="请输入密码" v-model="confim" show-password></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="user.des" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="!isFind">确 定</el-button>
        <el-button type="primary" @click="update" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  props: ["id"],
  data() {
    return {
      user: {
        name: "",
        pass: "",
        time: "",
        des: ""
      },
      confim: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      isFind: false
    };
  },
  methods: {
    update() {
      this.axios({
        url: API.updateadmin,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.dialogFormVisible = false;

          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.$emit("getInit");
          this.user = {};
        }
      });
    },
    find(id) {
      this.dialogFormVisible = true;
      this.isFind = true;
      this.axios({
        url: API.findadmin,
        method: "post",
        data: {
          id: id
        }
      }).then(res => {
        this.user = res.data.data[0];
        
      });
    },

    add() {
      this.isFind = false;
      this.user.time=this.user.time.getTime()
      this.axios({
        url: API.addadmin,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$emit("getInit");
          this.user = {
            name: "",
            pass: "",
            time: "",
            des: ""
          };
          this.confim=""
          // console.log(this.$store.state.user);
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    close() {
      this.$store.dispatch("adminmation", this.user);
      this.dialogFormVisible = false;
      this.user = {};
      this.isFind = false;
    },
    addopen() {
      this.dialogFormVisible = true;
      // console.log(this.$store.state.user);

      this.user = this.$store.state.user;
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';
</style>