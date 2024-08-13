<template>
  <div class="user-container">


    类型 ：
    <el-radio-group v-model="form.type">
      <el-radio :label="0">全部</el-radio>
      <el-radio :label="1">满减</el-radio>
      <el-radio :label="2">打折</el-radio>
    </el-radio-group>
    <el-button type="primary" size="mini" @click="findAll" style="margin-left: 30px">搜索</el-button>
    <el-button type="primary" size="mini" @click="toAdd" style="margin-left: 30px">添加</el-button>

    <el-table
        :data="pageInfo.data.records"
        style="width: 100%">
      <el-table-column
          type="index"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="优惠卷名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型"
          width="180">
        <template v-slot="scope">
          {{scope.row.type===1?'满减':'打折'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="rule"
          label="使用规则"
          width="180">
      </el-table-column>
      <el-table-column
          prop="favorable"
          label="优惠金额/折扣"
          width="180">
      </el-table-column>


      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="toUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>



    <el-dialog :title="model.title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">满减</el-radio>
            <el-radio :label="2">打折</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="使用规则" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.rule">
          </el-input>
        </el-form-item>
        <el-form-item label="优惠金额/折扣" :label-width="formLabelWidth">
          <el-input v-model="form.favorable" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
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
  name: 'couponView',
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
      dialogFormVisible:false,
      formLabelWidth: '200px',
      model:{
        title:'',
      }
    }
  },
  methods:{
    findAll(){
      $axios.post(json.serviceUrl.coupon.findAll,this.form).then(res=>{
        this.pageInfo=res.data;
      })
    },
    saveOrUpdate(){
      $axios.post(json.serviceUrl.coupon.saveOrUpdateCoupon,this.form).then(res=>{
        if(res.data.code===200){
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.dialogFormVisible=false;
          this.findAll();
        }else{
          this.$message({
            message: '操作失败',
            type: 'error'
          });
        }
      })

    },
    handleDelete(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $axios.delete(json.serviceUrl.coupon.handleDelete+"/"+id).then(res=>{
          if (res.data==true){
            this.$message.success("操作成功");
            this.findAll();//刷新
          }else{
            this.$message.error("操作失败");
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    toAdd(){
     this.form={};
      this.model.title='添加优惠券';
      this.dialogFormVisible=true;
    },
    toUpdate(data){
      this.model.title='修改优惠券';
      this.dialogFormVisible=true;
      this.form=data;
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