const stream = weex.requireModule('stream')
const mobileUtil = weex.requireModule('mxrutil') // 实现了加解密操作
let mxrUtil = {
  get: get,
  post: post,
  mxrEncoder: mxrEncoder,
  mxrDecoder: mxrDecoder,
  platform: platform,
  isIOS: isIOS,
  isAndroid: isAndroid,
  isWeb: isWeb,
  getBookPath: getBookPath,
  weexLocation: 'http://liulong.site/weex', // js所在的服务器地址
  mxrTransfromApi: 'http://liulong.site/api/mxr/core/weex', // 转换梦想人的服务
  parseUrlParam: parseUrlParam
}

function platform () {
  return weex.config.env.platform
}

function isIOS () {
  return weex.config.env.platform === 'iOS'
}

function isAndroid () {
  return weex.config.env.platform.toLowerCase() === 'android'
  // 有问题
  // return weex.config.env.platform === 'Android'
}

function isWeb () {
  return weex.config.env.platform === 'Web'
}

function get (api, param, callback) {
  const mxrHost = 'https://bs-api.mxrcorp.cn'
  if (weex.supports('@module/mxrutil')) {
    let option = {
      'url': mxrHost + api,
      'method': 'get'
    }
    if (param) {
      option['query'] = param
    }
    return mobileUtil.fetch(option, callback)
  }
  if (isIOS() || isAndroid()) {
    let weexUrl = mxrUtil.mxrTransfromApi
    if (param === undefined || param === null) {
      param = {'mxrUrl': mxrHost + api}
    } else {
      param['mxrUrl'] = mxrHost + api
    }
    if (param !== undefined || param !== null) {
      weexUrl = weexUrl + '?'
      for (let key in param) {
        weexUrl = weexUrl + key + '=' + param[key] + '&'
      }
    }
    let headerJson = {userId: '0', osType: '1', appVersion: '5.30.0', deviceId: '', region: '0', appId: '10000000000000000000000000000001', deviceUnique: '5F3E6EB4-CA01-42B0-BD77-0E72DA409618'}
    const headerJsonStr = JSON.stringify(headerJson)
    return stream.fetch({
      method: 'GET',
      type: 'json',
      headers: {'mxr-key': headerJsonStr},
      url: weexUrl
    }, callback)
  }
  // web
  if (param !== undefined || param !== null) {
    api = api + '?'
    for (let key in param) {
      api = api + key + '=' + param[key] + '&'
    }
  }
  let headerJson = {userId: '0', osType: '1', appVersion: '5.30.0', deviceId: '', region: '0', appId: '10000000000000000000000000000001', deviceUnique: '5F3E6EB4-CA01-42B0-BD77-0E72DA409618'}
  const headerJsonEncoderStr = mxrEncoder(JSON.stringify(headerJson))
  return stream.fetch({
    method: 'GET',
    type: 'json',
    headers: {'mxr-key': headerJsonEncoderStr},
    url: mxrHost + api
  }, (res) => {
    if (res.ok) {
      res.data.Body = mxrDecoder(res.data.Body)
      try {
        res.data.Body = JSON.parse(res.data.Body)
      } catch (e) {
        console.log('>>> parse json error :', e)
      } finally {
        if (callback) {
          callback(res)
        }
      }
    }
  })
}

function post (api, param, callback) {
  const mxrHost = 'https://bs-api.mxrcorp.cn'
  if (weex.supports('mxrutil')) {
    let option = {
      'url': mxrHost + api,
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
      url: mxrHost + api,
      body: httpBody
    }, callback)
  }
  if (isIOS() || isAndroid()) {
    let weexUrl = mxrUtil.mxrTransfromApi
    let headerJson = {userId: '0', osType: '1', appVersion: '5.30.0', deviceId: '', region: '0', appId: '10000000000000000000000000000001', deviceUnique: '5F3E6EB4-CA01-42B0-BD77-0E72DA409618'}
    const headerJsonStr = JSON.stringify(headerJson)
    let httpBody = JSON.stringify(param)
    return stream.fetch({
      method: 'POST',
      type: 'json',
      header: {'mxr-key': headerJsonStr},
      body: httpBody,
      url: weexUrl
    }, callback)
  }
  // web
  let headers = 'aLIAAAAmTxwcEB94HU9XT1lPWX8gHjkAGRBvR19cb2VvLB0BK0hfXlZaW59nj5qbnJ2bYX+Rb63Sw9be2oSpb5dvb4V/n4qSlpqbX2dPXU9FT46hobSpb0dvXlFRXV1ZWV1dQUEdHRkZHR0RER0dGRkdHWFhHR0ZGRxvFR8pKtMmLiIswxQeHBJPZ19qa1hsU2BvbWJOTlleWEFPP11iT01SVERBaGSfbWxhkWabnpGPKA=='
  return stream.fetch({
    method: 'POST',
    type: 'json',
    header: {'mxr-key': headers},
    url: mxrHost + api
  }, (res) => {
    if (res.ok) {
      res.data.Body = mxrDecoder(res.data.Body)
      try {
        res.data.Body = JSON.parse(res.data.Body)
      } catch (e) {
        console.log('>>> parse json error :', e)
      } finally {
        if (callback) {
          callback(res)
        }
      }
    }
  })
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

function parseUrlParam (url) {
  let queryJson = {}
  const index = url.indexOf('?')
  if (index !== -1) {
    const str = url.substr(index + 1)
    if (str.length > 0) {
      const strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        queryJson[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
  }
  return queryJson
}

module.exports = mxrUtil
