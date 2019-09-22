<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column width="600px" label="标题" prop="title"></el-table-column>
      <el-table-column
        :formatter="stateFormatter"
        align="center"
        label="评论状态"
        prop="comment_status"
      ></el-table-column>
      <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            :style="{color: obj.row.comment_status ? '#E6A23C' : '#409EFF' }"
            @click="closeOrOpen(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status ? "关闭评论" : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @current-change="changePage"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总条数
        currentPage: 1, // 默认第一页
        pageSize: 10 // 每页多少条
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论?`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
