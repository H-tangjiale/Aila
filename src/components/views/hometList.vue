<template>
  <div>
    
    <el-table :data="data" height="350" border style="width: 80%;margin:20px auto">
      <el-table-column type="index" label="序号" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img v-if="data.length>0" :src="scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述" v-if="arr.indexOf('des')!=-1">
        <template slot-scope="scope">
          <span v-if="data.length>0">{{scope.row.des}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" v-if="arr.indexOf('type')!=-1">
        <template slot-scope="scope">
          <span v-if="data.length>0">{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="num" label="报名人数" v-if="arr.indexOf('num')!=-1">
        <template slot-scope="scope">
          <span v-if="data.length>0">{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="授课机构" width="180" v-if="arr.indexOf('teacherImg')!=-1">
        <template slot-scope="scope">
          <img v-if="data.length>0" :src="scope.row.teacherImg" alt />
        </template>
      </el-table-column>
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
export default {
  props: ["data", "arr"],
  
  methods: {
    del(id) {
      console.log(1);

      var url = API.delhometeach;
      if (this.data[0].des) {
        url = API.delhometeach;
      }
      if (this.data[0].type) {
        url = API.delhometype;
      }
      if (this.data[0].num) {
        url = API.deltop;
      }
      this.axios({
        url,
        method: "get",
        params: {
          id
        }
      })
        .then(res => {
          if (res.data.isok) {
            this.$message({
              type: "success",
              message: res.data.info
            });
          }
        })
        .catch(err => {
          this.$message.error(res.data.info);
        });
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';
</style>