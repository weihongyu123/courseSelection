<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="课程选择">
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <span>
              <a @click="onUpdate(record)">选课</a>
            </span>
          </template>
          <template v-else-if="column.key === 'time'">
            <span> {{ record?.time?.map((e) => e?.value).join("、") }}</span>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="已选择课程" force-render>
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <span>
              <a @click="onUpdate(record)">退课</a>
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
import {
  defineComponent,
  onMounted,
  ref,
} from "vue";
import { queryCourseList, saveCourse, deleteCourse } from "@/api/course";
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
        title: "操作",
        key: "action",
      },
    ];

    const onUpdate = (row: FormState) => {
    
    };

    const onDelete = (row: any) => {
    
    };

    const dataSource = ref([]);

    // 列表查询
    const queryCourse = () => {
      queryCourseList({})
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

    return {
      dataSource,
      columns,
      onUpdate,
      onDelete,
    };
  },
});
</script>


