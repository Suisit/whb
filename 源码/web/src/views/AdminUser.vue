<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template
      v-for="col in ['id', 'username', 'realname','role']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record._id, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record._id)">保存</a>
          <a-popconfirm
            title="Sure to cancel?"
            @confirm="() => cancel(record._id)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record._id)"
            >编辑</a
          >
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "id",
    dataIndex: "id",
    width: "25%",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "用户名",
    dataIndex: "username",
    width: "15%",
    scopedSlots: { customRender: "username" },
  },
  {
    title: "真实姓名",
    dataIndex: "realname",
    width: "40%",
    scopedSlots: { customRender: "realname" },
  },
  {
    title: "权限",
    dataIndex: "role",
    scopedSlots: { customRender: "role" },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  created() {
    this.fetch();
  },
  data() {
     
    return {
      cacheData:'',
      data:'',
      columns,
      editingKey: "",
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("users/allUsers");
      this.data = res.data;
      this.cacheData=this.data.map(item => ({ ...item }));
      console.log(this.data);
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item._id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item._id)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    async save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item._id)[0];
      const targetCache = newCacheData.filter((item) => key === item._id)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        await this.$http.put(`users/${target._id}`,target);
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    async cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item._id)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item._id)[0]
        );
        await this.$http.delete(`users/${target._id}`,target);
        await this.$http.delete(`add-course`,{
          params:{
            query:{
              where:{
                user:target._id,
              }
            }
          }
        });
        delete target.editable;
        this.data = newData;
        this.fetch()
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
