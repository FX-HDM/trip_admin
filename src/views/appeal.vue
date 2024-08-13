<template>
  <div class="index-appeal">
    审核状态 ：
    <el-radio-group v-model="form.status">
      <el-radio :label="0">全部</el-radio>
      <el-radio :label="1">审核成功</el-radio>
      <el-radio :label="2">审核失败</el-radio>
    </el-radio-group>
    <el-button type="primary" size="mini" @click="findAll" style="margin-left: 30px">搜索</el-button>


    <el-table
        :data="pageInfo.data"
        style="width: 100%">
      <el-table-column
          type="index"
          width="180">
      </el-table-column>
      <el-table-column
          prop="driverName"
          label="司机名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="content"
          label="申诉内容"
          width="180">
      </el-table-column>
      <el-table-column
          prop="file"
          label="申诉图片"
          width="180">
        <template v-slot="scope">
          <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.file"
              fit="fill"></el-image>
        </template>

      </el-table-column>
      <el-table-column
          prop="status"
          label="审核状态"
          width="180">
        <template v-slot="scope">
          {{scope.row.status===0?'待审核':scope.row.status===1?'审核通过':'审核失败'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="reason"
          label="驳回原因"
          width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="passAppeal(scope.row.id)" v-if="scope.row.status===0">通过</el-button>
          <el-button size="mini" type="danger" @click="toTurnDownAppeal(scope.row)" v-if="scope.row.status===0">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="驳回" :visible.sync="dialogFailVisible">
      <el-form :model="form">
        <el-form-item label="拒绝原因" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reason">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFailVisible = false">取 消</el-button>
        <el-button type="primary" @click="turnDownAppeal(form.id,form.reason)">保 存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import $axios from "axios";
import json from "@/api/url.json";

export default {
  name: 'appealView',
  data () {
    return {
      pageInfo: {},
      form:{
        status:0,
      },
      dialogPassVisible:false,
      dialogFailVisible:false,
      formLabelWidth: '180px',

    }
  },
  methods:{
    findAll(){
      $axios.get(json.serviceUrl.appeal.findAll+"/"+this.form.status).then(res=>{
        this.pageInfo=res.data;
      })
    },
    passAppeal(id){
      $axios.get(json.serviceUrl.appeal.passAppeal+"/"+id).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.findAll();
          this.dialogPassVisible=false;
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    turnDownAppeal(id,reason){
      $axios.get(json.serviceUrl.appeal.turnDownAppeal+"/"+id+"/"+reason).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.findAll();
          this.dialogFailVisible=false;
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })
    },
    toTurnDownAppeal(data){
      this.dialogFailVisible=true;
      this.form=data;
    }
  },
  created() {
    this.findAll();
  }
}
</script>


<style>

</style>