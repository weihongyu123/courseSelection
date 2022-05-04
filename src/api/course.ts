import request from '@/utils/request';

// 获取项目列表
export function queryCourseList(params: any) {
    return request({
        url: '/api/course/queryCourseList',
        method: 'get',
        params
    });
}

// 新增 & 修改 学生信息
export function saveCourse(params: any) {
    return request({
        url: '/api/course/saveCourse',
        method: 'post',
        params
    });
}

export function deleteCourse(params: any) {
    return request({
        url: '/api/course/deleteCourse',
        method: 'post',
        params
    });
}

