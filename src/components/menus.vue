<template>
  <!--绑定点击事件goList),并且判断当todoId 时候 item.id时,文字高亮度-->
  <div class="list-todos">
    <!-- 绑定class，当items循环中的id等于我们设置的选中todoId时候,就会加上active这个calss,这样样式就会发生变化。-->
    <a @click="goList(item.id)" class="list-todo list activeListClass" :class="{'active': item.id === todoId}" v-for="(item,index) in todoList" :key="index">
      <!-- status=1是正常，0为锁定，-1为删除 -->
      <span class="icon-lock" v-if="item.status==0"></span>
      <span class="count-list" v-if="item.count > 0">{{item.count}}</span>
      {{item.name}}
    </a>
    <a class=" link-list-new" @click="addTodoList">
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
import { getTodoList, addTodo } from '../api/api'; // 引入我们 封装好的两个接口函数。
export default {
  data () {
    return {
      items: [], // 菜单数据
    };
  },
  computed: {
    todoList () {
      return this.$store.getters.getTodoList; // 返回vuex getters.js 定义的getTodoList数据
    },
    todoId () {
      return this.$store.state.todoId;// 默认选中id
    }
  },
  created () {
    // var numbers = [4, 2, 5, 1, 3];
    // numbers.sort(function (a, b) {
    //   return a - b;
    // });
    // console.log(numbers);
    // 调用请求菜单列表数据的接口
    this.$store.dispatch('getTodo').then((res) => { //调用vuex actions.js 里面的 getTodo函
      this.$nextTick(() => {
        new Promise((resolve, reject) => {
          this.goList(res.list[0].id);
          resolve(res.list[0].id);
        }).then((res) => {
          if (res) {
            this.$store.dispatch('showLoaingFunc', false);
          }
        })
      });
    });
  },
  methods: {
    goList (id) { // 点击菜单时候,替换选中id
      this.$store.dispatch('updateRounter', id);
    },
    addTodoList () { // 点击新增按钮时候
      //调用vuex actions.js 里面的 getTodo函数
      this.$store.dispatch('showLoaingFunc', true);
      addTodo({ category: { id: 0, name: 'newList' } }).then(data => {
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id);
              this.$store.dispatch('showLoaingFunc', false);
            }, 100);
          });
        });
      });
    }
  },
  watch: {
    'todoId' (id) {
      this.$router.push({
        name: 'todo', params: { id: id }
      })
    }
  }
};
</script>
<style lang='less'>
@import "../common/style/menu.less";
</style>
