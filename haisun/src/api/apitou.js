const url = 'http://47.98.38.58:8002/' //线上
// http://47.98.38.58:8002/
  // https://htx.haishun.com/
const api = {
  GetEmployeeInformationHomeDataAsync: url + 'GetEmployeeInformationHomeDataAsync', // 获取用户信息
  QueryComplianceForHomeDataAsync: url + 'QueryComplianceForHomeDataAsync', // 获取合规流程单
  QueryContractManageForHomeDataAsync: url + 'QueryContractManageForHomeDataAsync', // 获取合同管理
  QueryNetIncomeForHomeDataAsync: url + 'QueryNetIncomeForHomeDataAsync', // 获取投诉签约

  QueryOrderIncomeForHomeDataAsync: url + 'QueryOrderIncomeForHomeDataAsync', // 获取财务收入
  }
  module.exports = api
