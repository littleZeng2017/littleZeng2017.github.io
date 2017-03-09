/**
 * Created by hujiacheng on 2017/3/6.
 */
define(['jquery','template','nprogress'],function ($,template,Nprogress) {
    //调用进度条结束的方法
    Nprogress.done();
    //获取当前屏幕行数
    var maxNum=Math.ceil($(window).height()/245);
    //console.log('国内折扣页面');
    //发送请求获取数据
    function getData() {
        $.get('http://mmb.ittun.com/api/getinlanddiscount',function (data) {
            var html=template('discount_list_tpl',data);
            $('#discount_list').html(html);
            for(var i=0;i<data.result.length;i++){
                var src=$('li').eq(i).find('img').attr('src');
                $('li').eq(i).attr('data-src',src);
                if(i>maxNum*2-1){
                    $('li').eq(i).find('img').attr('src',"");
                }
            }
        });
        console.log('懒加载加载完毕');
    };
    getData();
    /*------------------------------ 懒加载开始-------------------------------*/
    function setImg(index){
        var oDiv=document.getElementById("cxdiv")
        var oUl=oDiv.children[0];
        var aLi=oUl.children;
        var src=aLi[index].getAttribute('data-src');
        $('.img').eq(index).find('img').attr('src',src);
    };
    //获得对象距离页面顶端的距离
    function getH(obj) {
        var h = 0;
        while (obj) {
            h += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return h;
    };
    (window.onscroll = function () {
        var oDiv = document.getElementById('cxdiv');
        var oUl = oDiv.children[0];
        var aLi = oUl.children;
        for (var i = 0, len = aLi.length; i < len; i++) {
            var oLi = aLi[i];
            //检查oLi是否在可视区域
            var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
            var h = getH(oLi);
            if (h < t) {
                setTimeout(setImg( i ), 500);
            }
        }
    })();
    /*------------------------------ 懒加载结束-------------------------------*/
    /*------------------------------ 下拉刷新开始-------------------------------*/
    //第一步：下拉过程
    function slideDownStep1(dist){  // dist 下滑的距离，用以拉长背景模拟拉伸效果
        var slideDown1 = document.getElementById("slideDown1"),
            slideDown2 = document.getElementById("slideDown2");
        slideDown2.style.display = "none";
        slideDown1.style.display = "block";
        slideDown1.style.height = (parseInt("20px") - dist) + "px";
    }
    //第一步：上拉过程
    function slideUpStep1(dist){  // dist 下滑的距离，用以拉长背景模拟拉伸效果
        var slideUp1 = document.getElementById("slideUp1"),
            slideUp2 = document.getElementById("slideUp2");
        slideUp2.style.display = "none";
        slideUp1.style.display = "block";
        slideUp1.style.height = (parseInt("20px") + Math.abs(dist)) + "px";
    }

    //第二步：下拉，然后松开，
    function slideDownStep2(){
        var slideDown1 = document.getElementById("slideDown1"),
            slideDown2 = document.getElementById("slideDown2");
        slideDown1.style.display = "none";
        slideDown1.style.height = "20px";
        slideDown2.style.display = "block";
        //刷新数据
        //location.reload();
    }
    //第二步：上拉，然后松开，
    function slideUpStep2(){
        var slideUp1 = document.getElementById("slideUp1"),
            slideUp2 = document.getElementById("slideUp2");
        slideUp1.style.display = "none";
        slideUp1.style.height = "20px";
        slideUp2.style.display = "block";
    }
    //第三步：刷新完成，回归之前状态
    function slideDownStep3(){
        var slideDown1 = document.getElementById("slideDown1"),
            slideDown2 = document.getElementById("slideDown2");
        slideDown1.style.display = "none";
        slideDown2.style.display = "none";
    }
    //第三步：刷新完成，回归之前状态
    function slideUpStep3(){
        var slideUp1 = document.getElementById("slideUp1"),
            slideUp2 = document.getElementById("slideUp2");
        slideUp1.style.display = "none";
        slideUp2.style.display = "none";
    }
    //下滑刷新调用
    k_touch("cxdiv-box","y");
    k_touch("up-box","y");
    //contentId表示对其进行事件绑定，way==>x表示水平方向的操作，y表示竖直方向的操作
    function k_touch(contentId,way){
        var _start = 0,
            _end = 0,
            _content = document.getElementById(contentId);
        //console.log(document.getElementById(contentId));
        _content.addEventListener("touchstart",touchStart,false);
        _content.addEventListener("touchmove",touchMove,false);
        _content.addEventListener("touchend",touchEnd,false);
        function touchStart(event){
            console.log(event);
            //var touch = event.touches[0]; //这种获取也可以，但已不推荐使用

            var touch = event.targetTouches[0];
            if(way == "x"){
                _start = touch.pageX;
            }else{
                _start = touch.pageY;
            }
        }
        function touchMove(event){
            var touch = event.targetTouches[0];
            if(way == "x"){
                _end = (_start - touch.pageX);
            }else{
                _end = (_start - touch.pageY);
                //下滑才执行操作
                if(_end < 0){
                    slideDownStep1(_end);
                }else {
                    slideUpStep1(_end);
                }
            }

        }
        function touchEnd(event){
            if(_end >=0){
                console.log("左滑或上滑  "+_end);
                slideUpStep2();
                setTimeout(function(){
                    slideUpStep3();
                },1000);
            }else{
                getData();
                //console.log("右滑或下滑"+_end);
                slideDownStep2();
                //刷新成功则
                //模拟刷新成功进入第三步
                setTimeout(function(){
                    slideDownStep3();
                },1000);
            }
        }
    }
    /*------------------------------ 下拉刷新结束-------------------------------*/
})