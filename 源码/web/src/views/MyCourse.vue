<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
      <a-layout-sider
        style="background: #fff"
        v-model="collapsed"
        :trigger="null"
        collapsible
      >
        <a-menu theme="light" mode="inline" :default-selected-keys="['1']">
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <div class="content">
          <a-layout-content
            :style="{
              padding: '24px',
              background: '#fff',
              minHeight: '280px',
            }"
          >
            <a-row>
              <a-list
                :grid="{ gutter: 16, column: 4 }"
                v-for="item in courseLists"
                :key="item._id"
              >
                <a-list-item>
                  <a-card
                    hoverable
                    style="width: 240px"
                    @click="$router.push(`course/${item._id}/video`)"
                  >
                    <img slot="cover" :alt="item.name" :src="item.image" />
                    <a-card-meta :title="item.name"> </a-card-meta>
                  </a-card>
                </a-list-item>
              </a-list>
            </a-row>
          </a-layout-content>
        </div>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      url: "",
      imageUrl: "",
      loading: false,
      ModalText: "Content of the modal",
      visible: false,
      visibleAdd: false,
      confirmLoading: false,
      confirmLoadingAdd: false,
      courseLists: "",
      nowItem:'',
      myCourse:''
    };
  },
  created() {
    this.fetchMyCourseList();
  },
  methods: {
    async fetchMyCourseList() {
      const res = this.$store.state.user.role=='student'?await this.$http.get("add-course", {
        params: {
          query: {
            where: {
              user: this.$store.state.user._id,
            },
            populate:'course',
          },
        },
      }):await this.$http.get("courses",{
        params: {
          query: {
            where: {
              createUser: this.$store.state.user._id,
            },
          },
        },
      })
      if(this.$store.state.user.role=='student'){
        let list=[];
        for(let i=0;i<res.data.length;i++){
          list.push(res.data[i].course);
        }
        this.courseLists=list;
      }
      else{
        this.courseLists=res.data;
      }
      
      console.log(this.courseLists)
    },
    addCourse(item) {
      if (this.courseAdd.includes(item._id)) {
        this.$router.push(`course/${item._id}/video`);
      } else {
        this.showAddModal();
        this.nowItem=item;
      }
      console.log(item);
    },
  },
};
</script>
<style>
#fileimage {
  width: 128px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
