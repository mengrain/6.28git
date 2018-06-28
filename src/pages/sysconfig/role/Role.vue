<template>
  <div className="menu-page">
      <el-row >
          <el-button type="success" @click="handleAdd">新增角色</el-button>
          <el-table
                  :data="tableData"
                  stripe
                  border
                  style="width: 70%">
              <el-table-column
                      prop="name"
                      label="角色名"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="description"
                      label="描述"
                      min-width="180">
              </el-table-column>
              <el-table-column label="操作"  width="240">
                  <template slot-scope="scope">
                      <el-button
                              size="mini"
                              type="success"
                              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                              size="mini"
                              type="success"
                              @click="editResource(scope.$index, scope.row)">菜单权限</el-button>
                      <el-button
                              size="mini"
                              type="danger"
                              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <!--<el-pagination-->
                  <!--@size-change="handleSizeChange"-->
                  <!--@current-change="handleCurrentChange"-->
                  <!--:current-page="currentPage"-->
                  <!--:page-sizes="[10, 20, 50, 100]"-->
                  <!--:page-size="pagesize"-->
                  <!--layout="total, sizes, prev, pager, next, jumper"-->
                  <!--:total="data.length">-->
          <!--</el-pagination>-->
      </el-row>
      <el-dialog
              :title="roleTitle"
              :visible.sync="editDialogVisible"
              width="30%">

          <el-form ref="editNodeForm" :model="editNodeForm" label-width="80px">
              <el-form-item label="角色名">
                  <el-input v-model="editNodeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                  <el-input v-model="editNodeForm.description"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateRole">确 定</el-button>
          </span>
      </el-dialog>
      <el-dialog
              title="编辑菜单权限"
              :visible.sync="menuDialogVisible"
              width="30%">
          <el-tree
                  ref="menuTree"
                  :data="menuData"
                  :props="defaultProps"
                  node-key="id"
                  show-checkbox

                  check-on-click-node
                  default-expand-all
                  :expand-on-click-node="false"
          ></el-tree>
          <span slot="footer" class="dialog-footer">
            <el-button @click="menuDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateResource">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>

import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

export default {
  name: 'Role',
  components: {
    ElButton
  },
  data(){
    return {
      roleTitle: '编辑角色',
      tableData: [],
      menuData: [],
      totalRecords: 0,
      editDialogVisible: false,
      menuDialogVisible: false,
      currentRow: {},
      editNodeForm: {},

      defaultProps: {
        children: 'items',
        label: 'name'
      },
    };
  },
  created (){
    this.loadData();
    this.loadResource();
  },
  mounted (){
    this.$store.commit('GET_ROUTE_NAME', '角色管理');
  },
  methods: {

    loadData() {
      let event = {
        first: 0,
        rows: 100
      };
      this.$axios.post('/api/sysRole/query', event).then(res => {
        this.tableData = res.data.content;
        this.totalRecords = res.data.totalElements;
      });
    },
    loadResource(){
      this.$axios.get('/api/sysResource/0' ).then(res => {
        this.menuData = res.data;
      });
    },

    clearRole(){
      this.editNodeForm =
        {
          id:'',
          name: '',
          description: '',
        };
    },

    handleEdit(index, row) {
      this.roleTitle = '编辑角色';
      this.editDialogVisible = true;
      this.editNodeForm = row;
    },
    handleAdd() {
      this.roleTitle = '新增角色';
      this.editDialogVisible = true;
      this.clearRole();
    },
    updateRole() {
      if(this.editNodeForm.id) {//更新
        this.$axios.put('/api/sysRole/' + this.editNodeForm.id, this.editNodeForm).then(
          res => {
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
            this.editDialogVisible = false;
            this.clearRole();
          },
          err => {
            this.$message({
              type: 'error',
              message: err.text
            });
          }
        );
      } else { // 创建
        this.$axios.post('/api/sysRole', this.editNodeForm).then(
          res => {
            this.$message({
              type: 'success',
              message: '新增角色成功!'
            });
            this.editDialogVisible = false;
            this.clearRole();
            this.loadData();
          },
          err => {
            this.$message({
              type: 'error',
              message: err.text
            });
          }
        );
      }
    },

    handleDelete(index, row) {
      this.$confirm('确认删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/sysRole/' + row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData();
        });
      });
    },
    editResource(index, row){
      this.menuDialogVisible = true;
      this.currentRow = row;

      this.$axios.get('/api/sysRole/' + row.id + '/resource').then(res => {
        this.$refs.menuTree.setCheckedKeys(res.data);
      });
    },
    updateResource(){
      let resources = this.$refs.menuTree.getCheckedKeys();

      this.$axios.put('/api/sysRole/' + this.currentRow.id + '/resource', resources).then(res => {
        this.$message({
          type: 'success',
          message: '菜单权限修改成功!'
        });
        this.menuDialogVisible = false;
      });
    },
  }
};
</script>

<style>

</style>