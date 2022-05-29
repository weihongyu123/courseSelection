<template>
  <div class="student">
    <a-space>
      <a-button type="primary" @click="showModal">添加</a-button>


      <a-form layout="inline" :model="formParams" @finish="handleSearch">
        <a-form-item>
          <a-input v-model:value="formParams.name" placeholder="教师名称">
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-space>
    <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">

        <template v-if="column.key === 'action'">
          <span>
            <a @click="onUpdate(record)">修改</a>
            <a-divider type="vertical" />
            <a @click="onDelete(record)">删除</a>
          </span>
        </template>
        <template v-else-if="column.key === 'time'">
          <span> {{ record?.time?.map((e) => e?.value).join("、") }}</span>
        </template>
        <template v-else-if="column.key === 'teacherName'">
          <span> {{ record?.Teacher?.name || '未指派教师' }}</span>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="新增" @ok="handleOk">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="课程">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="上课时间">
          <a-space v-for="(t, index) in formState.time" :key="t.id" style="display: flex; margin-bottom: 8px"
            align="baseline">
            <a-form-item :name="['time', index, 'value']">
              <a-input v-model:value="t.value" />
            </a-form-item>
            <MinusCircleOutlined @click="removeTime(t)" />
          </a-space>
          <a-form-item>
            <a-button type="dashed" block @click="addTime">
              <PlusOutlined />
              添加 上课时间
            </a-button>
          </a-form-item>
        </a-form-item>

        <a-form-item label="上课地点">
          <a-input v-model:value="formState.place" />
        </a-form-item>
        <a-form-item label="课程编码">
          <a-input v-model:value="formState.code" />
        </a-form-item>

        <a-form-item label="任课老师">
          <a-select v-model:value="formState.teacherId" :options="options"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
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
import { queryTeacherList } from "@/api/teacher";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import type { SelectProps } from "ant-design-vue";
interface Time {
  id: number;
  value: string;
}

interface FormState {
  name: string;
  time: Time[];
  place: string;
  code: number | undefined;
  teacherId: number | undefined;
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
        title: "教师名称",
        key: "teacherName",
        dataIndex: "teacherName",
      },
      {
        title: "操作",
        key: "action",
      },
    ];

    // 添加form
    const formState = ref<FormState>({
      name: "",
      time: [],
      place: "",
      code: undefined,
      teacherId: undefined,
    });


    // 搜索form
    const formParams = ref({
      name: ""
    });

    const handleSearch = () => {

      const params = {}

      for (const [key, value] of Object.entries(formParams.value)) {
        if (value !== '' && value !== null && value !== undefined) {
          params[key] = value
        }
      }

      queryCourse(params)
    }

    const onUpdate = (row: FormState) => {
      formState.value = row;
      visible.value = true;
    };

    const onDelete = (row: any) => {
      deleteCourse(row)
        .then((res) => {
          if (res) queryCourse();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 上课时间节点
    const removeTime = (item: Time) => {
      let index = formState.value.time.indexOf(item);
      if (index !== -1) {
        formState.value.time.splice(index, 1);
      }
    };
    const addTime = () => {
      formState.value.time.push({
        value: "",
        id: Date.now(),
      });
    };

    const visible = ref<boolean>(false);

    // 打开对话框
    const showModal = () => {
      visible.value = true;
      formState.value = {
        name: "",
        time: [],
        place: "",
        code: undefined,
        teacherId: undefined,
      };
    };

    // 新增 or 修改
    const handleOk = (e: MouseEvent) => {
      visible.value = false;

      const params: any = formState.value;
      params.time = JSON.stringify(formState.value.time);
      params.TeacherId = params.teacherId


      saveCourse(params)
        .then((res) => {
          if (res) queryCourse();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const dataSource = ref([]);

    // 列表查询
    const queryCourse = (params?: any) => {
      queryCourseList(params || {})
        .then((res) => {
          if (res) dataSource.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const options = ref<SelectProps["options"]>([]);

    const queryTeacher = () => {
      queryTeacherList({})
        .then((res) => {
          if (res)
            options.value = res.data.map((e: any) => ({
              label: e.name,
              value: e.id,
            }));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      queryCourse();
      queryTeacher();
    });

    return {
      dataSource,
      columns,
      visible,
      formState,
      showModal,
      handleOk,
      onUpdate,
      onDelete,
      removeTime,
      addTime,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      options,
      formParams,
      handleSearch,
    };
  },
});
</script>

