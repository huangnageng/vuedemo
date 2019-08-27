<template>
  <transition name="slide-fade">
    <div class="list-item  editingClass editing " :class="{checked: checked}" v-show="item.status!==-1" :disabled="locked">
      <label class="checkbox">
        <input type="checkbox" v-model="checked" name="checked" @change="item.status == 0 ? item.status = 1 : item.status = 0;onChangeStatus(item)" :disabled="locked">
        <span class="checkbox-custom"></span>
      </label>
      <input type="text" v-model="item.name" placeholder='写点什么。。。' :disabled=" checked || locked" @keyup.enter="onChangeRecord(item)">
      <a class="delete-item" v-if="item.status == 0 && !locked" @click="item.status = -1;onChangeStatus(item)">
        <span class="icon-trash"></span>
      </a>
    </div>
  </transition>
</template>
<script>
// item 是todo的子组件,他接受一个对象item,来进行处理
import { addRecord, editRecordStatus } from '../api/api';
export default {
  data () {
    return {
      checked: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: '你好,世界'
        }
      }
    },
    'index': {
    },
    'todoid': {},
    'init': {

    },
    'locked': {
      type: Boolean,
      default: ''
    },
  },
  created () {
    this.checked = this.item.status == 0 ? true : false;
  },
  methods: {
    showTip (msg) {
      this.$store.dispatch('showTipFunc', {
        show: true,
        text: msg
      });
    },
    onChangeRecord (item) {
      this.$store.dispatch('showLoaingFunc', true);
      //增加
      addRecord({ categoryDetail: { categoryId: item.categoryId, id: item.id, name: item.name } }).then(data => {
        this.showTip(data.message)
        this.updateData();
      });
    },
    onChangeStatus (item) {
      this.$store.dispatch('showLoaingFunc', true);
      //更改状态
      editRecordStatus({ id: item.id, status: item.status }).then(data => {
        this.showTip(data.message)
        this.updateData();
      })
    },
    updateData () {
      this.$emit('init');
      this.$store.dispatch('getTodo');
    }
  }
};
</script>
<style lang="less">
@import "../common/style/list-items.less";
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>