<template>
  <a-layout style="background-color: white">
    <a-layout-header class="header" style="background-color: white">
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
      <a-menu
        theme="light"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="$router.push('/')" > 所有课程 </a-menu-item>
        <a-menu-item key="2" @click="$router.push('/myCourse')"> {{$store.state.user.role=='student'?'我加入的课程':'我创建的课程'}} </a-menu-item>
      </a-menu>
    </a-layout-header>
      <router-view></router-view>
  </a-layout>
</template>
<script>
export default {
  created() {
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    layout() {
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.content {
  overflow-y: "scroll";
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
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
