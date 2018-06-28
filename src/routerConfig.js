// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideLayout from './layouts/HeaderAsideLayout';
import Dashboard from './pages/Dashboard';

import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Menu from './pages/sysconfig/menu';
import Org from './pages/sysconfig/org';
import Role from './pages/sysconfig/role';
import User from './pages/sysconfig/user';
import Dict from './pages/sysconfig/dict';
import Map from './management/map/map.vue';
import Camp from './management/camp/Layout.vue';
import Whole from './management/camp/details/Whole.vue';
import Details from './management/camp/details/Details.vue';
import Label from './management/camp/details/Label.vue';

export default [{
		path: '',
		redirect: '/home'
	},
	{
		path: '/map',
		component: Map,
	},
	{
		path: '/camp',
		component: Camp,
		children: [{
				path: '',
				component: Whole
			},
			{
				path: '/system/details',
				component: Details
			},
			{
				path: '/system/label',
				component: Label
			},
		]
	},

	{
		path: '/login',
		component: Login,
	},
	{
		path: '/home',
		component: HeaderAsideLayout,
		children: [ //三级路由。对应home.vue
			{
				path: '',
				component: Dashboard
			},
			{
				path: 'sysConfig/menu',
				component: Menu
			},
			{
				path: 'sysConfig/org',
				component: Org
			},
			{
				path: 'sysConfig/role',
				component: Role
			},
			{
				path: 'sysConfig/dict',
				component: Dict
			},
			{
				path: 'sysConfig/user',
				component: User
			},

		]
	}

]