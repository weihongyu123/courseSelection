<template>
  <div class="student">
    <a-form :model="formState" @finish="onFinish" :label-col="labelCol" :wrapper-col="wrapperCol">
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
        <a-input-number v-model:value="formState.age" :min="0" :max="200" />
      </a-form-item>
      <a-form-item label="学号">
        <a-input v-model:value="formState.code" disabled={true} />
      </a-form-item>
      <a-form-item label="专业">
        <a-input v-model:value="formState.major" />
      </a-form-item>

      <a-form-item label="手机号">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item label="身份证号">
        <a-input v-model:value="formState.identityNumber" />
      </a-form-item>
      <a-form-item label="地址">
        <a-input v-model:value="formState.address" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
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
import { queryOne, saveStudent } from "@/api/student";
import type { FormInstance } from "ant-design-vue";
import { useStore } from 'vuex'
import { message } from 'ant-design-vue';
interface FormState {
  name: string;
  age: number | undefined;
  code: number | undefined;
  gender: number;
  major: string;
  phone: string;
  identityNumber: string;
  address: string;
}

export default defineComponent({
  components: {},
  setup() {
    const formState = ref<FormState>({
      name: "",
      age: undefined,
      code: undefined,
      gender: 0,
      major: "",
      phone: "",
      identityNumber: "",
      address: ""
    });

    const store = useStore()

    const onUpdate = (row: FormState) => {
      formState.value = row;
    };

    const onFinish = () => {
      saveStudent(formState.value)
        .then((res) => {
          if (res) queryStudent();
          message.info('提交成功');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const dataSource = ref([]);

    const queryStudent = () => {
      queryOne({ id: store.state.studentId })
        .then((res) => {
          if (res) formState.value = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      queryStudent();
    });

    return {
      dataSource,
      formState,
      onFinish,
      onUpdate,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>
