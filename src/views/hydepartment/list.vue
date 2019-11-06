<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
      <el-tree ref="tree" class="filter-tree" :data="list" :props="defaultProps" default-expand-all :filter-node-method="filterNode">
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span v-if="node.data.info">
            <el-button type="text" size="mini" @click="() => getInfo(node,data)">
              {{ node.data.info.name }}
            </el-button>
          </span>
          <span v-else-if="node.childNodes.length === 0">
            <el-button type="text" size="mini" @click="() => getByDepartmentId(node,data)">
              {{ node.label }}
            </el-button>
          </span>
          <span v-else>
            {{ node.label }}
          </span>
        </span>
      </el-tree>
    </div>
    <el-dialog v-if="staffInfo" title="个人信息" :visible.sync="dialogFormVisible" :close="handleClose">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="staffInfo.avatar" width="100px">
        <div style="padding: 14px;">
          <span>{{ staffInfo.name }}</span>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAll } from '@/api/BaseData/Hy/Department/department'
import { getByDepartmentId } from '@/api/BaseData/Hy/Staff/staff'

export default {
  data() {
    return {
      dialogFormVisible: false,
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      filterText: '',
      listLoading: true,
      list: [],
      staffInfo: null,
      formLabelWidth: '120px'
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getByDepartmentId(node, data) {
      const c = this
      console.log(node)

      getByDepartmentId(data.id).then(function(res) {
        res.data.list.map(function(value, index, array) {
          const newChild = { id: value.id, name: value.name, info: value }
          if (!data.child) {
            c.$set(data, 'child', [])
          }
          data.child.push(newChild)
        })
      })
    },
    getInfo(node, data) {
      this.dialogFormVisible = true
      this.staffInfo = node.data.info
    },
    handleClose() {
      console.log('close')
      this.staffInfo = null
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getList() {
      this.listLoading = true
      getAll().then(response => {
        this.list = response.data.list

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
