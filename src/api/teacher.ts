import request from '@/utils/request';

// 获取项目列表
export function queryTeacherList(params: any) {
    return request({
        url: '/api/teacher/queryTeacherList',
        method: 'get',
        params
    });
}

// 新增 & 修改 教师信息
export function saveTeacher(params: any) {
    return request({
        url: '/api/teacher/saveTeacher',
        method: 'post',
        params
    });
}

export function deleteTeacher(params: any) {
    return request({
        url: '/api/teacher/deleteTeacher',
        method: 'post',
        params
    });
}

