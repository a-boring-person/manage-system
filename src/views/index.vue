<template>
  <div class="index">
    <el-row :gutter="20">
      <el-col :span="8" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span class="header">
              <i class="el-icon-s-help"></i><span> 快捷方式</span></span
            >
          </div>
          <!-- card body -->
          <div class="body">
            <div class="line1">
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
            </div>
            <div class="line2">
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span class="header">
              <i class="el-icon-s-help"></i><span>待办事项</span></span
            >
          </div>
          <!-- card body -->
          <div class="daiban">
            <ul>
              <li><span>待审评论</span><span class="num">66</span></li>
              <li><span>待审评论</span><span class="num">66</span></li>
            </ul>
            <ul>
              <li><span>待审评论</span><span class="num">66</span></li>
              <li><span>待审评论</span><span class="num">66</span></li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span class="header">
              <i class="el-icon-s-help"></i><span> 快捷方式</span></span
            >
          </div>
          <!-- card body -->
          <div class="body">
            <div class="line1">
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
            </div>
            <div class="line2">
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
              <div class="item">
                <a href="">
                  <span
                    ><i class="el-icon-tickets fa-2x" style="font-size:25px"></i
                  ></span>
                  <p>发表文章</p>
                </a>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="table">
      <el-col :span="24" :offset="0">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="uid" label="uid" width="180">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="180">
          </el-table-column>
          <el-table-column prop="password" label="密码" width="180">
          </el-table-column>
          <el-table-column prop="realname" label="真实姓名" width="180">
          </el-table-column>
          <el-table-column prop="competence" label="权限" width="180">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
import api from '../api'
export default {
  data() {
    return {
      tableData: [],
    };
  },
  async mounted() {
      let res = await axios.get(api.getUserInfo);
      console.log(res);
      this.tableData = res.data.userlist;
  },
};
</script>

<style lang="less" scoped>
.header {
  float: left;
}
.body {
  .line1 {
    display: flex;
    justify-content: space-between;
    .item {
      a {
        text-decoration: none;
      }
    }
    margin-bottom: 10px;
  }
  .line2 {
    display: flex;
    justify-content: space-between;
    .item {
      a {
        text-decoration: none;
      }
    }
  }
}
.daiban {
  ul {
    list-style: none;
    display: flex;
    li {
      flex: 1;
      span {
        display: block;
      }
      .num {
        line-height: 38px;
        color: blue;
        font-size: 37px;
      }
    }
  }
}
.table {
    margin-top: 20px;
}
</style>
