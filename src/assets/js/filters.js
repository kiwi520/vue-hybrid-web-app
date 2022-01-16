
import Vue from 'vue'

Vue.filter('priceValue', function (value) {
  if (!value) {
    return ''
  }
  const res = parseFloat(value)

  if (Number.isInteger(res)) {
    return res
  }
  return res.toFixed(2)
})

Vue.filter('formatTime', function (value) {
  if (!value) {
    return ''
  }

  if (value.indexOf(':') === -1) {
    return value
  }

  let res = ''
  const arr = value.split(':')

  if (parseInt(arr[0]) < 10) {
    res = '0' + arr[0]
    res = `0${arr[0]}`
  } else if (parseInt(arr[1]) >= 10) {
    res = arr[0]
  }

  if (parseInt(arr[1]) < 10) {
    res = `${res}:0${arr[1]}`
  } else if (parseInt(arr[1]) >= 10) {
    res = `${res}:${arr[1]}`
  }

  if (parseInt(arr[2]) < 10) {
    res = `${res}:0${arr[2]}`
  } else if (parseInt(arr[2]) >= 10) {
    res = `${res}:${arr[2]}`
  }

  return res
})
