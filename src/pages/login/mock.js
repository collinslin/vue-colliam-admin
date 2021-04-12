const data = [
	{
		router: 'root',
		children: [
			{
				router: 'form',
				children: ['basicForm', 'stepForm', 'advanceForm'],
			},
			{
				router: 'basicForm',
				name: '验权表单',
				icon: 'el-icon-key',
				authority: 'queryForm',
			},
			{
				router: 'baidu',
				path: 'baidu',
				name: '百度',
				icon: 'el-icon-link',
				link: 'https://www.baidu.com',
			},
			{
				router: 'baidu',
				path: 'baidu',
				name: '百度',
				icon: 'el-icon-link',
				link: 'https://www.baidu.com',
				isAppView: true,
			},
		],
	},
]

export default data
