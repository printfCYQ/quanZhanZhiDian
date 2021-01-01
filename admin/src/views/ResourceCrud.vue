<template>
  <div>
    <avue-crud
      :data="data.data"
      :page="page"
      :option="option"
      @row-save="create"
      @row-del="remove"
      @row-update="update"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
      v-model="form"
      :upload-before="uploadBefore"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!: string;

  data: any = {}; //表格数据

  option: any = {}; //表头数据

  form = {
    cover: "",
    file: "",
  };

  page: any = {
    pageSize: 5,
    pageSizes: [5, 10, 20],
    total: 0,
  }; //分页数据

  query: any = {
    page: 1,
    limit: 5,
  }; //分页请求数据

  mounted() {
    this.fetchOption();
  }

  created() {
    this.fetch();
  }

  // 获取表头数据
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
  }

  // 获取表格数据
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query,
      },
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }

  // 新建
  async create(row, done) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("新建成功");
    this.fetch();
    done();
  }

  // 编辑
  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }

  // 删除
  async remove(row) {
    try {
      await this.$confirm("是否确认删除");
    } catch (error) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }

  // 跳页
  changePage({ pageSize, currentPage }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }

  // 排序
  changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1,
      };
    }
    this.fetch();
  }

  // 搜索
  search(where, done) {
    // 循环判断是否模糊搜索
    for (let i in where) {
      const filed = this.option.column.find((v) => v.prop === i);
      if (filed.regex) {
        where[i] = { $regex: where[i] };
      }
    }
    this.query.where = where;
    done();
    this.fetch();
  }

  // 上传
  async uploadBefore(file, done) {
    let params = new FormData();
    params.append("file", file);
    let res: any = await this.$http.post("upload", params, {
      headers: { "Content-Type": "multipart/form-data;charset=UTF-8" },
    });
    console.log(res);
    this.form.cover = res.data.url;
    this.form.file = res.data.url;
    done();
  }
}
</script>
