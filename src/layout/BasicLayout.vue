<template>
    <a-layout class="layout">
        <a-layout-header>
            <div class="logo" />
        </a-layout-header>

        <a-layout>
            <a-layout-sider width="200" style="background: #fff">
                <a-menu v-model:selectedKeys="selectedKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">
                    <router-link v-for="item in routes[0].children" :key="item.path" :to="item.path">
                        <a-menu-item :key="item.path">
                            <span> {{ item.name }}</span>
                        </a-menu-item>
                    </router-link>
                </a-menu>
            </a-layout-sider>
            <a-layout style="padding: 0 24px 24px">
                <a-layout-content :style="{
                    background: '#fff',
                    padding: '24px',
                    margin: 0,
                    minHeight: '280px',
                }">
                    <router-view />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { routes } from "../router";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'


export default defineComponent({
    setup() {
        
        const store = useStore();
        const router = useRouter()
        const route = useRoute()

        let selectedKeys = ref<string[]>([""]);

        return {
            selectedKeys,
            routes: computed(() => store.state.menus),
        };
    },
});
</script>


<style>
.site-layout-content {
    min-height: 280px;
    padding: 24px;
    background: #fff;
}

.logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl .logo {
    float: right;
    margin: 16px 0 16px 24px;
}

[data-theme="dark"] .site-layout-content {
    background: #141414;
}
</style>