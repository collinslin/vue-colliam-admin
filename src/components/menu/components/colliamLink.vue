<template>
	<component :is="type" v-bind="linkProps(to)">
		<slot></slot>
	</component>
</template>

<script>
	import { computed, defineComponent } from '@vue/runtime-core'
	import { isExternal } from '/@/utils/utils'

	export default defineComponent({
		name: 'ColliamLink',
		props: {
			to: {
				type: String,
				required: true,
			},
		},
		setup(props) {
			const type = computed(() => {
				if (isExternal(props.to)) {
					return 'a'
				} else {
					return 'router-link'
				}
			})

			const linkProps = () => {
				if (isExternal(props.to)) {
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

			return { type, linkProps }
		},
	})
</script>

<style lang="scss" scoped>
	a {
		text-decoration: none;
	}
</style>
