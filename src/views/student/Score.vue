<template>
  <a-table :dataSource="checkednData" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'teacherName'">
        <span> {{ record?.Teacher?.name }}</span>
      </template>
      <template v-if="column.key === 'result'">
        <span> {{ record?.Students?.[0]?.StudentCourse?.result || '未出成绩' }}</span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { queryCourseList, saveCourse, deleteCourse } from "@/api/courseStudent";
import type { FormInstance } from "ant-design-vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { useStore } from 'vuex'

interface Time {
  id: number;
  value: string;
}

interface FormState {
  name: string;
  time: Time[];
  place: string;
  code: number | undefined;
}

export default defineComponent({
  components: {
    MinusCircleOutlined,
    PlusOutlined,
  },
  setup() {
    const columns = [
      {
        title: "课程编码",
        key: "code",
        dataIndex: "code",
      },
      {
        title: "课程",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "教师",
        key: "teacherName",
        dataIndex: "teacherName",
      },
      {
        title: "成绩",
        key: "result",
        dataIndex: "result",
      },
    ];

    const dataSource = ref<any[]>([]);

    const store = useStore()

    // 列表查询
    const queryCourse = () => {
      queryCourseList({ studentId: store.state.studentId })
        .then((res) => {
          if (res) dataSource.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      queryCourse();
    });


    const checkednData = computed(() => {
      return dataSource.value?.filter((e) => e?.Students?.length !== 0);
    });

    return {
      checkednData,
      columns,
    };
  },
});
</script>


