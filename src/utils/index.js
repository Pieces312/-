function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 验证手机号码
export const formatPhone = function (val) {
  let phone = /^1[3456789]\d{9}$/.test(val)
  return phone ? '' : '手机号码有误，请重填'
}

// 随机取数组中任意一项
export const getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default {
  formatNumber,
  formatTime,
  formatPhone,
  getRandomItem
}
