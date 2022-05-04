<template>
  <div class="student">
    <a-space>
      <a-button type="primary" @click="showModal">添加</a-button>
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
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="新增" @ok="handleOk">
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="姓名">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model:value="formState.gender">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="0">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="年龄">
          <a-input v-model:value="formState.age" />
        </a-form-item>
        <a-form-item label="教工号">
          <a-input v-model:value="formState.code" />
        </a-form-item>
        <a-form-item label="职称">
          <a-input v-model:value="formState.title" />
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
} from "vue";
import { queryTeacherList, saveTeacher, deleteTeacher } from "@/api/teacher";
import type { FormInstance } from "ant-design-vue";
interface FormState {
  name: string;
  age: number | undefined;
  code: number | undefined;
  gender: number;
  title: string;
}

export default defineComponent({
  components: {},
  setup() {
    const columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "教工号",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "职称",
        key: "title",
        dataIndex: "title",
      },
      {
        title: "操作",
        key: "action",
      },
    ];

    const formState = ref<FormState>({
      name: "",
      age: undefined,
      code: undefined,
      gender: 0,
      title: "",
    });

    const onUpdate = (row: FormState) => {
      formState.value = row;
      visible.value = true;
    };

    const onDelete = (row: any) => {
      deleteTeacher(row)
        .then((res) => {
          if (res) queryTeacher();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
      formState.value = {
        name: "",
        age: undefined,
        code: undefined,
        gender: 0,
        title: "",
      };
    };

    const handleOk = (e: MouseEvent) => {
      visible.value = false;

      saveTeacher(formState.value)
        .then((res) => {
          if (res) queryTeacher();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const dataSource = ref([]);

    const queryTeacher = () => {
      queryTeacherList({})
        .then((res) => {
          if (res) dataSource.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
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
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>
