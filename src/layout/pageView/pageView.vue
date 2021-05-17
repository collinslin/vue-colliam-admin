<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform">
      <keep-alive :max="5" :include="include" :exclude="exclude">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'PageView',
    setup() {
      const store = useStore()
      const include = computed(() => store.state.routerStore.keepAliveInclude)
      const exclude = computed(() => store.state.routerStore.keepAliveExclude)
      return { include, exclude }
    },
  })
</script>

<style lang="scss" scoped>
  //过度动画
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s;
  }

  .fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
