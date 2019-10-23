<template>
  <div>
    <el-button type="primary" round @click="dialogFormVisible=true">添加</el-button>
    <el-dialog title="添加banner图" :visible.sync="dialogFormVisible">
      <el-form :model="data">
        <el-form-item label="图片地址" :label-width="formLabelWidth">
          <el-input v-model="data.img" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="data.des" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      data: {
        img: "",
        des: ""
      }
    };
  },
  methods: {
    add() {
   this.$emit("getInit" ,this.data);
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';
</style>