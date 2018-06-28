<template>
    <div className="menu-page">
        <el-row >
            <el-col :span="8" :offset="1">
                <el-card style="height: 470px; overflow-y: auto">
                    <span style="color:green;font-size: 13px;">*注 选中字典查看详情，拖动字典项改变其排列顺序。</span>
                    <el-tree
                            :data="data"
                            :props="defaultProps"
                            node-key="id"
                            draggable
                            check-on-click-node
                            highlight-current
                            :default-expanded-keys="expandedKeys"
                            :expand-on-click-node="false"
                            :allow-drag="allowDrag"
                            :allow-drop="allowDrop"
                            @node-drop="dropNode"
                            @node-click="handleNodeClick"
                    >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>
                              <el-button
                                      v-show="ifShow(node, 'add')"
                                      type="text"
                                      size="mini"
                                      icon="el-icon-plus"
                                      @click="() => handleAdd(data)">
                              </el-button>
                              <el-button
                                      v-show="ifShow(node, 'edit')"
                                      type="text"
                                      size="mini"
                                      icon="el-icon-edit"
                                      @click="() => handleEdit(node, data)">
                              </el-button>
                              <el-button
                                      v-show="ifShow(node, 'remove')"
                                      type="text"
                                      size="mini"
                                      icon="el-icon-delete"
                                      @click="() => handleRemove(node, data)">
                              </el-button>
                            </span>
                          </span>
                    </el-tree>
                </el-card>
            </el-col>
            <el-col v-show="showDictDetail" :span="13" :offset="1">
                <el-form label-width="80px">
                    <el-form-item label="字典名称" prop="name">
                        <el-input v-model="currentDict.name"></el-input>
                    </el-form-item>
                    <el-form-item label="字典编码">
                        <el-input v-model="currentDict.dictCode"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="currentDict.memos"></el-input>
                    </el-form-item>
                </el-form>
                <el-table
                        :data="tableData"
                        stripe
                        border
                >
                    <el-table-column
                            prop="name"
                            label="字典项名称"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="itemCode"
                            label="字典项编码"
                            width="140">
                    </el-table-column>
                    <el-table-column
                            prop="inputCode"
                            label="输入码"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="memos"
                            label="备注"
                    ></el-table-column>
                </el-table>
            </el-col>
            <el-col v-show="showDictItemDetail" :span="13" :offset="1">
                <el-form label-width="100px">
                    <el-form-item label="字典项名称" prop="name">
                        <el-input v-model="currentDictItem.name"></el-input>
                    </el-form-item>
                    <el-form-item label="字典项编码">
                        <el-input v-model="currentDictItem.itemCode"></el-input>
                    </el-form-item>
                    <el-form-item label="输入码">
                        <el-input v-model="currentDictItem.inputCode" ></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="currentDictItem.memos"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog
                :title="saveTitle"
                :visible.sync="editDialogVisible"
                width="30%">

            <el-form ref="editNodeForm" :rules="formValid"  :model="editNodeForm" label-width="80px">
                <el-form-item label="字典名称" prop="name">
                    <el-input v-model="editNodeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="字典编码">
                    <el-input v-model="editNodeForm.dictCode"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editNodeForm.memos"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" native-type="submit" @click.prevent="updateDict()">确 定</el-button>
                </el-form-item>
            </el-form>
            <!--<span slot="footer" class="dialog-footer">-->
            <!--</span>-->
        </el-dialog>
        <el-dialog
                :title="saveItemTitle"
                :visible.sync="editItemDialogVisible"
                width="30%">

            <el-form ref="editItemNodeForm" :rules="formItemValid"  :model="editItemNodeForm" label-width="100px">
                <el-form-item label="字典项名称" prop="name">
                    <el-input v-model="editItemNodeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="字典项编码">
                    <el-input v-model="editItemNodeForm.itemCode"></el-input>
                </el-form-item>
                <el-form-item label="输入码">
                    <el-input v-model="editItemNodeForm.inputCode" placeholder="用于选择字典项时快速检索"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editItemNodeForm.memos"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="editItemDialogVisible = false">取 消</el-button>
                    <el-button type="primary"  native-type="submit" @click.prevent="updateDictItem">确 定</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>

    </div>
</template>

<script>
  //import TagMessageList from './components/TagMessageList';
  //import BasicTable from './components/BasicTable';
  //import BarChart from './components/BarChart';

  import ElCard from "../../../../node_modules/element-ui/packages/card/src/main.vue";

  export default {
    name: 'Menu',
    components: {
      ElCard
//    TagMessageList,
//    BasicTable,
//    BarChart,
    },
    data(){
      return {
        defaultProps: {
          children: 'items',
          label: 'name'
        },
        data: [],
        newNodeForm:{
          name: '',
          url: '',
        },
        showEdit: false,
        showAdd: false,
        editDialogVisible: false,
        editNodeForm: {},
        saveTitle: '',
        formValid: {
          name: [
            { required: true, message: '字典名不能为空', trigger: 'blur' }
          ],
        },
        editItemDialogVisible: false,
        editItemNodeForm: {},
        saveItemTitle: '',
        formItemValid: {
          name: [
            { required: true, message: '字典项名不能为空', trigger: 'blur' }
          ],
        },
        tableData:[],
        currentDict: {},
        showDictDetail: false,
        showDictItemDetail: false,
        currentDictItem: {},
        expandedKeys: ['0'],
      };
    },
    created (){
//    this.data = [{
//      name: '根目录',
//      id: '0',
//      isLeaf: false,
//    }];
      this.loadData('0');
    },
    mounted (){
      this.$store.commit('GET_ROUTE_NAME', '字典管理');
    },
    methods: {
      handleNodeClick(data, node){
        if(node.level === 2){
          this.showDictDetail = true;
          this.showDictItemDetail = false;
          this.tableData = data.items;
          this.currentDict = data;
        } else if(node.level === 3){
          this.showDictDetail = false;
          this.showDictItemDetail = true;
          this.currentDictItem = data;
        } else {
          this.showDictDetail = false;
          this.showDictItemDetail = false;
        }
      },
      ifShow(node, op) {
        if(node.level === 1){
          return op === 'add';
        } else if(node.level === 2){
          return true;
        } else if(node.level === 3){
          return op !== 'add';
        }
      },
      setExpandedKeys(key){
        this.expandedKeys = ['0'];
        if(key)
          this.expandedKeys.push(key);
      },
      clear(){
        this.editNodeForm = {
          name: '',
          dictCode: '',
          memos: '',
        };
      },
      clearItem(){
        let dictId = this.editItemNodeForm.dictId;
        this.editItemNodeForm = {
          name: '',
          itemCode: '',
          inputCode: '',
          memos: '',
          dictId: dictId,
        };
      },
      handleAdd(data) {
        if(data.id === '0') {
          this.editDialogVisible = true;
          this.saveTitle = '新增字典';
          this.clear();
          this.setExpandedKeys(null);
        } else {
          this.editItemDialogVisible = true;
          this.saveItemTitle = '新增字典项';
          this.clearItem();
          this.editItemNodeForm.dictId = data.id;
          this.setExpandedKeys(data.id);
        }

      },
      handleEdit(node, data) {
        if(node.level === 2) {
          this.editDialogVisible = true;
          this.saveTitle = '编辑字典';
          this.editNodeForm = data;
          this.setExpandedKeys(data.id);
        } else if(node.level === 3){
          this.editItemDialogVisible = true;
          this.saveItemTitle = '编辑字典项';
          this.editItemNodeForm = data;
          this.setExpandedKeys(node.parent.data.id);
        }
      },
      handleRemove(node, data) {
        if(node.level === 2) {
          this.$confirm('确认删除该字典吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.setExpandedKeys(null);
            this.$axios.delete('/api/dict/' + data.id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.loadData();
            });
          });
        } else if(node.level === 3) {
          this.$confirm('确认删除该字典项吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.setExpandedKeys(node.parent.data.id);
            this.$axios.delete('/api/dictItem/' + data.id).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.loadData();
            });
          });
        }
      },

      allowDrag(node) {
        if(node.data.id === '0'){
          return false;
        }
        return true;
      },
      allowDrop(drag, drop, type) {
        if(type === 'inner' || drop.level !== drag.level ||
          (drop.level === 3 && drop.data.dictId !== drag.data.dictId)){
          return false;
        }
        return true;
      },
      dropNode(dragNode, dropNode, pos) {
        let data = {id: dragNode.data.id, dropId: dropNode.data.id, pos: pos};

        if(dragNode.level === 2) {
          this.$axios.post('/api/dict/move', data).then(res => {
            this.$message({
              type: 'success',
              message: '菜单顺序更改成功!'
            });
          });
        }else if(dragNode.level === 3){
          this.$axios.post('/api/dictItem/move', data).then(res => {
            this.$message({
              type: 'success',
              message: '菜单顺序更改成功!'
            });
          });
        }
      },

      loadData() {
        this.$axios.get('/api/dict' ).then(res => {
          this.data = [{
            id: '0',
            name: '根节点',
            items: res.data
          }];
        });
      },

      updateDict() {
        this.$refs['editNodeForm'].validate((valid) => {
          if (valid) {
            if (this.editNodeForm.id) {//更新
              this.$axios.put('/api/dict/' + this.editNodeForm.id, this.editNodeForm).then(
                res => {
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  });
                  this.editDialogVisible = false;
                  this.clear();
                  this.loadData();
                },
                err => {
                  this.$message({
                    type: 'error',
                    message: err.message
                  });
                }
              );

            } else { // 创建
              this.$axios.post('/api/dict', this.editNodeForm).then(
                res => {
                  this.$message({
                    type: 'success',
                    message: '新增字典成功!'
                  });
                  this.clear();
                  this.loadData();
                },
                err => {
                  this.$message({
                    type: 'error',
                    message: err.message
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
      updateDictItem() {
        this.$refs['editItemNodeForm'].validate((valid) => {
          if (valid) {
            if (this.editItemNodeForm.id) {//更新
              this.$axios.put('/api/dictItem/' + this.editItemNodeForm.id, this.editItemNodeForm).then(
                res => {
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  });
                  this.editItemDialogVisible = false;
                  this.clearItem();
//                  this.loadData();
                },
                err => {
                  this.$message({
                    type: 'error',
                    message: err.message
                  });
                }
              );

            } else { // 创建
              this.$axios.post('/api/dictItem', this.editItemNodeForm).then(
                res => {
                  this.$message({
                    type: 'success',
                    message: '新增字典成功!'
                  });
                  this.clearItem();
                  this.loadData();
                },
                err => {
                  this.$message({
                    type: 'error',
                    message: err.message
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
    }
  };
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>