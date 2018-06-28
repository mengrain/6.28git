<template>
  <div className="menu-page">
      <el-row >
          <el-col :span="10" :offset="1">
              <el-card>
                  <el-tree
                          :data="data"
                          :props="defaultProps"
                          node-key="id"
                          draggable
                          check-on-click-node
                          default-expand-all
                          highlight-current
                          :expand-on-click-node="false"
                          :allow-drag="allowDrag"
                          @node-click="handleNodeClick"
                          @node-drop="dropNode"
                  ></el-tree>
              </el-card>
          </el-col>
          <el-col :span="10" :offset="1">
              <el-row v-show="showEdit">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                          <span>编辑机构</span>
                          <el-button type="danger" @click="remove" size="small" style="float: right;" >删除</el-button>
                          <el-button type="primary" @click="update" size="small" style="float: right;" >保存</el-button>
                      </div>
                      <div class="text item">
                          <el-form ref="editNodeForm" :model="editNodeForm" label-width="80px">
                              <el-form-item label="名称">
                                  <el-input v-model="editNodeForm.name"></el-input>
                              </el-form-item>
                              <el-form-item label="描述">
                                  <el-input v-model="editNodeForm.description"></el-input>
                              </el-form-item>
                          </el-form>
                      </div>
                  </el-card>
              </el-row>
              <el-row v-show="showAdd">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                          <span>添加下级机构</span>
                          <el-button type="primary" @click="create" size="small" style="float: right;" >保存</el-button>
                      </div>
                      <div class="text item">
                          <el-form ref="newNodeForm" :model="newNodeForm" label-width="80px">
                              <el-form-item label="名称">
                                  <el-input v-model="newNodeForm.name"></el-input>
                              </el-form-item>
                              <el-form-item label="描述">
                                  <el-input v-model="newNodeForm.description"></el-input>
                              </el-form-item>
                          </el-form>
                      </div>
                  </el-card>
              </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>

export default {
  name: 'Org',
  components: {
  },
  data(){
    return {
      defaultProps: {
        children: 'items',
        label: 'name'
      },
      data: [],
      editNodeForm:{
        name: '',
        url: '',
      },
      newNodeForm:{
        name: '',
        url: '',
      },

      showEdit: false,
      showAdd: false,
    };
  },
  created (){
    this.loadData('0');
  },
  mounted (){
    this.$store.commit('GET_ROUTE_NAME', '机构管理');
  },
  methods: {

    handleNodeClick(data) {

      if(data.id === '0'){
        this.showEdit = false;
        this.showAdd = true;
      }
      else {
        this.showEdit = true;
        this.showAdd = true;
      }

      this.editNodeForm = data;
      this.newNodeForm.parentId = data.id;
    },

    allowDrag(node) {
      if(node.data.id === '0'){
        return false;
      }
      return true;
    },

    dropNode(dragNode, dropNode, pos) {
      let data = {id: dragNode.data.id, dropId: dropNode.data.id, pos: pos};

      this.$axios.post('/api/sysOrg/move', data).then(res => {
        this.$message({
          type: 'success',
          message: '菜单顺序更改成功!'
        });
      });
    },

    loadData() {
      this.$axios.get('/api/sysOrg/0' ).then(res => {
        this.data = [{
          id: '0',
          name: '根节点',
          items: res.data
        }];
      });
    },
    create() {
      if(this.editNodeForm.url){
        this.$message({
          type: 'warning',
          message: '禁止在页面资源下创建菜单!'
        });
        return;
      }
      this.$refs['newNodeForm'].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/sysOrg/', this.newNodeForm).then(res => {
            this.$message({
              type: 'success',
              message: '创建成功!'
            });
            this.newNodeForm.name = '';
            this.newNodeForm.url = '';
            this.loadData();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    update() {
      this.$refs['editNodeForm'].validate((valid) => {
        if (valid) {
          this.$axios.put('/api/sysOrg/' + this.editNodeForm.id, this.editNodeForm).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
            this.loadData();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    remove() {
      this.$confirm('确认删除该菜单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('/api/sysOrg/' + this.editNodeForm.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData();
        });
      });
    },
  }
};
</script>

<style>

</style>