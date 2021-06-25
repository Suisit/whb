<template>
  <div style="width: 100%">
    <div class="content">
      <div>
        <p style="font-size: 20px">课程总览</p>
        <hr />
      </div>
      <div class="card">
        <div class="card-item">
          <div class="item-left"><a-icon type="user" class="icon" /></div>
          <div class="item-right">
            <div style="font-size: 20px">{{ student.length }}</div>
            <div>学生数</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-left"><a-icon type="file" class="icon" /></div>
          <div class="item-right">
            <div style="font-size: 20px">{{ fileAmount }}</div>
            <div>文件数</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-left">
            <a-icon type="video-camera" class="icon" />
          </div>
          <div class="item-right">
            <div style="font-size: 20px">{{ blockAmount }}</div>
            <div>视频数</div>
          </div>
        </div>
        <div class="card-item">
          <div class="item-left">
            <a-icon type="sound" class="icon" />
          </div>
          <div class="item-right">
            <div style="font-size: 20px">{{ threadAmount }}</div>
            <div>讨论数</div>
          </div>
        </div>
      </div>
      <div>
        <div id="lineChart" style="width: 100%; height: 400px"></div>
      </div>
      <div>
        <div id="videoChart" style="width: 100%; height: 400px"></div>
      </div>
      <div>
        <p style="font-size: 20px">学生学习记录</p>
        <hr />
      </div>
      <div
        style="
          margin: 30px 0 30px;
          width: 100%;
          height: 400px;
          display: flex;
          justify-content: space-between;
        "
      >
        <div>
          <a-select
            show-search
            placeholder="Select a person"
            option-filter-prop="children"
            style="width: 200px"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
          >
            <a-select-option
              v-for="item in student"
              :key="item._id"
              :value="item.user._id"
            >
              {{ item.user.realname }}
            </a-select-option>
          </a-select>
        </div>
        <div style="">
          <a-list
            accordion
            style="
              width: 400px;
              height: 400px;
              margin-bottom: 50px;
              background: white;
            "
            bordered
            :pagination="pagination"
            :data-source="statement"
          >
            <a-list-item
              slot="renderItem"
              key="item.title"
              slot-scope="item, index"
              :class="[isActive === index ? 'active' : '', 'listItem']"
              @click="current(item, index)"
            >
              <span style="font-weight: bold">{{
                item.actor.account.realname
              }}</span
              >{{ item.verb.display.zh_CN + "了"
              }}<span style="font-weight: bold">{{
                item.object.definition.name
              }}</span>
            </a-list-item>
          </a-list>
        </div>
        <div class="viewer" style="height: 400px; z-index: 1">
          <json-viewer
            style="margin-top: -30px"
            :value="currentItem"
            :expand-depth="5"
          ></json-viewer>
        </div>
      </div>

      <div>
        <a-input-search
          placeholder="输入学生姓名"
          enter-button
          @search="onSearchExam"
          style="width: 500px"
        />
        <br /><br />
        <a-table
          :columns="columns"
          :data-source="studentDataNow"
          :pagination="paginationTable"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
      <div>
        <p style="font-size: 20px">作业情况</p>
        <hr />
      </div>
      <div>
        <a-input-search
          placeholder="输入学生姓名"
          enter-button
          @search="onSearchWork"
          style="width: 500px"
        />
        <br /><br />
        <a-table
          :columns="workcolumns"
          :data-source="workListNow"
          :pagination="paginationTable"
        >
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </div>
      <div>
        <p style="font-size: 20px">考试情况</p>
        <hr />
      </div>
      <div style="display: flex; justify-content: space-between">
        <div
          style="
            font-size: 30px;
            font-weight: bold;
            width: 400px;
            height: 400px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div style="width: 250px; height: 200px">
            <div>{{ totalScore }}</div>
            <div>总分</div>
          </div>
        </div>
        <div id="barChart" style="width: 800px; height: 400px"></div>
      </div>
      <div id="scatter" style="width: 100%; height: 400px"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import ecStat from "echarts-stat";
export default {
  props: {
    courseId: "",
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.barChart();
    this.lineChart();
    this.scatter();
    this.videoChart();
  },
  data() {
    return {
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          ellipsis: true,
        },
        {
          title: "用户名",
          dataIndex: "username",
          key: "username",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "学生姓名",
          dataIndex: "realname",
          key: "realname",
          ellipsis: true,
        },
        {
          title: "考试成绩",
          dataIndex: "score",
          key: "score",
          ellipsis: true,
        },
        {
          title: "学习记录总量",
          dataIndex: "record",
          key: "record",
          ellipsis: true,
        },
      ],
      workcolumns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          ellipsis: true,
        },
        {
          title: "用户名",
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "学生姓名",
          dataIndex: "realname",
          key: "realname",
          ellipsis: true,
        },
        {
          title: "作业标题",
          dataIndex: "title",
          key: "title",
          ellipsis: true,
        },
        {
          title: "作业成绩",
          dataIndex: "score",
          key: "score",
          ellipsis: true,
        },
      ],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 7,
      },
      paginationTable: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      },
      studentData: [],
      studentDataNow: [],
      currentItem: "",
      statement: null,
      student: "",
      isActive: "",
      fileAmount: 0,
      blockAmount: 0,
      threadAmount: 0,
      studentScore: new Array(5).fill(0),
      totalScore: 0,
      workList: [],
      workListNow: [],
    };
  },
  methods: {
    onSearchExam(value) {
      let newList = [];
      for (let i of this.studentData) {
        if (i.realname.search(value) > -1) {
          newList.push(i);
        }
      }
      this.studentDataNow = newList;
    },
     onSearchWork(value) {
      let newList = [];
      for (let i of this.workList) {
        if (i.realname.search(value) > -1) {
          newList.push(i);
        }
      }
      this.workListNow = newList;
    },
    async videoChart() {
      const blockRes = await this.$http.get(`courses/${this.courseId}`);
      let blocks = {
        name: [],
        id: [],
        amount: new Array(blockRes.data.blocks.length).fill(0),
      };
      blockRes.data.blocks.forEach((element) => {
        blocks.name.push(element.name);
        blocks.id.push(element._id);
      });
      const res = await this.$http.get(`statement/video`, {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
          },
        },
      });
      for (let i of res.data) {
        if (blocks.id.indexOf(i.object.id) > -1) {
          blocks.amount[blocks.id.indexOf(i.object.id)]++;
        }
      }
      var chartDom = document.getElementById("videoChart");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "视频播放次数分布",
        },
        xAxis: {
          type: "category",
          data: blocks.name,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: blocks.amount,
            type: "bar",
          },
        ],
      };
      option && myChart.setOption(option);
    },
    async barChart() {
      const studentScore = await this.$http.get("answer/allStudentScore", {
        params: {
          query: {
            where: {
              type: "Exam",
              course: this.courseId,
            },
            populate: "user",
          },
        },
      });
      this.totalScore = studentScore.data[0].totalScore;
      for (let i of studentScore.data) {
        let res = i.userScore / i.totalScore;
        switch (true) {
          case res <= 0.2: {
            this.studentScore[0] += 1;
            break;
          }
          case res > 0.2 && res <= 0.4: {
            this.studentScore[1] += 1;
            break;
          }
          case res > 0.4 && res <= 0.6: {
            this.studentScore[2] += 1;
            break;
          }
          case res > 0.6 && res <= 0.8: {
            this.studentScore[3] += 1;
            break;
          }
          default: {
            this.studentScore[4] += 1;
            break;
          }
        }
      }
      let myChart = echarts.init(document.getElementById("barChart"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "考试正确率分布",
        },
        xAxis: {
          type: "category",
          data: ["20%", "20-40%", "40-60%", "60-80%", "80-100%"],
        },
        yAxis: {
          type: "value",
          max: studentScore.data.length,
        },
        series: [
          {
            data: this.studentScore,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "#fff",
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    async lineChart() {
      const res = await this.$http.get("statement/courseStatement", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
          },
        },
      });
      let dataX = [
        "00:00",
        "01:15",
        "02:30",
        "03:45",
        "05:00",
        "06:15",
        "07:30",
        "08:45",
        "10:00",
        "11:15",
        "12:30",
        "13:45",
        "15:00",
        "16:15",
        "17:30",
        "18:45",
        "20:00",
        "21:15",
        "22:30",
        "23:45",
      ];
      let date = [];
      for (let i of res.data) {
        let time = new Date(i.createdAt);
        date.push(`${time.getHours()}:${time.getMinutes()}`);
      }
      let dataY = new Array(20).fill(0);
      var chartDom = document.getElementById("lineChart");
      var myChart = echarts.init(chartDom);
      for (let i = 0; i < date.length; i++) {
        for (let j = 0; j < 20; j++) {
          if (date[i] <= dataX[j]) {
            dataY[j]++;
            break;
          }
        }
      }
      var option;
      option = {
        title: {
          text: "在线时间分布",
        },
        xAxis: {
          type: "category",
          data: dataX,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: dataY,
            type: "line",
            smooth: true,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    
    current(item, key) {
      this.currentItem = item;
      this.isActive = key;
    },
    async fetch() {
      const work = await await this.$http.get("answer/allStudentScore", {
        params: {
          query: {
            where: {
              course: this.courseId,
              type: "Work",
            },
            populate: ["user", "object"],
          },
        },
      });
      for (const i of work.data) {
        this.workList.push({
          key: i._id,
          id: i._id,
          name: i.user.username,
          realname:i.user.realname,
          title: i.object.title,
          score: i.userScore + "/" + i.totalScore,
        });
      }
      this.workListNow = this.workList;
      const res = await this.$http.get("add-course", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
            populate: "user",
          },
        },
      });
      this.student = res.data;
      console.log(this.student)
      const fileamount = await this.$http.get("coursewares/amount", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
          },
        },
      });
      this.fileAmount = fileamount.data;
      const blockAmount = await this.$http.get(`blocks/amount/amount`, {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
          },
        },
      });
      this.blockAmount = blockAmount.data;
      const threadAmount = await this.$http.get(`threads/amount/amount`, {
        params: {
          query: {
            where: {
              object: this.courseId,
              type: "Course",
            },
          },
        },
      });
      this.threadAmount = threadAmount.data;
      for (let i of this.student) {
        let res = await this.$http.get(`statement/amount`, {
          params: {
            query: {
              where: {
                user: i.user.id,
                course: this.courseId,
              },
            },
          },
        });
        let score = await this.$http.get(`answer/score`, {
          params: {
            query: {
              where: {
                user: i.user.id,
                course: this.courseId,
                type: "Exam",
              },
            },
          },
        });
        this.studentData.push({
          key: i._id,
          id: i.user.id,
          username: i.user.username,
          realname: i.user.realname,
          record: res.data,
          score:
            score.data != -1
              ? `${score.data.score}/${score.data.totalScore}`
              : "未答题",
        });
        this.studentDataNow = this.studentData;
      }
    },
    async scatter() {
      var chartDom = document.getElementById("scatter");
      var myChart = echarts.init(chartDom);
      var option;
      let data = [];
      const res = await this.$http.get("add-course", {
        params: {
          query: {
            where: {
              course: this.courseId,
            },
            populate: "user",
          },
        },
      });
      const studentScore = await this.$http.get("answer/allStudentScore", {
        params: {
          query: {
            where: {
              type: "Exam",
              course: this.courseId,
            },
            populate: "user",
          },
        },
      });
      let studentData = [];
      for (let i of res.data) {
        let res = await this.$http.get(`statement/amount`, {
          params: {
            query: {
              where: {
                user: i.user.id,
                course: this.courseId,
              },
            },
          },
        });
        studentData.push({
          key: i._id,
          id: i.user.id,
          username: i.user.username,
          realname: i.user.realname,
          record: res.data,
        });
        
      }
      for (let i = 0; i < studentScore.data.length; i++) {
        for (let j = 0; j < studentData.length; j++) {
          if (studentScore.data[i].user._id == studentData[j].id) {
            data.push([studentData[j].record, studentScore.data[i].userScore]);
            break;
          }
        }
      }

      option = {
        title: {
          text: "成绩与活跃度分析图",
        },
        xAxis: {
          name: "学生活跃度",
        },
        yAxis: {
          name: "考试成绩",
        },
        series: [
          {
            symbolSize: 20,
            data: data,
            type: "scatter",
          },
        ],
      };
      option && myChart.setOption(option);
    },
    async handleChange(value) {
      const res2 = await this.$http.get(`statement`, {
        params: {
          query: {
            where: {
              user: value,
              course: this.courseId,
            },
          },
        },
      });
      this.statement = res2.data;
    },
    handleBlur() {
      console.log("blur");
    },
    handleFocus() {
      console.log("focus");
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
</script>
<style scoped>
.content {
  width: 1100px;
  height: 1000px;
  margin: 0 auto;
  padding: 50px 0 0 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.active {
  background: #e6f7ff;
  transition: 0.3s;
}
.card {
  padding: 30px 0 30px;
  display: flex;
  justify-content: space-between;
}
.card-item {
  width: 250px;
  height: 100px;
  padding: 0;
  display: flex;
  border: 1px solid rgba(232, 232, 232);
  border-radius: 10px;
  align-items: center;
}
.item-left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 100px;
  height: 100px;
  background: rgb(0, 150, 136);
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-item:nth-of-type(2) .item-left {
  background: rgb(247, 184, 36);
}
.card-item:nth-of-type(3) .item-left {
  background: rgb(255, 87, 34);
}
.card-item:nth-of-type(4) .item-left {
  background: rgb(84, 173, 232);
}
.icon {
  font-size: 30px;
  color: white;
}
.item-right {
  flex: 1;
  font-weight: bold;
  text-align: center;
}
.viewer {
  width: 400px;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.viewer::-webkit-scrollbar {
  display: none;
}
</style>