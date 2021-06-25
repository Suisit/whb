<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    style="background-color: white;height:100%"
  >
    <a-layout-sider
      style="background: #fff"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <a-menu
        v-if="$route.meta.key"
        style="height: 100%"
        theme="light"
        mode="inline"
        :default-selected-keys="['1']"
        :selected-keys="[$route.meta.key]"
      >
        <a-menu-item key="1" @click="$router.push(`/course/${courseId}/video`)">
          <a-icon type="video-camera" />
          <span>课程视频</span>
        </a-menu-item>
        <a-menu-item
          key="2"
          @click="$router.push(`/course/${courseId}/debate`)"
        >
          <a-icon type="user" />
          <span>讨论区</span>
        </a-menu-item>
        <a-menu-item
          key="3"
          @click="$router.push(`/course/${courseId}/courseware`)"
        >
          <a-icon type="download" />
          <span>课件</span>
        </a-menu-item>
        <a-menu-item
          key="4"
          @click="$router.push(`/course/${courseId}/work`)"
        >
          <a-icon type="solution" />
          <span>作业</span>
        </a-menu-item>
        <a-menu-item
          key="5"
          @click="$router.push(`/course/${courseId}/exam`)"
        >
          <a-icon type="solution" />
          <span>考试</span>
        </a-menu-item>
        <a-menu-item
          key="6"
          v-if="$store.state.user._id===course.createUser"
          @click="$router.push(`/course/${courseId}/statement`)"
        >
          <a-icon type="solution" />
          <span>学生学习记录</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <router-view class='router-view' style="width:100%;overflow-y: scroll;
  overflow-x: hidden;"></router-view>
  </a-layout>
</template>
<script>
export default {
  props: {
    courseId: "",
  },
  data() {
    return {
      collapsed: false,
      course:''
    };
  },
  created() {
    this.my();
  },
  methods: {
    async my(){
      const res= await this.$http.get(`courses/${this.courseId}`)
      console.log(res);
      this.course=res.data;
    }
  },
};
</script>
<style scoped>
.router-view::-webkit-scrollbar {
  display: none;
}
</style>