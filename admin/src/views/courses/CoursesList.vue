<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button type="primary" size="small" @click="add">新建课程</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      >
      </el-table-column>
      <el-table-column label="操作" :width="200">
        <template v-slot="{ row }">
          <el-button type="success" size="small" @click="edit(row)"
            >编辑</el-button
          >
          <el-button type="warning" size="small" @click="remove(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CoursesList extends Vue {
  data = {};
  fields = {
    _id: { label: "ID" },
    name: { label: "课程名称" },
    cover: { label: "课程封面" },
  };

  created() {
    this.fetch();
  }

  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }

  add() {
    this.$router.push(`/courses/create`);
  }

  edit(row) {
    this.$router.push(`/courses/edit/${row._id}`);
  }
  async remove(row) {
    try {
      await this.$confirm("是否确认删除");
    } catch (error) {
      return;
    }
    const res = await this.$http.delete(`courses/${row._id}`);
    if (res) {
      this.$message.success("删除成功");
      this.fetch();
    } else {
      this.$message.error("删除失败");
    }
  }
}
</script>
