;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-fanhui" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiaosanjiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M518.263927 659.475947 719.196104 407.824207c3.892149-4.865186 4.135408-10.946668 0.608148-15.933484-3.52726-4.986816-10.21689-8.149186-17.39304-8.149186L300.546858 383.741537c-7.176149 0-13.86578 3.162371-17.39304 8.149186-1.702815 2.310963-2.432593 4.986816-2.432593 7.541038 0 2.919112 0.973037 5.838223 3.040741 8.392446l200.810548 251.53011c3.648889 4.500297 9.973631 7.297779 16.784891 7.297779C508.290296 666.773726 514.615037 663.976244 518.263927 659.475947L518.263927 659.475947zM518.263927 659.475947"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-appxiazai" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M934.4 139.776l-173.568 0 0 99.328L860.16 239.104c27.648 0 49.664 22.016 49.664 49.664L909.824 834.56c0 27.648-22.016 49.664-49.664 49.664L164.864 884.224c-27.648 0-49.664-22.016-49.664-49.664L115.2 288.256c0-27.648 22.016-49.664 49.664-49.664l99.328 0 0-99.328L90.624 139.264c-40.96 0-74.752 33.28-74.752 74.752L15.872 909.312c0 40.96 33.28 74.752 74.752 74.752l843.776 0c40.96 0 74.752-33.28 74.752-74.752L1009.152 214.016C1009.152 173.056 975.872 139.776 934.4 139.776L934.4 139.776zM809.472 464.384 738.816 394.24l-172.544 172.544 0-482.304c0-20.48-16.896-37.376-37.376-37.376l-24.576 0c-20.48 0-37.376 16.896-37.376 37.376l0 461.312L316.416 394.752 244.224 467.456 518.656 742.4l0 0"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-zhengxiaosanjiao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M262.474627 1023.997015l249.524378-293.436816 249.521393 293.436816L262.474627 1023.997015z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-sousuo_sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1016.132 960.217c9.493 11.052 14.304 23.405 14.304 36.799 0 15.083-5.332 27.957-16.124 38.619-10.143 10.402-24.057 16.254-38.619 16.124-6.241 0-12.483-1.041-18.465-2.99-5.851-1.95-11.313-4.941-16.124-8.841l-5.982-4.811-293.87-295.951c-70.607 49.932-149.536 74.899-236.788 74.899-8.712 0-17.685-0.39-26.787-1.171-8.972-0.78-17.944-1.95-26.787-3.641-60.465-6.891-118.329-28.087-169.042-61.895-55.393-35.628-99.734-82.699-133.152-141.474-15.994-27.306-28.607-56.434-37.449-86.73-9.102-30.558-14.694-62.025-16.644-93.883s-0.13-63.715 5.332-95.052c7.932-50.712 25.747-99.343 52.403-143.295 26.397-44.081 61.114-82.699 102.334-113.517 34.848-27.697 73.987-49.152 117.159-64.235 42.651-14.954 87.511-22.626 132.632-22.626 19.114 0 37.319 1.171 54.744 3.641 46.812 6.372 91.543 20.545 134.453 42.78 42.13 21.586 79.969 50.583 111.827 85.561 37.189 38.88 65.536 84.78 85.041 137.962 19.506 53.053 27.957 107.016 25.617 161.629-3.121 91.153-34.458 173.203-94.012 246.149l295.041 295.951h-1.041zM754.378 416.947c2.6-48.762-5.461-97.394-23.796-142.645-10.402-27.828-24.316-54.222-41.61-78.408-17.425-24.576-37.839-46.552-61.245-65.926-23.016-19.244-48.372-35.368-75.549-48.111-57.993-26.916-122.23-37.189-185.555-29.646-3.641 0-7.151 0.39-10.662 1.171l-7.151 1.171c-50.712 7.802-98.953 27.176-140.954 56.434-42.261 28.737-77.499 66.706-102.855 111.177-29.256 48.372-45.381 102.205-48.242 161.629-2.73 59.424 8.062 114.558 32.768 165.271 20.545 45.9 51.232 86.601 89.851 118.849 38.23 32.768 83.091 56.694 131.461 70.217 50.712 14.304 101.944 17.034 153.437 8.322 27.046-4.811 53.443-12.743 78.538-23.796 25.095-10.922 48.762-24.706 70.738-40.96 21.846-16.254 41.87-35.109 59.554-55.913 17.815-21.065 32.768-43.82 44.601-68.396 21.976-43.69 34.458-91.543 36.669-140.434z" fill="#CCCCCC" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)