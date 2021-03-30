const url = 'http://47.98.38.58:8030/' //线上

const api = {
    GetSCQuery: url + 'GetSCQuery', // 宣传列表
    GetSCQueryForId: url + 'GetSCQueryForId', // 宣传列表详情
    GetPXQuery: url + 'GetPXQuery', // 培训列表
    GetPXQueryForId: url + 'GetPXQueryForId', // 培训列表详情
  }
  module.exports = api