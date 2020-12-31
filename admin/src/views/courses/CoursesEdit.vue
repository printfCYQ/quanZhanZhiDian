<template>
  <div>
    <h3>{{ id ? "编辑" : "新建" }}课程</h3>
    <ele-form
      v-model="data"
      :form-desc="fields"
      :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  @Prop(String) id!: string;
  data = {};
  fields = {
    name: { label: "课程名称", type: "input" },
    cover: { label: "课程封面", type: "input" },
  };

  created() {
    this.id && this.fetch();
  }

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }

  async submit(data) {
    const url = this.id ? `courses/${this.id}` : "courses";
    const method = this.id ? "put" : "post";
    const res = await this.$http[method](url, data);
    if (res) {
      this.$message.success("保存成功");
      this.data = {};
      this.$router.go(-1);
    } else {
      this.$message.error("保存失败");
    }
  }
}
</script>
