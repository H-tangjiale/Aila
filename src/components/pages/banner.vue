<template>
  <div>
    <addBanner @getInit="addbanner"></addBanner>
    <el-table :data="data" height="350" border style="width: 80%;margin:20px auto">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" @click.native.prevent="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../../common/js/API";
import addBanner from "../views/addbanner";
export default {
  data() {
    return {
      data: [],
      infor:{},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.axios({
        url: API.getbanner,
        method: "get"
      }).then(res => {
        this.data = res.data.data;
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(id);
          this.axios({
            url: API.delbanner,
            method: "get",
            params: {
              id
            }
          }).then(res => {
            this.$message({
              type: "success",
              message: res.data.info
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addbanner(e) {
      this.axios({
        url: API.addbanner,
        method: "get",
        params:e
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.init();
        } else {
          this.$message.error(res.data.info);
        }
      });
    }
  },
  components: {
    addBanner
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';


</style>