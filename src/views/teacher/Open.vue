<template>
  <div class="student">
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'time'">
          <span> {{ record?.time?.map((e) => e?.value).join("、") }}</span>
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
  unref,
} from "vue";
import { queryCourseList, saveCourse, deleteCourse } from "@/api/course";
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
    const store = useStore()

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
        title: "上课时间",
        dataIndex: "time",
        key: "time",
      },
      {
        title: "上课地点",
        dataIndex: "place",
        key: "place",
      },
    ];

    const dataSource = ref([]);

    // 列表查询
    const queryCourse = () => {
      queryCourseList({ teacherId: store.state.teacherId })
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
    };
  },
});
</script>

