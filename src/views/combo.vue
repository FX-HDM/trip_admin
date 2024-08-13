<template>
  <div class="user-container">
    <el-button type="primary" size="mini" @click="toAdd" style="margin-left: 30px">添加</el-button>

    <el-table
        :data="pageInfo.data"
        style="width: 100%">
      <el-table-column
          type="index"
          width="200">
      </el-table-column>
      <el-table-column
          prop="name"
          label="套餐名称"
          width="300">
      </el-table-column>
      <el-table-column type="expand" label="优惠卷" width="300">
        <template slot-scope="scope">
          <el-table
              :data="scope.row.coupons"
              style="width: 100%">
            <el-table-column
                prop="id"
                label="优惠卷id"
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
            <el-table-column
                prop="num"
                label="数量"
                width="180">
            </el-table-column>
            </el-table>
        </template>
      </el-table-column>

      <el-table-column
          prop="price"
          label="购买价格"
          width="200">
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="toUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="primary" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>



    <el-dialog :title="model.title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="套餐名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form :model="form.coupons">
          <div v-for="(item,index) in form.coupons" :key="index">
            <el-form-item label="选择优惠卷" :label-width="formLabelWidth">
              <el-select v-model="item.id" placeholder="请选择">
                <el-option
                    v-for="item in couponList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
              <el-form-item :label-width="formLabelWidth">
                <el-input v-model="item.num" placeholder="数量"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="index+1 == form.coupons.length"  @click="addRow" type="primary">增加</el-button>
                <el-button v-if="index !== 0" @click="delRow(item,index)" type="danger">删除</el-button>
              </el-form-item>
          </div>
        </el-form>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>

    </el-dialog>




  </div>
</template>

<script>
import $axios from "axios";
import json from "@/api/url.json";

export default {
  name: 'comboView',
  data () {
    return {
      couponList:[{}],
      form:{
        coupons:[
          {
            id:'',
            num:''
          }
        ],
      },
      pageInfo:{
      },
      dialogFormVisible:false,
      formLabelWidth:'180px',
      model:{
      }
    }
  },
  methods:{
    addRow(){
      this.form.coupons.push({
        id:'',
        num:''
      })
    },
    delRow(item,index){
      this.form.coupons.splice(index,1);
      console.log(this.form.coupons,"删除")
    },
    findAll(){
      $axios.get(json.serviceUrl.combo.adminFindAllCombo).then(res=>{
        this.pageInfo=res.data;
        console.log(this.pageInfo)
      })
    },
    findCouponList(){
      $axios.get(json.serviceUrl.combo.adminFindAll).then(res=>{
        this.couponList=res.data.data;
        console.log(this.couponList.length)
      })
    },
    saveOrUpdate(){
      console.log(this.form)
      $axios.post(json.serviceUrl.combo.saveOrUpdate,this.form).then(res=>{
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
        $axios.delete(json.serviceUrl.combo.handleDelete+"/"+id).then(res=>{
          if (res.data==true){
            this.$message.success("操作成功");
            this.initData();//刷新
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
      this.form={coupons: [{}]};
      this.model.title='添加优惠券套餐';
      this.dialogFormVisible=true;
    },
    toUpdate(data){
      this.form=data;
      this.model.title='修改优惠券套餐';
      this.dialogFormVisible=true;
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
    this.findCouponList();
  }
}
</script>