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
            <a-divider type="vertical" />
            <a @click="onUpdatePassword(record)">重置密码</a>
          </span>
        </template>
        <template v-else-if="column.key === 'gender'">
          <span>
            {{ record.gender === 1 ? '男' : '女' }}
          </span>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="新增" @ok="handleOk">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
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
        <a-form-item label="学号">
          <a-input v-model:value="formState.code" :disabled="disabledCode" />
        </a-form-item>
        <a-form-item label="专业">
          <a-input v-model:value="formState.major" />
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
import { queryStudentList, saveStudent, deleteStudent } from "@/api/student";
import type { FormInstance } from "ant-design-vue";
import { updatePassword } from '@/api/user'
import { message } from 'ant-design-vue';
interface FormState {
  name: string;
  age: number | undefined;
  code: number | undefined;
  gender: number;
  major: string;
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
        title: "学号",
        dataIndex: "code",
        key: "code",
      },
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "专业",
        key: "major",
        dataIndex: "major",
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
      major: "",
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

      queryStudent(params)
    }

    const onUpdate = (row: FormState) => {
      formState.value = row;
      visible.value = true;
      disabledCode.value = true;
    };

    const onDelete = (row: any) => {
      deleteStudent(row)
        .then((res) => {
          if (res) queryStudent();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const visible = ref<boolean>(false);
    const disabledCode = ref<boolean>(false);


    const showModal = () => {
      visible.value = true;
      disabledCode.value = false;
      formState.value = {
        name: "",
        age: undefined,
        code: undefined,
        gender: 0,
        major: "",
      };
    };

    const handleOk = (e: MouseEvent) => {
      visible.value = false;

      saveStudent(formState.value)
        .then((res) => {
          if (res) queryStudent();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const dataSource = ref([]);

    const queryStudent = (params?: any) => {
      queryStudentList(params || {})
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


    const onUpdatePassword = (row: FormState) => {
      updatePassword({ password: '123456', userName: row.code }).then(res => {
        message.info('修改成功');
      })
    }

    return {
      dataSource,
      columns,
      visible,
      formState,
      showModal,
      handleOk,
      onUpdate,
      onDelete,
      disabledCode,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      onUpdatePassword,
      formParams,
      handleSearch,
    };
  },
});
</script>
