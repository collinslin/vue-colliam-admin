<template>
	<span :class="className">
		{{ displayValue }}
	</span>
</template>
<script lang="ts">
	import {
		computed,
		defineComponent,
		onMounted,
		onUnmounted,
		Ref,
		ref,
		watch,
	} from 'vue'
	import {
		requestAnimationFrame,
		cancelAnimationFrame,
	} from './requestAnimationFrame'

	export default defineComponent({
		name: 'CountTo',
		props: {
			startVal: {
				type: Number,
				required: false,
				default: 0,
			},
			endVal: {
				type: Number,
				required: false,
				default: 2021,
			},
			duration: {
				type: Number,
				required: false,
				default: 3000,
			},
			autoplay: {
				type: Boolean,
				required: false,
				default: true,
			},
			decimals: {
				type: Number,
				required: false,
				default: 0,
				validator: (value: number) => {
					return value >= 0
				},
			},
			decimal: {
				type: String,
				required: false,
				default: '.',
			},
			separator: {
				type: String,
				required: false,
				default: ',',
			},
			prefix: {
				type: String,
				required: false,
				default: '',
			},
			suffix: {
				type: String,
				required: false,
				default: '',
			},
			useEasing: {
				type: Boolean,
				required: false,
				default: true,
			},
			easingFn: {
				type: Function,
				default: (t: number, b: number, c: number, d: number) => {
					return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
				},
			},
			className: {
				type: String,
				required: false,
				default: '',
			},
		},
		setup(props, { emit }) {
			const isNumber = (val: string) => {
				return !isNaN(parseFloat(val))
			}
			const formatNumber = (num: number | string) => {
				num = Number(num).toFixed(props.decimals)
				num += ''
				const x = num.split('.')
				let x1 = x[0]
				const x2 = x.length > 1 ? props.decimal + x[1] : ''
				const rgx = /(\d+)(\d{3})/
				if (props.separator && !isNumber(props.separator)) {
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + props.separator + '$2')
					}
				}
				return props.prefix + x1 + x2 + props.suffix
			}
			const displayValue = ref(formatNumber(props.startVal))
			const countDown = computed(() => props.startVal > props.endVal)
			const localStartVal = ref(props.startVal)
			const printVal: Ref<null | number> = ref(null)
			const paused = ref(false)
			const localDuration = ref(props.duration)
			const startTime: Ref<null | number> = ref(null)
			const timestamp: Ref<null | number> = ref(null)
			const remaining: Ref<null | number> = ref(null)
			const rAF = ref(null)
			const start = () => {
				localStartVal.value = props.startVal
				startTime.value = null
				localDuration.value = props.duration
				paused.value = false
				rAF.value = requestAnimationFrame(count)
			}
			const count = (timestamps: number) => {
				if (!startTime.value) startTime.value = timestamps
				timestamp.value = timestamps
				const progress = timestamp.value - startTime.value
				remaining.value = localDuration.value - progress

				if (props.useEasing) {
					if (countDown.value) {
						printVal.value =
							localStartVal.value -
							props.easingFn(
								progress,
								0,
								localStartVal.value - props.endVal,
								localDuration.value
							)
					} else {
						printVal.value = props.easingFn(
							progress,
							localStartVal.value,
							props.endVal - localStartVal.value,
							localDuration.value
						)
					}
				} else {
					if (countDown.value) {
						printVal.value =
							localStartVal.value -
							(localStartVal.value - props.endVal) *
								(progress / localDuration.value)
					} else {
						printVal.value =
							localStartVal.value +
							(props.endVal - localStartVal.value) *
								(progress / localDuration.value)
					}
				}
				if (countDown.value) {
					printVal.value =
						printVal.value! < props.endVal ? props.endVal : printVal.value
				} else {
					printVal.value =
						printVal.value! > props.endVal ? props.endVal : printVal.value
				}

				displayValue.value = formatNumber(printVal.value as number)
				if (progress < props.duration) {
					rAF.value = requestAnimationFrame(count)
				} else {
					emit('callback')
				}
			}

			watch([() => props.startVal, () => props.endVal], () => {
				if (props.autoplay) {
					start()
				}
			})

			onMounted(() => {
				if (props.autoplay) {
					start()
				}
				emit('mounted-callback')
			})
			onUnmounted(() => {
				cancelAnimationFrame(rAF.value)
			})

			return { displayValue }
		},
	})
</script>
