<template>
  <div class="user-container">


    审核状态 ：
    <el-radio-group v-model="form.status">
      <el-radio :label="-1">全部</el-radio>
      <el-radio :label="0">待审核</el-radio>
      <el-radio :label="1">审核成功</el-radio>
      <el-radio :label="2">审核失败</el-radio>
    </el-radio-group>
    <el-button type="primary" size="mini" @click="findAll" style="margin-left: 30px">搜索</el-button>

    <el-table
        :data="pageInfo.data.records"
        style="width: 100%">
      <el-table-column
          type="index"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="真实姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="用户昵称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="color"
          label="车辆颜色"
          width="180">
      </el-table-column>
      <el-table-column
          prop="plate"
          label="车品牌"
          width="180">
      </el-table-column>
      <el-table-column
          prop="type"
          label="车类型"
          width="180">
      </el-table-column>
      <el-table-column
          prop="photo"
          label="车辆图片"
          width="180">

        <template v-slot="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.photo"
              fit="fill"></el-image>
        </template>


      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          width="180">
        <template v-slot="scope">
          {{scope.row.status===0?'待审核':scope.row.status===1?'审核通过':'审核失败'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="reason"
          label="拒绝原因"
          width="180">
      </el-table-column>


      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="pass(scope.row.id)" v-if="scope.row.status===0">通过</el-button>
          <el-button size="mini" type="danger" @click="toFail(scope.row)" v-if="scope.row.status===0">驳回</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--驳回的弹窗-->
    <el-dialog title="驳回" :visible.sync="dialogImportExcelVisible">
      <el-form :model="form">
        <el-form-item label="拒绝原因" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reason">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportExcelVisible = false">取 消</el-button>
        <el-button type="primary" @click="fail">保 存</el-button>
      </div>
    </el-dialog>


    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.data.current"
          :page-sizes="[10, 20, 30]"
          :page-size="pageInfo.data.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.data.total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
import $axios from "axios";
import json from "@/api/url.json";

export default {
  name: 'userApplyView',
  data () {
    return {
      form:{
        page:1,
        size:10
      },
      pageInfo:{
        data:{
          records:[]
        },
      },
      formLabelWidth:200,
      dialogImportExcelVisible:false
    }
  },
  methods:{
    findAll(){
      $axios.post(json.serviceUrl.user_apply.findAll,this.form).then(res=>{
        this.pageInfo=res.data;
      })
    },
    pass(id){
      $axios.post(json.serviceUrl.user_apply.pass+"/"+id,).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.findAll();
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    toFail(p){
      this.form=p;
      this.dialogImportExcelVisible=true;
    },
    fail(){
      $axios.post(json.serviceUrl.user_apply.fail+"/"+this.form.id+"/"+this.form.reason).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.dialogImportExcelVisible=false;
          this.findAll();
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize=val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage=val;
      console.log(`当前页: ${val}`);
    },
  },
  created() {
    this.findAll();
  }
}
</script>