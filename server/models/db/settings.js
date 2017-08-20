/**
 * 创建数据库连接
 * 系统配置参数
 * 该模块只会被加载一次
 */

 module.exports = {
 // debug 为 true 时，用于本地调试
    debug: false,
    session_secret : 'xinleaf_company_secret', //务必修改
    auth_cookie_name : 'xinleaf_company',
 	encrypt_key : 'xinleaf',
 	
 //	数据库配置
 	URL : 'mongodb://127.0.0.1:27017/xinleaf_company',
 	DB : 'xinleaf_company',
 	HOST: '',
    PORT: 27017,
    USERNAME: '',
    PASSWORD: '',

 // 本地缓存设置
 	redis_host : '127.0.0.1',
 	redis_port : 6379,
 	redis_psd : '',
 	redis_db : 0,

 // 信息提示相关
    system_illegal_param : '非法参数',
    system_noPower : '对不起，您无权执行该操作！',
    system_atLeast_one : '请选择至少一项后再执行删除操作！',
    system_batch_delete_not_allowed : '对不起，该模块不允许批量删除！'
 }
