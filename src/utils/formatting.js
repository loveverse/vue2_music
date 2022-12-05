

function addZero(str) {
  return ('00' + str).substr(str.length)
}

export default function formatDate(timestamp, fmt) {
  let time = new Date(timestamp)
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  var t = {
    'M+': time.getMonth() + 1,
    'D+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds()
  }
  for (var i in t) {
    if (new RegExp(`(${i})`).test(fmt)) {
      let str = t[i] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : addZero(str))
    }
  }
  return fmt
}