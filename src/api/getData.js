import fetch from '@/config/fetch'

/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');



/**
 * 获取员工列表信息
 */
export const StaffList = data => fetch('/admin/getStaffList', data, 'POST');

/**
 * 删除员工
 */
export const delStaff = data => fetch('/admin/delStaffById', data, 'POST');

/**
 * 编辑员工信息
 */
export const editStaff = data => fetch('/admin/editStaff', data, 'POST');

/**
 * 添加员工信息
 */
export const addStaff = data => fetch('/admin/addStaff', data, 'POST');


/**
 * 获取一级分类信息
 */
export const getParentId = data => fetch('/admin/getParentId');

/**
 * 添加分类
 */
export const addCategory = data => fetch('/admin/addCategory', data, 'POST');

/**
 * 删除一级分类
 */
export const delParentId = data => fetch('/admin/delParentId/', data, 'POST');

/**
 * 编辑分类信息
 */
export const editCategory = data => fetch('/admin/editCategory', data, 'POST');


