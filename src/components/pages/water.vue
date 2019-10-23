<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="水站" name="first">
        <el-button type="primary" round @click="uadd">添加</el-button>
        <el-dialog
          title="添加水站"
          v-if="activeName=='first'"
          :visible.sync="dialogFormVisible"
          @close="close()"
        >
          <el-form :model="wateruse">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="wateruse.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="评分" :label-width="formLabelWidth">
              <el-input v-model="wateruse.score" autocomplete="off" type="number" max="5" min="0"></el-input>
            </el-form-item>
            <el-form-item label="月销售量" :label-width="formLabelWidth">
              <el-input v-model="wateruse.count" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="点赞量" :label-width="formLabelWidth">
              <el-input v-model="wateruse.likeNum" autocomplete="off" type="number"></el-input>
            </el-form-item>
            <el-form-item label="浏览量" :label-width="formLabelWidth">
              <el-input v-model="wateruse.readNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商家地址" :label-width="formLabelWidth">
              <el-input v-model="wateruse.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="距离" :label-width="formLabelWidth">
              <el-input v-model="wateruse.len" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商家信息" :label-width="formLabelWidth">
              <el-input v-model="wateruse.des" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="wateruse.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="wateruse.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="wateruse.img" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add()" v-if="id==0">确 定</el-button>
            <el-button type="primary" @click="update()" v-else>修 改</el-button>
          </div>
        </el-dialog>
        <el-table :data="data" height="350" border style="width: 80%;margin:20px auto">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="水站名称" width="180"></el-table-column>
          <el-table-column prop="tel" label="电话" width="180"></el-table-column>
          <el-table-column prop="price" label="价格" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="wud(scope.row.id)"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click.native.prevent="wdel(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="水站评论" name="second">
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option v-for="item in data" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-table :data="meg" height="350" border style="width: 80%;margin:20px auto">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column prop="name" label="用户名称" width="180"></el-table-column>
          <el-table-column prop="content" label="评论内容" width="180"></el-table-column>
          <el-table-column prop="time" label="时间" width="180"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click.native.prevent="delcomm(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import API from "../../common/js/API";
export default {
  data() {
    return {
      activeName: "first",
      data: [],
      meg: [],

      dialogFormVisible: false,
      formLabelWidth: "120px",
      wateruse: {
        img: "",
        name: "",
        score: "",
        count: "",
        likeNum: "",
        readNum: "",
        address: "",
        len: "",
        des: "",
        tel: "",
        price: ""
      },
      id: 0,
      value: ""
    };
  },
  methods: {
    first() {
      this.axios({
        url: API.findwater
      }).then(res => {
        this.data = res.data.data;
      });
    },
    second(params) {
      this.axios({
        url: API.fwatercomm,
        params: params
      }).then(res => {
        this.meg = res.data.data;
      });
    },
    del(id, url) {
      this.axios({
        url,
        method: "get",
        params: {
          id
        }
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            type: "success",
            message: res.data.info
          });
        }
      });
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.first();
          break;
        case "second":
          this.second({});
          break;
        default:
          break;
      }
    },
    wdel(id) {
      this.del(id, API.delwater);
      this.first();
    },
    delcomm(id) {
      this.del(id, API.delcomm);
      this.second();
    },
    uadd() {
      this.id = 0;
      this.dialogFormVisible = true;
    },
    add() {
      this.axios({
        url: API.addwater,
        params: this.wateruse
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.first();
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    wud(id) {
      this.id = id;
      this.dialogFormVisible = true;
      this.axios({
        url: API.findwater,
        params: {
          id: this.id
        }
      }).then(res => {
        this.wateruse = res.data.data[0];
      });
    },
    update() {
      this.axios({
        url: API.updatewater,
        params: this.wateruse
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.dialogFormVisible = false;
          this.first();
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    close() {
      this.wateruse = {};
    }
  },
  mounted() {
    this.first();
  },
  watch: {
    value() {
      this.second({
        waterId: this.value
      });
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';
</style>