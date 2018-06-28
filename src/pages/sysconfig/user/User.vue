<template>
  <div class="menu-page">
      <el-row >
          <el-input
                  style="width: 300px"
                  @keyup.native.enter="handleSearchKeyChange"
                  v-model="searchKey"
                  placeholder="按用户名或姓名搜索"
          >
          </el-input>
          <el-button icon="el-icon-search" @click="handleSearchKeyChange">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
          <el-table
                  :data="tableData"
                  stripe
                  border
                  @sort-change="sortChange"
                  style="width: 100%;margin-top: 5px">
              <el-table-column
                      prop="username"
                      label="用户名"
                      sortable="custom"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="realName"
                      label="姓名"
                      sortable="custom"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="org.name"
                      label="机构"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="roleNames"
                      label="角色"
                      min-width="180">
              </el-table-column>
              <el-table-column
                      prop="status"
                      label="状态"
                      width="80">
                  <template slot-scope="scope">
                      <el-tag
                              size="mini"
                              :type="scope.row.status === 1 ? 'success' : 'danger'"
                              disable-transitions>{{scope.row.status === 1 ? '正常' : '禁用'}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column label="操作" width="220">
                  <template slot-scope="scope">
                      <el-button
                              size="mini"
                              type="success"
                              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button
                              size="mini"
                              type="success"
                              v-if="scope.row.status===2"
                              @click="enable(scope.$index, scope.row)">启用</el-button>
                      <el-button
                              size="mini"
                              type="warning"
                              v-if="scope.row.status===1"
                              @click="disable(scope.$index, scope.row)">禁用</el-button>
                      <el-button
                              size="mini"
                              type="danger"
                              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <el-pagination
                  style="float:right"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalRecords">
          </el-pagination>
      </el-row>
      <el-dialog
              :title="userTitle"
              :visible.sync="editDialogVisible"
              width="30%">

          <el-form ref="editNodeForm" :rules="formValid"  :model="editNodeForm" label-width="80px">
              <el-form-item label="用户名" prop="username">
                  <el-input v-model="editNodeForm.username"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="realName">
                  <el-input v-model="editNodeForm.realName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password" :required="!editNodeForm.id">
                  <el-input type="password" v-model="editNodeForm.password" :placeholder="updateTooltip"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password1">
                  <el-input type="password" v-model="editNodeForm.password1"></el-input>
              </el-form-item>
              <el-form-item label="选择单位" prop="orgId">
                  <fu-treeview-dropdown
                          style="width:100%"
                          node-key="id"
                          :props="treeProps"
                          :tree-data="orgTree"
                          v-model="editNodeForm.orgId"
                  ></fu-treeview-dropdown>
              </el-form-item>
              <el-form-item label="选择角色" prop="roles">
                  <el-select style="width:100%" v-model="editNodeForm.roles" multiple placeholder="可多选">
                      <el-option
                              v-for="role in roleList"
                              :key="role.value"
                              :label="role.label"
                              :value="role.value">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateUser">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>

import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
import FuTreeviewDropdown from "../../../components/fu-treeview-dropdown/src/select-treeview.vue";
import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

export default {
  name: 'User',
  components: {
    ElInput,
    FuTreeviewDropdown,
    ElButton
  },
  data(){
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        if(!this.editNodeForm.id || (this.editNodeForm.password1 && this.editNodeForm.password1 !== '')) {
          console.info(this);
          callback(new Error('请输入密码'));
        }
      } else if(value.length < 3 && value.length >18) {
        callback(new Error('密码长度不能超过3个字符或小于18个字符'));
      } else {
        if (this.editNodeForm.password1 !== '') {
          this.$refs.editNodeForm.validateField('password1');
        }
        callback();
      }
    };
    let validatePass1 = (rule, value, callback) => {
      if (!value) {
        if(!this.editNodeForm.id || (this.editNodeForm.password && this.editNodeForm.password !== '')) {
          callback(new Error('请再次输入密码'));
        }
      } else if (value !== this.editNodeForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      orgTree: [],
      roleList: [],
      userTitle: '编辑用户',
      totalRecords: 0,
      editDialogVisible: false,
      editNodeForm: {},
      treeProps: {
        children: 'items',
        label: 'name'
      },
      pagesize: 20,
      currentPage: 1,
      searchKey: '',
      filters: {},
      sortField: '',
      sortOrder: '',
      updateTooltip: '',
      formValid: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '单位不能为空', trigger: 'blur' },
//          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password1: [
          { validator: validatePass1, trigger: 'blur' },
        ],
        roles: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],

      },
    };
  },
  created (){
    this.loadData();
    this.loadRoles();
    this.loadOrgs();
    this.clearUser();
  },
  mounted (){
    this.$store.commit('GET_ROUTE_NAME', '用户管理');
  },
  methods: {
    sortChange({ column, prop, order }) {
      this.sortField = prop;
      this.sortOrder = order;
      this.loadData();
    },
    handleSearchKeyChange() {
      this.filters = {
        username: {value: this.searchKey},
        realName: {value: this.searchKey},
      };
      this.loadData();
    },
    handleCurrentChange(page) {
      this.loadData();
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.loadData();
    },
    loadData() {
      let event = {
        filters: this.filters,
        first: (this.currentPage - 1) * this.pagesize,
        rows: this.pagesize,
        field: this.sortField,
        order: this.sortOrder,
      };
      this.$axios.post('/api/sysUser/query', event).then(res => {
        this.tableData = res.data.content;
        this.totalRecords = res.data.totalElements;
        for (let i = 0; i < this.tableData.length; i++) {
          const user = this.tableData[i];
          user.roleNames = user.roles.map(r => r.description).join(',');
        }
      });
    },
    loadRoles(){
      this.$axios.get('/api/sysRole').then(res => this.roleList = res.data);
    },

    loadOrgs() {
      this.$axios.get('/api/sysOrg/0' ).then(res => {
        this.orgTree = res.data;
      });
    },
    clearUser(){
      this.editNodeForm =
        {
          id:'',
          username: '',
          realName: '',
          password: '',
          password1: '',
          orgId: '',
          roles: [],
        };
    },

    handleEdit(index, row) {
      this.userTitle = '编辑用户';
      this.updateTooltip = '密码为空时保持原密码不变';
      this.editDialogVisible = true;

      this.$axios.get('/api/sysUser/' + row.id).then(res => {
        this.editNodeForm = res.data;
      });
    },
    handleAdd() {
      this.userTitle = '新增用户';
      this.updateTooltip = '';
      this.editDialogVisible = true;
      this.clearUser();
    },
    updateUser() {
      this.$refs['editNodeForm'].validate((valid) => {
        if (valid) {
          if ((this.editNodeForm.password || this.editNodeForm.password1 ) && this.editNodeForm.password !== this.editNodeForm.password1) {
            this.$message({
              type: 'error',
              message: '密码不一致'
            });
            return;
          }
          if (this.editNodeForm.id) {//更新
            this.$axios.put('/api/sysUser/' + this.editNodeForm.id, this.editNodeForm).then(
              res => {
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.editDialogVisible = false;
                this.clearUser();
                this.loadData();
              },
              err => {
                this.$message({
                  type: 'error',
                  message: err.text
                });
              }
            );

          } else { // 创建
            this.$axios.post('/api/sysUser', this.editNodeForm).then(
              res => {
                this.$message({
                  type: 'success',
                  message: '新增用户成功!'
                });
                this.editDialogVisible = false;
                this.clearUser();
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    handleDelete(index, row) {
      this.$confirm('确认删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/sysUser/' + row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData();
        });
      });
    },

    enable(index, row) {
      this.$axios.post('/api/sysUser/' + row.id + '/enable', {}).then(res => {
        row.status = 1;
        this.$message({
          type: 'success',
          message: '启用成功!'
        });
//        this.loadData();
      });
    },
    disable(index, row) {
      this.$axios.post('/api/sysUser/' + row.id + '/disable', {}).then(res => {
        row.status = 2;
        this.$message({
          type: 'success',
          message: '禁用成功!'
        });
//        this.loadData();
      });
    },
  }
};
</script>

<style lang="scss">
.menu-page .el-table {
    td,
    th {
        padding: 0px;
    }
}
</style>