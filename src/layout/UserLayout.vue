<template>
    <div class="loginBack">

        <a-form class="loginForm" :model="formState" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }"
            autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item name="userName" :rules="[{ required: true, message: 'Please input your userName!' }]">
                <a-input v-model:value="formState.userName" placeholder="学号/工号" />
            </a-form-item>
            <a-form-item name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password" placeholder="密码" />
            </a-form-item>

            <a-space style="marginTop:60px">
                <a-form-item>
                    <a-button type="primary" html-type="submit">登录</a-button>
                </a-form-item>
            </a-space>

        </a-form>
    </div>

</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { login } from "@/api/user";
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'



interface FormState {
    userName: string;
    password: string;
    remember: boolean;
}
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter()
        const route = useRoute()

        const formState = reactive<FormState>({
            userName: '',
            password: '',
            remember: true,
        });

        const onFinish = (values: any) => {
            store.dispatch('login', values).then(() => {
                console.log(1233)
                router.push({ path: '/' });
            }).catch(() => {

            });
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        return {
            formState,
            onFinish,
            onFinishFailed,
        };
    },
});
</script>



<style lang="scss" scoped>
.loginBack {
    width: 100%;
    height: 100vh;
    background: #009688;
}

.loginForm {
    position: fixed;
    right: 200px;
    width: 600px;
    border: 1px solid #fff;
    padding: 32px;
    border-radius: 8px;
    top: 20%;
}
</style>>

