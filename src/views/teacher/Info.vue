<template>
  <div class="teacher">
    <a-form :model="formState" @finish="onFinish">
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
      <a-form-item label="工号">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item label="职称">
        <a-input v-model:value="formState.title" />
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
import { queryOne, saveTeacher } from "@/api/teacher";
import type { FormInstance } from "ant-design-vue";
import { message } from 'ant-design-vue';
import { useStore } from 'vuex'

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
    const formState = ref<FormState>({
      name: "",
      age: undefined,
      code: undefined,
      gender: 0,
      title: "",
    });


    const store = useStore()
    const onUpdate = (row: FormState) => {
      formState.value = row;
    };

    const onFinish = () => {
      saveTeacher(formState.value)
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
      queryOne({ id: store.state.teacherId })
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
    };
  },
});
</script>
