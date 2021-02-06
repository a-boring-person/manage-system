<template>
  <div calss="userlist">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-form :model="form" label-width="80px" inline="true" size="normal">
        <el-form-item label="用户名称">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-select v-model="form.juese" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
          <el-button @click="clear()">清除</el-button>
          <el-button type="primary" size="default" @click="addUsre"
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-table :data="userInfo" border stripe>
        <el-table-column prop="uid" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="option" label="操作" min-width="170">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              @click="changeStatus(scope.$index, scope.row)"
              :type="scope.row.status == '禁止' ? 'success' : 'info'"
              >{{ scope.row.status == "禁止" ? "启用" : "禁止" }}</el-button
            >

            <el-button @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- card body -->
    </el-card>

    <el-dialog
      title="新增用户"
      :visible.sync="dialogAddgsVisible"
      @close="closeDialogAddgsVisible"
    >
      <el-form :model="addForm" label-width="80px" inline="true" size="normal">
        <el-form-item label="用户名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮件">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addForm.status">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁止" value="禁止"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addForm.role" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddgsVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddForm()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="编辑用户"
      :visible.sync="isVisible"
      @close="closeDialogAddgsVisible"
    >
      <el-form :model="editform" label-width="80px" inline="true" size="normal">
        <el-form-item label="用户名">
          <el-input v-model="editform.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editform.tel"></el-input>
        </el-form-item>
        <el-form-item label="邮件">
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editform.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editform.status">
            <el-option label="启用" value="启用"></el-option>
            <el-option label="禁止" value="禁止"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editform.role" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="老师" value="老师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
        <el-button type="primary" @click="editForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api, { getUserList, finduser, addUser, editUser } from "../api";
import axios from "axios";
export default {
  data() {
    return {
      form: {
        realname: "",
        email: "",
        juese: "",
      },
      userInfo: [],
      dialogAddgsVisible: false,
      addForm: {
        username: "",
        tel: "",
        email: "",
        remark: "",
        status: "",
        role: "",
      },
      isVisible: false,
      editform: {},
      index: 0,
    };
  },

  async created() {
    let res = await axios.get(getUserList);
    console.log(res);
    this.userInfo = res.data.userinfo;
  },
  methods: {
    search: async function() {
      let res = await axios.post(finduser, { form: this.form });
      console.log(res.data);
      let user = res.data.user;
      this.userInfo = user;
    },
    clear: async function() {
      let res = await axios.get(getUserList);
      console.log(res);
      this.userInfo = res.data.userinfo;
      this.form = [];
    },
    addUsre: async function() {
      this.dialogAddgsVisible = true;
      console.log(123);
    },
    saveAddForm: async function() {
      let message = axios.post(addUser, {
        userform: this.addForm,
      });
      if (message) {
        this.dialogAddgsVisible = false;
      }
    },
    handleEdit: function(index, row) {
      console.log(index);
      //如果直接赋值，那么修改editform数组，表格里的原数组也会跟着变化，所以应该先将对象化为数组，然后再解析成对象
      this.editform = JSON.parse(JSON.stringify(row));
      this.isVisible = true;
      this.index = row.uid;
    },
    editForm: async function() {
      let message = axios.post(editUser, {
        userform: this.editform,
        index: this.index,
      });
      if (message) {
        this.userInfo[this.index] = this.editform;
        this.isVisible = false;
      }
    },
    handleDelete: function(index) {
      axios.post(api.deleteUser, {
        uid: index,
      });
      this.userInfo.splice(index, 1);
    },
    changeStatus: async function(index, row) {
      console.log(index);
      let res = await axios.post(api.changeStatus, {
        uid: row.uid,
        status: row.status,
      });
      let status = res.data.status;
      this.userInfo[index].status = status;
    },
  },
};
</script>
