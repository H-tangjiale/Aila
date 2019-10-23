<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家教banner" name="first">
        <el-button type="primary" round @click="dialogFormVisible=true" >添加</el-button>
        <el-dialog title="添加家教banner"  v-if="activeName=='first'" :visible.sync="dialogFormVisible" >
          <el-form :model="meg">
            <el-form-item label="图片地址" :label-width="formLabelWidth">
              <el-input v-model="meg.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="meg.des" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add(1)">确 定</el-button>
          </div>
        </el-dialog>
        <home-list :data="data" :arr="['des']" ></home-list>
      </el-tab-pane>
      <el-tab-pane label="家教类型" name="second">
        <el-button type="primary" round @click="dialogFormVisible=true">添加</el-button>
        <el-dialog title="添加家教类型" v-if="activeName=='second'" :visible.sync="dialogFormVisible">
          <el-form :model="meg">
            <el-form-item label="图片地址" :label-width="formLabelWidth">
              <el-input v-model="meg.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
              <el-input v-model="meg.type" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add(2)">确 定</el-button>
          </div>
        </el-dialog>
        <home-list :data="data" :arr="['type']"></home-list>
      </el-tab-pane>
      <el-tab-pane label="家教排行" name="third">
        <el-button type="primary" round @click="dialogFormVisible=true">添加</el-button>
        <el-dialog title="添加家教排行" v-if="activeName=='third'" :visible.sync="dialogFormVisible">
          <el-form :model="meg">
            <el-form-item label="图片地址" :label-width="formLabelWidth">
              <el-input v-model="meg.img" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="机构图片" :label-width="formLabelWidth">
              <el-input v-model="meg.teacherImg" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="报名人数" :label-width="formLabelWidth">
              <el-input v-model="meg.num" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="add(3)">确 定</el-button>
          </div>
        </el-dialog>
        <home-list :data="data" :arr="['num','teacherImg']"></home-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import API from "../../common/js/API";
import homeList from "../views/hometList";
export default {
  data() {
    return {
      activeName: "first",
      data: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      meg: {
        img: "",
        des: "",
        type: "",
        teacherImg: "",
        num: "",
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      var url = API.gethometeach;
      switch (tab.name) {
        case "first":
          url = API.gethometeach;
          break;
        case "second":
          url = API.gethometype;
          break;
        case "third":
          url = API.getteachtop;
          break;
        default:
          break;
      }
      this.axios({
        url: url,
        method: "get"
      }).then(res => {
        //   console.log(res);
        this.data = res.data.data;
      });
    },
    add(a) {
        var url=API.addhometeach;
      switch (a) {
        case 1:
            url=API.addhometeach
          break;
        case 2:
            url=API.addhometype
          break;
        case 3:
            url=API.addtop
          break;
        default:
          break;
      }
      this.axios({
          url,
          params:this.meg
      }).then(res=>{
          console.log(res);
          
      })
    }
  },
  mounted() {
    this.handleClick({ name: "first" });
  },
  components: {
    homeList
  }
};
</script>
<style lang='stylus'  scoped>
@import '../../common/stylus/index';


.el-popup-parent--hidden >>>.v-modal{
   z-index 0
}
</style>