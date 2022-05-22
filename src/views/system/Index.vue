
<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <router-link
          v-for="item in menus"
          :key="rootPath + '/' + item.path"
          :to="rootPath + '/' + item.path"
        >
          <a-menu-item :key="rootPath + '/' + item.path">
            <span> {{ item.name }}</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '24px',
          margin: 0,
          minHeight: '280px',
        }"
      >
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { routes } from "@/router";
import { RouteRecordRaw, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const rootPath = "/system";
    let menus = reactive<RouteRecordRaw[]>(
      routes[0].children?.find((e) => e.path === rootPath)?.children || []
    );

    const route = useRoute();

    let selectedKeys = ref<string[]>([""]);

    return {
      selectedKeys,
      menus,
      rootPath,
    };
  },
});
</script>


