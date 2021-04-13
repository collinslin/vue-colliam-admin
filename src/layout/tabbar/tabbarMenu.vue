<template>
  <div class="dropdown-menu" :style="{ left: 20 + left + 'px', top: '105px' }">
    <div
      class="dropdown-item"
      v-for="item in dropdownMenu"
      :key="item.name"
      @click="chooseTabbarMenu(item.type)"
    >
      <el-icon :class="item.icon"></el-icon>
      {{ item.name }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from '@vue/runtime-core'

  export default defineComponent({
    name: 'TabbarMenu',
    props: {
      left: {
        type: Number,
        required: true,
      },
    },
    setup(props, { emit }) {
      const dropdownMenu = reactive([
        {
          icon: 'el-icon-refresh',
          name: '刷新页面',
          type: 'refresh',
        },
        {
          icon: 'el-icon-delete',
          name: '删除本页',
          type: 'myDelete',
        },
      ])

      const chooseTabbarMenu = (type: string) => {
        emit('choose-tabbar-menu', type)
        // typeList[type] && typeList[type]()
      }

      return {
        dropdownMenu,
        chooseTabbarMenu,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .dropdown-menu {
    position: absolute;
    width: 120px;
    top: 35px;
    border: 1px solid rgb(233, 233, 235);
    background-color: #fff;
    z-index: 2;
    text-align: center;
    box-shadow: 0px -4px 20px 0px #0000001c;
    transition: all 0.2s;
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      left: 0;
      right: 0;
      margin: auto;
      border: 10px solid rgb(233, 233, 235);
      border-color: transparent transparent #fff transparent;
      transform: translateY(-100%);
      z-index: 3;
    }
    .dropdown-item {
      padding: 10px 5px;
      margin: 5px 0;
      font-size: 18px;
      background-color: #fff;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background-color: rgba(217, 236, 255, 0.6);
        color: #409eff;
      }
    }
  }
</style>
