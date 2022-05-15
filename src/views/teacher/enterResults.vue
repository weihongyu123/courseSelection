<template>
  <div class="student">
    <a-space>
      <a-button
        type="primary"
        @click="onSaveUpdate"
        :disabled="changeRow.size === 0"
        >保存成绩</a-button
      >
    </a-space>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a-input
              v-model:value="record.result"
              @change="() => rowChange(record)"
            />
          </span>
        </template>
        <template v-else-if="column.key === 'studentCode'">
          <span> {{ record?.Student.code }}</span>
        </template>
        <template v-else-if="column.key === 'studentName'">
          <span> {{ record?.Student.name }}</span>
        </template>
        <template v-else-if="column.key === 'courseCode'">
          <span> {{ record?.Course.code }}</span>
        </template>
        <template v-else-if="column.key === 'courseName'">
          <span> {{ record?.Course.name }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  UnwrapRef,
  Ref,
  toRefs,
} from "vue";

import { queryResultList, bunchUpdate } from "@/api/courseStudent";
import { message } from "ant-design-vue";
interface TableRow {
  Course: any;
  Student: any;
  id: number;
  result: number;
}

export default defineComponent({
  components: {},
  setup() {
    const columns = [
      {
        title: "学号",
        dataIndex: "studentCode",
        key: "studentCode",
      },
      {
        title: "姓名",
        dataIndex: "studentName",
        key: "studentName",
      },
      {
        title: "课程号",
        key: "courseCode",
        dataIndex: "courseCode",
      },
      {
        title: "课程名",
        key: "courseName",
        dataIndex: "courseName",
      },
      {
        title: "成绩",
        key: "action",
        dataIndex: "action",
      },
    ];

    const dataSource = ref<TableRow[]>([]);

    const changeRow = ref(new Set());

    const onSaveUpdate = () => {
      const params = dataSource.value
        ?.filter((e) => changeRow.value.has(e.id))
        .map((e: TableRow) => ({
          id: e.id,
          result: e.result,
        }));

      bunchUpdate({ params: JSON.stringify(params) })
        .then((res) => {
          if (res) queryStudent();
          message.info("提交成功");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const queryStudent = () => {
      queryResultList({ teacherId: 2 })
        .then((res) => {
          if (res) dataSource.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      queryStudent();
    });

    const rowChange = (e: TableRow) => {
      changeRow.value.add(e.id);
    };

    return {
      dataSource,
      columns,
      onSaveUpdate,
      rowChange,
      changeRow,
    };
  },
});
</script>
