<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo">
        <a-avatar
          id="avatar"
          size="large"
          :style="{ backgroundColor: '#ffbf00', verticalAlign: 'middle' }"
        >
          {{ $store.state.user.username }}
        </a-avatar>
        <a-button id="layout" @click="layout">退出登录</a-button>
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['4']">
        <a-menu-item key="1" @click="$router.push('/admin/adminUser')">
          <a-icon type="user" />
          <span class="nav-text">用户管理</span>
        </a-menu-item>
        <a-menu-item key="2"  @click="$router.push('/admin/adminCourse')">
          <a-icon type="video-camera" />
          <span class="nav-text">课程管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <router-view></router-view>
        </div>
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>
<script>
export default {
  methods: {
    layout() {
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
}
</script>
<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  margin: 16px;
}
.logo {
  height: 31px;
  margin: 16px 28px 16px -8px;
  float: left;
  text-align: center;
  line-height: 32px;
  font-size: 24px;
}
.logo #avatar {
  position: relative;
  transform: translatex(43px);
  transition: all 0.5s linear;
}
.logo:hover #avatar {
  position: relative;
  transform: translatex(-10px);
  transition: all 0.5s linear;
}
.logo #layout {
  opacity: 0;
  transition: all 0.5s linear;
}
.logo:hover #layout {
  opacity: 1;
  transition: all 0.5s linear;
}
</style>
