<template>
  <div class="student">
    <a-table :dataSource="data" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
import { queryStudentList } from "@/api/student";
// import HelloWorld from '@/components/HelloWorld.vue';

const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Action",
    key: "action",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default defineComponent({
  components: {},
  setup() {
    const studentList = reactive([]);
    onMounted(() => {
      queryStudentList({}).then((res) => {
        if (res?.code === "200") {
          studentList === res.data;
        }
      });
      console.log("mounted!");
    });
    return {
      data,
      columns,
    };
  },
});
</script>
