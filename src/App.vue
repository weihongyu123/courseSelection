<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <router-link to="/">
          <a-menu-item key="1">教师管理</a-menu-item>
        </router-link>
        <router-link to="/student">
          <a-menu-item key="2">学生管理</a-menu-item>
        </router-link>
         <router-link to="/about">
          <a-menu-item key="3">系统管理</a-menu-item>
        </router-link>
         <router-link to="/about">
          <a-menu-item key="4">课程管理</a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    return {
      selectedKeys: ref<string[]>(["2"]),
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