<template>
  <component :is="type" v-bind="linkProps(to)" @click="test">
    <slot></slot>
  </component>
</template>

<script>
  import { computed, defineComponent } from '@vue/runtime-core'
  import { useRoute } from 'vue-router'
  import { isExternal } from '/@/utils/utils'

  export default defineComponent({
    name: 'ColliamLink',
    props: {
      to: {
        type: String,
        required: true,
      },
      item: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const route = useRoute()
      const type = computed(() => {
        if (isExternal(props.to) && !props.item.meta.isAppView) {
          return 'a'
        } else {
          return 'router-link'
        }
      })

      const linkProps = () => {
        if (isExternal(props.to) && !props.item.meta.isAppView) {
          return {
            href: props.to,
            target: '_blank',
            rel: 'noopener',
          }
        } else {
          return {
            to: props.to,
          }
        }
      }

      const test = () => {
        if (route.path == props.to) {
          return
        }
      }

      return { type, linkProps, test }
    },
  })
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>
