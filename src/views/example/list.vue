<template>
  <div class="app-container">

    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.slId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="400px" align="center" label="文件">
        <template slot-scope="scope">
          <span>{{ scope.row.file }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="行数" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.line }}</span>
        </template>
      </el-table-column>

      <el-table-column width="170px" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.recordTime }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column width="100px" label="Importance">-->
      <!--<template slot-scope="scope">-->
      <!--<svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column class-name="status-col" label="Status" width="110">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column min-width="300px" label="Title">-->
      <!--<template slot-scope="scope">-->

      <!--<router-link :to="'/example/edit/'+scope.row.id" class="link-type">-->
      <!--<span>{{ scope.row.title }}</span>-->
      <!--</router-link>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button type="danger" size="small" icon="el-icon-question" @click="getTrace(scope.row.slId)">Trace</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogTableVisible" title="Trace">
      <span v-html="trace"/>
    </el-dialog>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[15,30,50]"
        :page-size="listQuery.limit"
        :page-count="page_count"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

  </div>

</template>

<script>
import { fetchList, fetchTrace } from '@/api/log'

export default {
  name: 'ArticleList',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      trace: null,
      page_count: 0,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 15
      },
      dialogTableVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.page_count = response.data.totalPage
        this.total = response.data.count
        this.listLoading = false
      })
    },
    getTrace(id) {
      this.dialogTableVisible = true
      fetchTrace(id).then(response => {
        this.trace = response.data.trace.replace(/\n/g, '<br/>')
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
