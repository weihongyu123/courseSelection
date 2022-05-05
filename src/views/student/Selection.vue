<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="课程选择">
      <a-table :dataSource="uncheckednData" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <span>
              <a @click="onChecked(record)">选课</a>
            </span>
          </template>
          <template v-else-if="column.key === 'time'">
            <span> {{ record?.time?.map((e) => e?.value).join("、") }}</span>
          </template>
          <template v-else-if="column.key === 'teacherName'">
            <span> {{ record?.Teacher?.name }}</span>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="已选择课程" force-render>
      <a-table :dataSource="checkednData" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <span>
              <a @click="onUnchecked(record)">退课</a>
            </span>
          </template>
          <template v-else-if="column.key === 'time'">
            <span> {{ record?.time?.map((e) => e?.value).join("、") }}</span>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
  </a-tabs>
</template>



<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { queryCourseList, saveCourse, deleteCourse } from "@/api/courseStudent";
import type { FormInstance } from "ant-design-vue";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

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
        title: "课程",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "上课时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "上课地点",
        dataIndex: "place",
        key: "place",
      },
      {
        title: "课程编码",
        key: "code",
        dataIndex: "code",
      },
      {
        title: "教师",
        key: "teacherName",
        dataIndex: "teacherName",
      },
      {
        title: "操作",
        key: "action",
      },
    ];

    const onChecked = (row: any) => {
      saveCourse({
        courseId: row?.id,
        studentId: 12,
      })
        .then((res) => {
          queryCourse();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const onUnchecked = (row: any) => {
      deleteCourse({
        id: row?.StudentCourses?.[0]?.id,
      })
        .then((res) => {
          queryCourse();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const dataSource = ref<any[]>([]);

    // 列表查询
    const queryCourse = () => {
      queryCourseList({ studentId: 12 })
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
      return dataSource.value?.filter((e) => e?.StudentCourses?.length > 0);
    });

    const uncheckednData = computed(() => {
      return dataSource.value?.filter((e) => e?.StudentCourses?.length === 0);
    });

    return {
      checkednData,
      uncheckednData,
      columns,
      onChecked,
      onUnchecked,
    };
  },
});
</script>


