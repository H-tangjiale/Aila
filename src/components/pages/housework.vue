<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家政banner" name="first">
        <el-button type="primary" round @click="dialogFormVisible=true">添加</el-button>
        <el-dialog title="添加家政banner" v-if="activeName=='first'" :visible.sync="dialogFormVisible">
          <el-form :model="meg">
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="meg.img" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add()">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="data" height="350" border style="width: 80%;margin:20px auto">
          <el-table-column type="index" label="序号" width="180"></el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click.native.prevent="delimg(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="家政评论" name="second">
        <el-button type="primary" round @click="uadd">添加</el-button>
        <el-dialog title="添加|修改家政banner" v-if="activeName=='second'" :visible.sync="isshow">
          <el-form :model="comm">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="comm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="comm.age" autocomplete="off" type="number" min="0"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="comm.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="资格认证" :label-width="formLabelWidth">
              <el-checkbox-group v-model="comm.qualification">
                <el-checkbox label="身份证"></el-checkbox>
                <el-checkbox label="学生证"></el-checkbox>
                <el-checkbox label="健康证"></el-checkbox>
                <el-checkbox label="上岗证"></el-checkbox>
                <el-checkbox label="母婴护理师证"></el-checkbox>
                <el-checkbox label="催乳师证"></el-checkbox>
                <el-checkbox label="产后恢复师证"></el-checkbox>
                <el-checkbox label="助理家政管理证"></el-checkbox>
                <el-checkbox label="家政管理证"></el-checkbox>
                <el-checkbox label="高级家政管理师证"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="服务项目" :label-width="formLabelWidth">
              <el-checkbox-group v-model="comm.type">
                <el-checkbox label="保姆"></el-checkbox>
                <el-checkbox label="月嫂"></el-checkbox>
                <el-checkbox label="钟点工"></el-checkbox>
                <el-checkbox label="保洁"></el-checkbox>
                <el-checkbox label="家电清洗"></el-checkbox>
                <el-checkbox label="家具保养"></el-checkbox>
                <el-checkbox label="新居开荒"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学历" :label-width="formLabelWidth">
              <el-select v-model="comm.edu" placeholder="请选择">
                <el-option label="小学" value="小学"></el-option>
                <el-option label="初中" value="初中"></el-option>
                <el-option label="高中" value="高中"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作年限" :label-width="formLabelWidth">
              <el-input v-model="comm.year" autocomplete="off" type="number" min="0"></el-input>
            </el-form-item>
            <el-form-item label="级别" :label-width="formLabelWidth">
              <el-input v-model="comm.vNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input v-model="comm.price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="城市" :label-width="formLabelWidth">
              <el-input v-model="comm.city" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="经验" :label-width="formLabelWidth">
              <el-input v-model="comm.experience" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="点赞数量" :label-width="formLabelWidth">
              <el-input v-model="comm.likeNum" autocomplete="off" type="number" min="0"></el-input>
            </el-form-item>
            <el-form-item label="关注人数" :label-width="formLabelWidth">
              <el-input v-model="comm.readNum" autocomplete="off" type="number" min="0"></el-input>
            </el-form-item>
            <el-form-item label="距离" :label-width="formLabelWidth">
              <el-input v-model="comm.len" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="自我评价" :label-width="formLabelWidth">
              <el-input v-model="comm.info" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth">
              <el-input v-model="comm.img" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isshow = false">取 消</el-button>
            <el-button type="primary" @click="addcomm()" v-if="id==0">确 定</el-button>
            <el-button type="primary" @click="update()" v-else>修 改</el-button>
          </div>
        </el-dialog>
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option label="保姆" value="保姆"></el-option>
          <el-option label="月嫂" value="月嫂"></el-option>
          <el-option label="钟点工" value="钟点工"></el-option>
          <el-option label="保洁" value="保洁"></el-option>
          <el-option label="家电清洗" value="家电清洗"></el-option>
          <el-option label="家具保养" value="家具保养"></el-option>
          <el-option label="新居开荒" value="新居开荒"></el-option>
        </el-select>
        <el-table :data="people" height="350" border style="width: 80%;margin:20px auto">
          <el-table-column type="index" label="序号" width="120"></el-table-column>
          <el-table-column prop="tel" label="电话" width="120"></el-table-column>
          <el-table-column prop="price" label="价格" width="120"></el-table-column>
          <el-table-column prop="age" label="年龄" width="120"></el-table-column>
          <el-table-column prop="edu" label="学历" width="120"></el-table-column>-->
          <el-table-column prop="type" label="服务类型" width="120"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="cud(scope.row.id)"></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click.native.prevent="cdel(scope.row.id)"
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
      people: [],
      dialogFormVisible: false,
      isshow: false,
      formLabelWidth: "120px",
      meg: {
        img: ""
      },
      comm: {
        img: "",
        name: "",
        age: "",
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        qualification: [],
        type: []
      },
      id: 0,
      value: ""
    };
  },
  methods: {
    first() {
      this.axios({
        url: API.gethousebanner,
        method: "get"
      }).then(res => {
        this.data = res.data.data;
      });
    },
    second(params) {
      this.axios({
        url: API.getpepole,
        method: "get",
        params: params
      }).then(res => {
        var data = res.data.data;
        if (data.length > 0) {
          this.people = data.map(item => {
            if (item.type.indexOf("[") != -1) {
              item.type = JSON.parse(item.type).join(",");
              // item.qualification = JSON.parse(item.qualification).join(",");
              return item;
            } else {
              return item;
            }
          });
        } else {
          this.people = data;
        }
      });
    },
    handleClick(tab, event) {
      //   var url = API.gethometeach;
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
    add() {
      this.axios({
        url: API.addhousebanner,
        params: this.meg
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
    delimg(id) {
      this.del(id, API.delhousebanner);
      this.first();
    },
    cdel(id) {
      this.del(id, API.delpepole);
      this.second();
    },
    uadd() {
      this.id = 0;
      this.isshow = true;
      this.comm = {
        img: "",
        name: "",
        age: "",
        edu: "",
        year: "",
        vNum: "",
        price: "",
        city: "",
        experience: "",
        readNum: "",
        likeNum: "",
        len: "",
        tel: "",
        info: "",
        qualification: [],
        type: []
      };
    },
    addcomm() {
      // this.comm.type = JSON.parse(this.comm.type);
      // this.comm.qualification = JSON.parse(this.comm.qualification);

      this.axios({
        url: API.addpepole,
        params: this.comm
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.isshow = false;
          this.second();
        } else {
          this.$message.error(res.data.info);
        }
      });
    },
    cud(id) {
      this.id = id;
      this.isshow = true;
      this.axios({
        url: API.getpepole,
        params: {
          id: this.id
        }
      }).then(res => {
        this.comm = res.data.data[0];
        
        if (this.comm.type.indexOf('[')==-1) {
          this.comm.type=this.comm.type.replace("\"","").split(',');
          this.comm.qualification=this.comm.qualification.replace("\"","").split(',');
          console.log(this.comm.type);        
          console.log(this.comm.qualification);
        } else {
          this.comm.type = JSON.parse(this.comm.type);
          this.comm.qualification = JSON.parse(this.comm.qualification);
          
        }
      });
    },
    update() {
      this.axios({
        url: API.updatepepole,
        params: this.comm
      }).then(res => {
        if (res.data.isok) {
          this.$message({
            message: res.data.info,
            type: "success"
          });
          this.isshow = false;

          this.second();
        } else {
          this.$message.error(res.data.info);
        }
      });
    }
  },
  mounted() {
    this.first();
  },
  watch: {
    value() {
      this.second({
        type: this.value
      });
    }
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';
</style>