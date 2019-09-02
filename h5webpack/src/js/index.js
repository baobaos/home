import '../js/rem.js'
import a from '../css/index.css'
import b from '../css/reset.css'

var video = document.querySelector('#videodurat')
var playBtn = document.querySelector('#btn')

$(function() {
  const img = require('../image/video.png')

  const arr = []
  $.ajax({
    url: '/api/posts/' + getValue().id,
    type: 'get',
    success: function(res) {

      const list = res.post
      const imglogo = !list.user ? require('../image/logo.png') : list.user.avatar ? list.user.avatar : require('../image/logo.png')
      document.title = list.title
      $('#title').text(list.title)
      $('#centerclick img').prop('src', imglogo)
      $('#videodurat').prop('src', list.videoSrcs)
      $('#small_img').prop('src', list.coverImage)
      $('#video_img').prop('src', list.coverImage)

      $('#loading').hide();
    }
  })

  const filter = { limit: 20, where: { type: 1 } }

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
      $('.content').html(arr)

    }
  })

  $('#topHeader').click(() => {
    // window.location.href = 'https://www.pgyer.com/2s2V'
    // window.location = "app://test";  
    openApp("app://test",'https://www.pgyer.com/2s2V')
  })
  $('#upclick').click(() => {
    window.location.href = 'https://www.pgyer.com/2s2V'
  })
  $('#downclick').click(() => {
    window.location.href = 'https://www.pgyer.com/2s2V'
  })
})

$('#btn').on('click', () => {
  $('#video_img').hide()
  $('#btn').hide()
  $('.video_main').animate({ height: '2.5rem' })

  video.play()
})


function openApp(openUrl, callback) {
        //区分是否android和ios方法
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            openUrl = "app://test"
        }else if(isIos){
            window.location.href = '调起ios端的链接?拼接参数（scheme链接找ios端的同事要）';
        }
        //检查app是否打开
        function checkOpen(cb){
            var _clickTime = +(new Date());
            function check(elsTime) {
                if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                    cb(1);
                } else {
                    cb(0);
                }
            }
            //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
            var _count = 0, intHandle;
            intHandle = setInterval(function(){
                _count++;
                var elsTime = +(new Date()) - _clickTime;
                if (_count>=100 || elsTime > 3000 ) {
                    clearInterval(intHandle);
                    check(elsTime);
                }
            }, 20);
        }
        //在iframe 中打开APP
        var ifr = document.createElement('iframe');
        ifr.src = openUrl;
        ifr.style.display = 'none';
        if (callback) {
          console.log(44)
            checkOpen(function (opened) {//checkOpen中的cbk参数 = function (opened)
                if(opened == 0){
                   window.location.href = 'https://www.pgyer.com/2s2V'
                }else if(opened ==1){
                   // alert(1)
                }
            });
            }
        document.body.appendChild(ifr);
        setTimeout(function() {
            document.body.removeChild(ifr);
        }, 3000);
    }


  function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0);
    var i = arr.length;
    var min = i - count;
    var temp;
    var index
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random())
      temp = shuffled[index]
      shuffled[index] = shuffled[i]
      shuffled[i] = temp
    }
    return shuffled.slice(min)
  }

// 进入全屏
function FullScreen(ele) {
  var ele = ele[0]

  if (ele.requestFullscreen) {
    ele.requestFullscreen()
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen()
  } else if (ele.webkitRequestFullScreen) {
    ele.webkitRequestFullScreen()
  }
}
// 退出全屏
function exitFullscreen(ele) {
  var de = document
  if (de.exitFullscreen) {
    de.exitFullscreen()
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen()
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen()
  }
}

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

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
