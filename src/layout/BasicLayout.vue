<template>
    <a-layout class="layout">
        <a-layout-header>
            <div class="logo" />

            <!-- 头部tab -->
            <a-menu v-model:selectedKeys="selectedTab" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <router-link v-for="route in routes[0]?.children" :to="route.path" :key="route.path">
                    <a-menu-item :key="route.path">{{ route.name }}</a-menu-item>
                </router-link>
            </a-menu>
        </a-layout-header>

        <router-view />
    </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { routes } from "../router";
import { RouteRecordRaw, useRoute } from "vue-router";

export default defineComponent({
    setup() {
        let selectedTab = ref<string[]>([""]);
        let selectedKeys = ref<string[]>([""]);
        const route = useRoute();

        // let menuSider = ref<RouteRecordRaw[]>([]);

        watch(route, (route) => {
            // selectedKeys.value = [route.path];
            selectedTab.value = [`/${route.path.split("/")?.[1]}`];
        });

        // watch(selectedTab, (selectedTab, prev) => {
        //   menuSider.value =
        //     routes.find((e) => e.path === selectedTab[0])?.children || [];
        // });

        return {
            selectedTab,
            routes,
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