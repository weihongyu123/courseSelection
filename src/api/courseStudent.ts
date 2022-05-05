// 选课 退课


import request from '@/utils/request';

// 获取项目列表
export function queryCourseList(params: any) {
    return request({
        url: '/api/studentCourse/queryCourseList',
        method: 'get',
        params
    });
}

// 选课
export function saveCourse(params: any) {
    return request({
        url: '/api/studentCourse/saveCourse',
        method: 'post',
        params
    });
}

export function deleteCourse(params: any) {
    return request({
        url: '/api/studentCourse/deleteCourse',
        method: 'post',
        params
    });
}