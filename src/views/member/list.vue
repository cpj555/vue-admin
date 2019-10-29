<template>
  <div class="app-container">
    <div class="filter-container">
      <el-table
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="account"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="nick"
          label="地址"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/BaseData/Member/member'

export default {
  data() {
    return {
      listLoading: true,
      list: [],
      count: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.count = response.data.count

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
