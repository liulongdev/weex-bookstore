const stream = weex.requireModule('stream')
const mobileUtil = weex.requireModule('mxrutil')
let mxrUtil = {
  get: get,
  post: post,
  mxrEncoder: mxrEncoder,
  mxrDecoder: mxrDecoder,
  platform: platform,
  isIOS: isIOS,
  isAndroid: isAndroid,
  isWeb: isWeb,
  getBookPath: getBookPath
}

function platform () {
  return weex.config.env.platform
}

function isIOS () {
  return weex.config.env.platform === 'iOS'
}

function isAndroid () {
  return weex.config.env.platform === 'Android'
}

function isWeb () {
  return weex.config.env.platform === 'Web'
}

function get (api, param, callback) {
  if (isIOS()) {
    let option = {
      'url': 'https://bs-api.mxrcorp.cn' + api,
      'method': 'get'
    }
    if (param) {
      option['query'] = param
    }
    return mobileUtil.fetch(option, callback)
  }
  if (param !== undefined || param !== null) {
    api = api + '?'
    for (let key in param) {
      api = api + key + '=' + param[key] + '&'
    }
  }
  // neet to do
  let headers = 'aLIAAAAmTxwcEB94HU9XT1lPWX8gHjkAGRBvR19cb2VvLB0BK0hfXlZaW59nj5qbnJ2bYX+Rb63Sw9be2oSpb5dvb4V/n4qSlpqbX2dPXU9FT46hobSpb0dvXlFRXV1ZWV1dQUEdHRkZHR0RER0dGRkdHWFhHR0ZGRxvFR8pKtMmLiIswxQeHBJPZ19qa1hsU2BvbWJOTlleWEFPP11iT01SVERBaGSfbWxhkWabnpGPKA=='
  return stream.fetch({
    method: 'GET',
    type: 'json',
    headers: {'mxr-key': headers},
    url: 'https://bs-api.mxrcorp.cn' + api
  }, callback)
}

function post (api, param, callback) {
  if (isIOS()) {
    let option = {
      'url': 'https://bs-api.mxrcorp.cn' + api,
      'method': 'post'
    }
    if (param) {
      option['body'] = param
    }
    return mobileUtil.fetch(option, callback)
  } else if (param !== undefined || param !== null) {
    let httpBody = JSON.stringify(param)
    // need to do 加密
    return stream.fetch({
      method: 'POST',
      type: 'json',
      url: 'https://bs-api.mxrcorp.cn' + api,
      body: httpBody
    }, callback)
  }
  // neet to do
  let headers = 'aLIAAAAmTxwcEB94HU9XT1lPWX8gHjkAGRBvR19cb2VvLB0BK0hfXlZaW59nj5qbnJ2bYX+Rb63Sw9be2oSpb5dvb4V/n4qSlpqbX2dPXU9FT46hobSpb0dvXlFRXV1ZWV1dQUEdHRkZHR0RER0dGRkdHWFhHR0ZGRxvFR8pKtMmLiIswxQeHBJPZ19qa1hsU2BvbWJOTlleWEFPP11iT01SVERBaGSfbWxhkWabnpGPKA=='
  return stream.fetch({
    method: 'POST',
    type: 'json',
    header: {'mxr-key': headers},
    url: 'https://bs-api.mxrcorp.cn' + api
    // url: 'http://10.242.69.181:8089/yanxuan/' + api
  }, callback)
}

function mxrEncoder (str) {
  const PACKET_HEADER_SIZE = 5
  if (typeof str === 'object') {
    str = JSON.stringify(str)
  }
  let strBuf = Buffer.from(str, 'utf-8')
  const strBufLength = strBuf.length
  const random = Math.ceil(Math.random() * 127)

  for (let bufIndex = 0; bufIndex < strBufLength; bufIndex++) {
    strBuf[bufIndex] = (strBuf[bufIndex] + (bufIndex ^ random)) ^ (random ^ (strBufLength - bufIndex))
  }

  let myBuffer = Buffer.alloc(PACKET_HEADER_SIZE)
  myBuffer[0] = random
  myBuffer[1] = PACKET_HEADER_SIZE + strBufLength

  let newBuffer = Buffer.concat([myBuffer, strBuf], PACKET_HEADER_SIZE + strBuf.length)
  return newBuffer.toString('base64', 0, PACKET_HEADER_SIZE + strBufLength)
}

function mxrDecoder (str) {
  const PACKET_HEADER_SIZE = 5
  if (typeof str === 'object') {
    str = JSON.stringify(str)
  }
  let buffer = Buffer.from(str, 'base64')
  const bufferLength = buffer.length
  if (bufferLength <= PACKET_HEADER_SIZE) {
    return undefined
  }

  const random = buffer[0]

  const size = bufferLength - PACKET_HEADER_SIZE
  let retBuf = Buffer.alloc(size)
  for (let bufIndex = 0; bufIndex < size; bufIndex++) {
    retBuf[bufIndex] = (buffer[PACKET_HEADER_SIZE + bufIndex] ^ (random ^ (size - bufIndex))) - (bufIndex ^ random)
  }

  return retBuf.toString()
}

function getBookPath (bookGuid, callback) {
  mobileUtil.getBookPath(bookGuid, callback)
}

module.exports = mxrUtil
