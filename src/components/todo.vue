<template>
  <div class="page lists-show">
    <!-- 头部模块 -->
    <nav>
      <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标 -->
      <div class="form list-edit-form" v-show="isUpdate">
        <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
        <input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item" @click="isUpdate = false">
            <span class="icon-close">
            </span>
          </a>
        </div>
      </div>
      <!-- 当用户浏览车窗口尺寸小于40em时候，显示手机端的菜单图标 -->
      <div class="nav-group" @click="$store.dispatch('updateMenu')" v-show="!isUpdate">
        <!-- 在菜单的图标下面添加updateMenu时间，他可以直接调用vuex actions.js里面的updateMenu方法 -->
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <!-- 显示标题和数字模块 -->
      <h1 class="title-page" v-show="!isUpdate" @click="isUpdate = true">
        <span class="title-wrapper">{{todo.title}}</span>
        <!-- title:标题 绑定标题 -->
        <span class="count-list">{{todo.count || 0}}</span>
        <!-- count:数量 绑定代办单项熟练-->
      </h1>
      <!-- 右边显示删除图标和锁定图标的模块 -->
      <div class="nav-group right" v-show="!isUpdate">
        <div class="options-web">
          <a class=" nav-item" @click="onEditStatus()">
            <!-- cicon-lock锁定的图标icon-unlock：非锁定的图标 -->
            <span class="icon-lock" v-if="todo.locked"></span>
            <span class="icon-unlock" v-else>
            </span>
          </a>
          <a class=" nav-item">
            <span class="icon-trash" @click="onDeleteStatus()">
            </span>
          </a>
        </div>
      </div>
      <!-- 用户新增代办事项的input模块 -->
      <div class=" form todo-new input-symbol">
        <!-- 绑定disabled值，当todo.locked为绑定的时候，禁止input输入,双向绑定text,和监听input的回车事件@keyup.enter -->
        <input type="text" v-model="text" placeholder='请输入' @keyup.enter="onAdd" :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <!-- 列表主体模块 -->
    <div class="content-scrollable list-items">
      <div v-for="item in items" :key="item.id">
        <item :item="item" :todoid="todoid" @init="init" :locked="islock"></item>
      </div>
    </div>
  </div>
</template>
<script>  
import item from './item'
import { getTodo, addRecord, editTodo, getTodoList, editTodoStatus } from '../api/api';
export default {
  data () {
    return {
      todo: {},
      items: [  //代办单项列表
      ],
      todoid: '',
      islock: '',
      text: '', //用户输入单项项绑定的输入
      isUpdate: false // 新增修改状态
    }
  },
  components: {
    item
  },
  watch: {
    '$route.params.id' () {
      // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
      this.init();
    }
  },
  created () {
    // created生命周期，在实例已经创建完成，页面还没渲染时调用init方法。
    this.init();
  },
  methods: {
    init () {


      // 获取到 $route下params下的id,即我们在menus.vue组件处传入的数据。
      const ID = this.$route.params.id;
      this.todoid = ID
      getTodo({ categoryId: ID }).then(res => {
        // let { id, title, count, isDelete, locked, record
        // } = res.data.todo;
        // // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        // this.items = record;
        // this.todo = {
        //   id: id,
        //   title: title,
        //   count: count,
        //   locked: locked,
        //   isDelete: isDelete
        // };
        // let { category_id, name, status } = res.data.list;
        // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        let list = this.$store.getters.getTodoList;

        let newList = list.filter((el) => {
          return el.id == ID
        });
        let losckstatus = newList[0].status == 0 ? true : false;
        this.items = res.data.list;
        this.todo = {
          id: newList[0].id,
          title: newList[0].name,
          count: newList[0].count,
          locked: losckstatus,
          isDelete: false
        };
        this.islock = losckstatus
      });
    },
    onAdd () {
      //当用户输入文字，并且回车时调用次方法。
      const ID = this.$route.params.id;
      addRecord({ categoryDetail: { categoryId: ID, id: 0, name: this.text } }).then(res => {
        this.text = '';
        this.init();
        this.updateTodo();
        //请求成功后初始化
      });
    },
    updateTodo (isdelete) {
      let _this = this;
      _this.$store.dispatch('getTodo').then((res) => {
        //如果是删除数据的按钮就执行这步
        if (isdelete) {
          let todoid = this.$store.state.todoList[0].id;
          this.$store.dispatch('updateRounter', todoid);
        }
      });

    },
    showTip (msg) {
      this.$store.dispatch('showTipFunc', {
        show: true,
        text: msg
      });
    },
    updateTitle () {
      this.$store.dispatch('showLoaingFunc', true);
      editTodo({
        category: { id: _this.todoid, name: this.todo.title }
      }).then(data => {
        this.showTip('aaaa')
        this.updateTodo();
      })
      this.isUpdate = false
    },
    onEditStatus () {
      this.$store.dispatch('showLoaingFunc', true);
      let sta = 0;
      this.todo.locked = !this.todo.locked;
      this.islock = this.todo.locked;
      this.todo.locked ? sta = 0 : sta = 1
      editTodoStatus({ id: this.todoid, status: sta }).then((data) => {
        this.showTip(data.message)
        this.updateTodo();
      })
    },
    onDeleteStatus () {
      this.$store.dispatch('showLoaingFunc', true);
      this.todo.isDelete = true;
      let sta = -1
      editTodoStatus({ id: this.todoid, status: sta }).then((data) => {
        this.showTip(data.message)
        this.updateTodo(true);
      })
    }
  }
}
</script>
<style lang = "less">
@import "../common/style/nav.less";
@import "../common/style/form.less";
@import "../common/style/todo.less";
</style>