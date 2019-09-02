

(function(doc, win) {
    require('jquery')
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth
            if (!clientWidth) return
            docEl.style.fontSize = parseInt(clientWidth / 375 * 100) + 'px'
            var targetRem = parseInt(clientWidth / 375 * 100)
            if (targetRem % 2) { targetRem++ }
            docEl.style.fontSize = targetRem + 'px'
        }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
    $('body').css({
        'display':'block'
    })
     $('body').css('visibility','')
})(document, window);