import request from '@/utils/request';

// 获取项目列表
export function queryStudentList(params: any) {
    return request({
        url: '/queryStudentList',
        method: 'get',
        params
    });
}

