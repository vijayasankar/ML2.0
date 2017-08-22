import Moment from 'moment'
import jwtDecode from 'jwt-decode'

// ----------------------------------------------------------------------------
// Decimal rounding by Mozilla
// ----------------------------------------------------------------------------
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/round
// ----------------------------------------------------------------------------
(function () {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust (type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value)
    }
    value = +value
    exp = +exp
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN
    }
    // If the value is negative...
    if (value < 0) {
      return -decimalAdjust(type, -value, exp)
    }
    // Shift
    value = value.toString().split('e')
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)))
    // Shift back
    value = value.toString().split('e')
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp))
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust('round', value, exp)
    }
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust('floor', value, exp)
    }
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust('ceil', value, exp)
    }
  }
})()

export const alphanumericOnly = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^A-Za-z0-9]/g, '')
  }
  return ''
}

export const calculateGst = (value) => {
  if (typeof value === 'number') {
    const gst = value * 0.15
    return Math.round10(gst, -2)
  }
  return 0
}

// ----------------------------------------------------------------------------
// Using Math.round() instead of .toFixed(2) because of an issue with IE
// ----------------------------------------------------------------------------
export const calculateTotalIncludingGst = (value) => {
  if (typeof value === 'number') {
    const gst = calculateGst(value)
    const totalIncludingGst = Math.round((value + gst) * 1e12) / 1e12
    return Math.round10(totalIncludingGst, -2)
  }
  return 0
}

export const checkListPagingNext = obj => {
  if (!Array.isArray(obj)) {
    return false
  }
  const itemIndex = obj.findIndex(item => item.rel === 'next' || item.rel === 'last')
  return itemIndex > -1
}

export const checkNumbersOnly = (value) => {
  return value.replace(/[^0-9]/g, '')
}

export const checkObjectIsEmpty = obj =>
  obj.constructor === Object && Object.keys(obj).length === 0

export const decodeJwtToken = token => {
  try {
    const decoded = jwtDecode(token)
    const email = decoded.email || ''
    const firstName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] || ''
    const lastName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'] || ''
    return {
      email,
      name: `${firstName} ${lastName}`.trim()
    }
  } catch (err) {
    return {
      email: '',
      name: ''
    }
  }
}

export const formatDollar = (value) => {
  if (
    Boolean(value) === false ||
    value === '0' ||
    value === '0.' ||
    value === '0.0' ||
    value === '0.00'
  ) {
    return ''
  }
  return '$ ' + (value)
}

export const formatFileSize = (bytes, decimal) => {
  if (bytes === 0) return '0 bytes'
  var k = 1024
  var decimals = (typeof decimal === 'undefined') ? 2 : decimal
  var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
}

export const integerNoDecimal = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^0-9]/g, '').replace(/^0+/, '')
  }
  return ''
}

export const integerWithTwoDecimal = (value) => {
  const cleanedVal = (value && value.toString()
    .replace(/[^0-9.]/g, '')
    .replace(/^0+/, '')
    .replace(/\./g, '')
  ) || ''
  const parsedValWithPad = cleanedVal.padStart(3, '0')
  return `${parsedValWithPad.slice(0, -2)}.${parsedValWithPad.slice(-2)}`
}

export const isoDateTolocaleDate = (date = '') => {
  if (!Moment(date, ['YYYY-MM-DD'], true).isValid()) return undefined
  return Moment(date, ['YYYY-MM-DD']).format('DD/MM/YYYY')
}

export const localeDateToIsoDate = (date = '') => {
  if (!Moment(date, ['DD/MM/YYYY'], true).isValid()) return undefined
  return Moment(date, ['DD/MM/YYYY']).format('YYYY-MM-DD')
}

export const matchForPreApprovalRegExp = (value) => {
  if (typeof value === 'string') {
    return value.replace(/[^A-Za-z0-9/]/g, '')
  }
  return ''
}

export const roundToNearest = (condition, input, divisor, positiveOnly) => {
  const value = parseInt(input, 10) || 1
  if (positiveOnly && value < 0) return 0
  if (divisor <= 0) return 0
  let times = 0
  if (condition === '+') {
    times = Math.ceil(value / divisor)
    if (Math.ceil(value % divisor) === 0) {
      times += 1
    }
  } else {
    times = Math.floor(value / divisor)
    if (Math.floor(value % divisor) === 0) {
      times -= 1
    }
  }
  return divisor * times
}

export const roundTwoDecimal = (value) => {
  if (typeof value === 'number') {
    return Math.round10(value, -2)
  }
  return 0
}

export const stepCounter = (condition, input, step, positiveOnly) => {
  const inputValue = parseInt(input, 10) || 0
  let value = 0
  if (positiveOnly && inputValue < 0) return 0
  if (condition === '+') {
    value = inputValue + step
  } else {
    if (positiveOnly && inputValue <= 0) return 0
    value = inputValue - step
  }
  return value
}

export const sumOfFormSelectorFieldsArray = (arr, blacklist = []) => {
  return arr.reduce((acc, v) => {
    const objKey = Object.keys(v)
    const objValue = Object.values(v)
    let value = 0
    if (Array.isArray(objValue)) {
      value = objValue.reduce((acc, v, index) => {
        if (blacklist.indexOf(objKey[index]) > -1) {
          return acc
        }
        const nestedValue = parseInt(v, 10) || 0
        return acc + nestedValue
      }, 0)
    } else {
      value = parseInt(objValue, 10) || 0
    }
    return acc + value
  }, 0)
}

export const sumOfFormSelectorFieldsObject = (obj, blacklist = []) => {
  return Object.values(obj).reduce((acc, v) => {
    const value = parseInt(v, 10) || 0
    return (Array.isArray(v) && acc + sumOfFormSelectorFieldsArray(v, blacklist)) || acc + value
  }, 0)
}

export const sumOfFormSelectorWithTwoDecimalsFieldsArray = (arr, blacklist = []) => {
  return arr.reduce((acc, v) => {
    const objKey = Object.keys(v)
    const objValue = Object.values(v)
    let value = 0
    if (Array.isArray(objValue)) {
      value = objValue.reduce((acc, v, index) => {
        if (blacklist.indexOf(objKey[index]) > -1) {
          return acc
        }
        const nestedValue = parseFloat(v) || 0
        return acc + nestedValue
      }, 0)
    } else {
      value = parseFloat(objValue) || 0
    }
    return acc + value
  }, 0)
}

export const sumOfFormSelectorWithTwoDecimalsFieldsObject = (obj, blacklist = []) => {
  return Object.values(obj).reduce((acc, v) => {
    const value = parseFloat(v) || 0
    const sum = (Array.isArray(v) && (
      parseFloat(acc) + sumOfFormSelectorWithTwoDecimalsFieldsArray(v, blacklist)
    )) || (parseFloat(acc) + value)
    return Math.round10(sum, -2)
  }, 0)
}
