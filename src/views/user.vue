<template>
  <div class="user-container">


    姓名：<el-input v-model="form.name" placeholder="请输入姓名" style="width: 200px; margin-right: 20px"></el-input>
    <el-button type="primary" size="mini" @click="findAll">搜索</el-button>

    <el-table
        :data="pageInfo.data.records"
        style="width: 100%">
      <el-table-column
         type="index"
          width="180">
      </el-table-column>
      <el-table-column
          prop="photo"
          label="头像"
          width="180">
        <template v-slot="scope">
          <el-avatar :size="50" :src="scope.row.photo"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
          prop="nickname"
          label="昵称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="realnameInfoId"
          label="实名状态"
          width="180">
        <template v-slot="scope">
            {{scope.row.realnameInfoId!=null?'已实名':'未实名'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="isDriver"
          label="是否司机"
          width="180">
        <template v-slot="scope">
            {{scope.row.isDriver===1?'司机':'乘客'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="活跃状态"
          width="180">
        <template v-slot="scope">
            {{scope.row.status===1?'活跃':'不活跃'}}
        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button size="mini" type="primary" @click="details(scope.row)">详情</el-button>
        </template>
      </el-table-column>

    </el-table>


    <!-- 详情-->
    <el-dialog :title="model.title" :visible.sync="dialogFormVisibleDetail">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="头像">
          <el-avatar :size="50" :src="form.photo"></el-avatar>
        </el-descriptions-item>
        <el-descriptions-item label="昵称">{{form.nickname}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{form.phone}}</el-descriptions-item>
        <el-descriptions-item label="实名状态">
          <el-tag size="small">{{form.realnameInfoId!=null?'已实名':'未实名'}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="是否司机">
          <el-tag size="small">{{form.isDriver==1?'司机':'乘客'}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small">{{form.status==1?'活跃':'不活跃'}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
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
  name: 'userView',
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
      model:{
        title:'',
      },

      formLabelWidth:200,
      dialogFormVisibleDetail:false
    }
  },
  methods:{
    findAll(){
      $axios.post(json.serviceUrl.user.findUserAll,this.form).then(res=>{
        this.pageInfo=res.data;
        console.log(this.pageInfo)
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
    //详情
    details(row){
      this.form=row
      this.model.title='详情'
      this.dialogFormVisibleDetail=true
    }
  },
  created() {
    this.findAll();
  }
}
</script>