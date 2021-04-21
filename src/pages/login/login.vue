<template>
	<div class="login-content">
		<div class="logo-nav">
			<img class="logo" alt="Vue logo" src="../../assets/logo.png" />
			<h2>vue colliam admin</h2>
		</div>
		<el-tabs :model-value="activeName" @tab-click="handleClick">
			<el-tab-pane label="账号密码登录" name="login"></el-tab-pane>
			<el-tab-pane label="手机号码登录" name="register"></el-tab-pane>
		</el-tabs>
		<div class="login-main">
			<transition name="fade" mode="out-in">
				<el-card
					v-show="activeName == 'login'"
					shadow="never"
					class="login-nav"
				>
					<el-input
						prefix-icon="el-icon-user"
						v-model="loginDataUserName.username"
						placeholder="请输入账号"
					>
						<template #prepend>账 号 ：</template>
					</el-input>
					<el-input
						prefix-icon="el-icon-lock"
						v-model="loginDataUserName.password"
						placeholder="请输入密码"
						show-password
					>
						<template #prepend>密 码 ：</template>
					</el-input>
				</el-card>
			</transition>
			<transition name="fade" mode="out-in">
				<el-card
					v-show="activeName == 'register'"
					shadow="never"
					class="login-nav"
				>
					<el-input
						prefix-icon="el-icon-mobile-phone"
						v-model="registerDataUserPhone.username"
						placeholder="请输入手机号"
					>
						<template #prepend>手机号码：</template>
					</el-input>
					<div class="verification-code-nav">
						<el-input
							prefix-icon="el-icon-unlock"
							v-model="registerDataUserPhone.password"
							placeholder="请输入验证码"
						>
							<template #prepend>验 证 码 ：</template>
						</el-input>
						<el-button plain>获取验证码</el-button>
					</div>
				</el-card>
			</transition>
		</div>
		<div class="choose-nav">
			<el-checkbox label="记住我" v-model="remember"></el-checkbox>
			<el-link type="warning" :underline="false">忘记密码？</el-link>
		</div>
		<el-button type="primary" plain @click="login">登 录</el-button>
		<router-view></router-view>
	</div>
</template>

<script>
	import { useRouter } from 'vue-router'
	import { defineComponent, reactive, ref } from 'vue'
	import { loadRoutes } from '/@/utils/routerUtils'
	import { useStore } from 'vuex'

	export default defineComponent({
		name: 'Login',
		setup() {
			const store = useStore()
			const loginDataUserName = reactive({
				username: '',
				password: '',
			})
			const registerDataUserPhone = reactive({
				username: '',
				password: '',
			})
			const activeName = ref('login')
			const handleClick = (tab) => {
				activeName.value = tab.props.name
			}

			const remember = ref(true)
			const isRemember = () => {
				remember.value = !remember.value
			}

			const router = useRouter()
			const login = async () => {
				const data = await import('./routerMock')
				const userData = await import('./userMock')
				loadRoutes(data.default)
				store.commit('account/setUserData', userData.default)
				router.push({
					path: '/home',
				})
			}

			return {
				loginDataUserName,
				registerDataUserPhone,
				remember,
				isRemember,
				activeName,
				handleClick,
				login,
			}
		},
	})
</script>

<style lang="scss" scoped>
	.login-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 500px;
		padding-top: 200px;
		margin: auto;
		div {
			width: 100%;
			box-sizing: border-box;
		}
		.el-button {
			width: 460px;
			margin-top: 20px;
		}
	}
	.logo-nav {
		display: flex;
		justify-content: center;
		align-items: center;
		.logo {
			width: 45px;
			height: 45px;
		}
		h2 {
			margin-left: 12px;
		}
	}
	.login-main {
		position: relative;
		height: 140px;
		overflow: hidden;
	}
	.login-nav {
		position: absolute;
		top: 0;
		left: 0;
	}
	.verification-code-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		.el-button {
			flex-shrink: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100px;
			margin: 0 0 0 5px;
		}
	}
	.choose-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
	}
</style>

<style lang="scss" scoped>
	// 过度动画
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		transform: translateX(100%);
		opacity: 0;
	}
</style>

<style lang="scss" scoped>
	// element-ui-css
	.login-content {
		:deep(.el-tabs__nav-wrap) {
			&::after {
				background-color: transparent;
			}
		}

		:deep(.el-card__body) {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 100%;
			.el-input {
				margin-top: 20px;
			}
			.el-input:first-child {
				margin: 0;
			}
		}

		:deep(.el-tabs__nav) {
			display: flex;
			justify-content: space-around;
			align-items: center;

			#tab-login,
			#tab-register {
				padding: 0 70px;
				font-size: 16px;
			}
		}

		:deep(.el-card) {
			border: none;
			background-color: transparent;
		}
	}
</style>
