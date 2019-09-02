import '../js/rem.js'
import a from '../css/reset.css'
import b from '../css/article.css'


$(function() {
  const arr = []
  const img = require('../image/article.png')
  $.ajax({
    url: '/api/posts/' + getValue().id,
    type: 'get',
    success: function(res) {
      console.log(res)
      const list = res.post
      // console.log(list)
       const imglogo =!list.user?require('../image/logo.png'):list.user.avatar?list.user.avatar: require('../image/logo.png')
      document.title = list.title
      $('nav img').prop('src', list.coverImage)
      $('#topHeader img').prop('src', imglogo)
      $('.title').text(list.title)
      $('.time').text(parseTime(list.createdAt))
      $('.name').text(list.user.nickName||'大白')
      $('.dec').text(list.description)
      $('.article').html(list.richText)

      $('#loading').hide();
    }
  })
  const filter = { limit: 10, where: { type: 3 }}
  $.ajax({
    url: '/api/posts',
    type: 'get',
    dataType: 'json',
    data: { filter: JSON.stringify(filter) },
    success: function(res) {
      const list = res.posts
      const add = getRandomArrayElements(list, 10)
      $.each(add, function(index, value) {
        arr.push(`
          <div class="column">
                 <img src="${value.coverImage}" >
                 <div class="topics"> <img src=${img} alt=""></div>
                 <p>${value.title}</p>
            </div>
                 `)
      })
      $('#downclick').html(arr)
    }
  })

  $('#upclick').click(() => {
    window.location.href = 'https://www.pgyer.com/2s2V'
  })
  $('#downclick').click(() => {
    window.location.href = 'https://www.pgyer.com/2s2V'
  })
})

function getValue(url) {
  // 首先获取地址
  var url = url || window.location.href
  // 获取传值
  var arr = url.split('?')
  // 判断是否有传值
  if (arr.length == 1) {
    return null
  }
  // 获取get传值的个数
  var value_arr = arr[1].split('&')
  // 循环生成返回的对象
  var obj = {}
  for (var i = 0; i < value_arr.length; i++) {
    var key_val = value_arr[i].split('=')
    obj[key_val[0]] = key_val[1]
  }
  return obj
}

function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0); var i = arr.length; var min = i - count; var temp; var index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
