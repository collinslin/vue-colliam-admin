const userData = {
	name: 'colliam',
	// roles: ['admin'],
	roles: ['visitor'],
	// role: ['test'],
	// permissions: ['edit'],
	permissions: ['delete'],
}
//只是为了测试用的数据结构，
//真实后端返回的用户权限信息数据接口应该如下
/**
 * userData = {
 * ...
 * @roles :{id:string,operation:string[]}[],
 * @permissions :{id:string,operation:string[]}[]
 * }
 */

export default userData
