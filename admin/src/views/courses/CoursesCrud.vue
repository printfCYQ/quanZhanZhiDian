<template>
  <div>
    <avue-crud
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-del="remove"
      @row-update="update"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  data = {};

  option = {
    title: "课程管理",
    column: [
      { prop: "name", label: "课程名称" },
      { prop: "cover", label: "课程封面" },
    ],
  };

    created() {
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  // 新建
  async create(row, done) {
    await this.$http.post("courses", row);
    this.$message.success("新建成功");
    this.fetch();
    done();
  }

  // 编辑
  async update(row, index, done) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index
    await this.$http.put(`courses/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }
  async remove(row) {
    try {
      await this.$confirm("是否确认删除");
    } catch (error) {
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success("删除成功");
    this.fetch();
  }


}
</script>
