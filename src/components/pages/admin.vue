<template>
  <div>
    <add-manage ref="add" @getInit="init()"></add-manage>
    <el-table :data="tableData" height="350" border style="width: 80%;margin:20px auto">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="账号" width="180"></el-table-column>
      <el-table-column prop="des" label="属性"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="ud(scope.row.id)"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click.native.prevent="del(scope.row.id, tableData)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import API from "../../common/js/API";
import addManage from "../views/addManage";
export default {
  components: {
    addManage
  },
  data() {
    return {
      tableData: [],
      isShow: false,
      id: 0,
      dialogFormVisible: false
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {    
      this.axios({
        url: API.findadmin,
        method: "post"
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    del(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id);
          this.axios({
            url: API.deladmin,
            method: "post",
            data: {
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
            message: "已取消删除",
          });
        });
    },
    ud(id) {
      this.id = id;
      this.$refs.add.find(this.id);
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';

.el-date-editor {
  width: 80%;
}

.el-input {
  width: 80%;
}
</style>