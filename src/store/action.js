import axios from 'axios'
import {
	GET_USERINFO,
    GET_USER_PERM_STR_LIST
} from './mutation-types.js'

export default {

	async getUserInfo({
		commit,
		state
	}) {
		let res = (await axios.get('./api/security/current')).data;
		commit(GET_USERINFO, res)
	},
	async getPermStrList({
		commit,
		state
	}) {
        let res = (await axios.get('./api/sys/menu/perms')).data.menuList;
		commit(GET_USER_PERM_STR_LIST, res);
	},
}