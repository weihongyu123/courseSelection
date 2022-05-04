import request from '@/utils/request';

// 获取项目列表
export function queryStudentList(params: any) {
    return request({
        url: '/api/student/queryStudentList',
        method: 'get',
        params
    });
}

export function queryOne(params: any) {
    return request({
        url: '/api/student/queryOne',
        method: 'get',
        params
    });
}

// 新增 & 修改 学生信息
export function saveStudent(params: any) {
    return request({
        url: '/api/student/saveStudent',
        method: 'post',
        params
    });
}

export function deleteStudent(params: any) {
    return request({
        url: '/api/student/deleteStudent',
        method: 'post',
        params
    });
}

