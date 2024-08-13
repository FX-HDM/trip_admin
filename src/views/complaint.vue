<template>
  <div class="index-container">
    <el-table
        :data="pageInfo.data"
        style="width: 100%">
      <el-table-column
          type="index"
          width="180">
      </el-table-column>
      <el-table-column
          prop="driverName"
          label="司机昵称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="startAddress"
          label="起点"
          width="180">
      </el-table-column>
      <el-table-column
          prop="endAddress"
          label="终点"
          width="180">
      </el-table-column>
      <el-table-column
          prop="content"
          label="投诉内容"
          width="180">
      </el-table-column>
      <el-table-column
          prop="mark"
          label="行程评分"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import $axios from "axios";
import json from "@/api/url.json";

export default {
  name: 'containerView',
  data () {
    return {
      pageInfo: {},
    }
  },
  methods:{
    findAll(){
      $axios.get(json.serviceUrl.complaint.findAll).then(res=>{
        this.pageInfo=res.data;
        console.log(this.pageInfo)
      })
    }
  },
  created() {
    this.findAll();
  }
}
</script>

<style>
.index-container {
  height: 100%;
  background-color: white;
}
</style>