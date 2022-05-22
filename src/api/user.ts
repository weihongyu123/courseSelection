import request from '@/utils/request';

// 获取项目列表
export function login(params: any) {
    return request({
        url: '/api/user/login',
        method: 'post',
        params
    });
}
