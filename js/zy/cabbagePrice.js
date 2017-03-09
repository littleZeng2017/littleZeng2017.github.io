define(['jquery','template','swipe'],function($,template,itcast){


   function getData(){
       //获取导航数据
       $.get('http://mmb.ittun.com/api/getbaicaijiatitle',function(data){
           console.log(data);
           //渲染模板到网页中
           $('.ui-navigator-list').html(template('nav-list-tpl',{list:data.result}));

           //设置滑动的Ul的宽度
           var slideNav=$(".slideNav");
           var liAll=slideNav.find("ul>li");
           var totalWidth=0;
           liAll.each(function(index,value){
               totalWidth+=$(value).outerWidth(true);
           })
           slideNav.find("ul").width(totalWidth);
           console.log($('.wrap').height());
           //导航水平触摸滑动
           itcast.iScroll({
               swipeDom:slideNav[0],
               swipeType:"x",
               swipeDistance:100
           });

           //初始化商品数据
           getShopList(0);
           $('.ui-navigator-list li').first().addClass('ui-state-active');
           //显示当前导航的默认样式
           /*  if($.cookie('titleId')){
            $('.ui-navigator-list li').eq($.cookie('titleId')).addClass('ui-state-active');
            }else{
            $('.ui-navigator-list li').first().addClass('ui-state-active');
            }*/
           //console.log('cookie'+$.cookie('titleId'));

           $('.ui-navigator-list li').on('click',function(){
               //console.log('123');
               //先把之前的样式去掉
               $(this).addClass('ui-state-active').siblings().removeClass('ui-state-active');
               //记录当前的触发的li
               //$.cookie('titleId',$(this).attr('data-titleId'));
               //请求当前的id的商品数据并渲染商品信息到网页中
               var titleid=$(this).attr('data-titleId');
               //str=str.slice(str.indexOf('?'));
               //var titleid=util.queryUrl('cat',str);
               //console.log(str);
               //console.log(titleId);
               getShopList(titleid);
               return false;
           });
           //获取商品数据
           function getShopList(titleid){
               $.get('http://mmb.ittun.com/api/getbaicaijiaproduct',{titleid:titleid},function(data){
                   console.log(data);
                   $('.shopList').html(template('shop-list-tpl',{list:data.result}));
               })
           }
       })
   }
    getData();
    //设置搜索框下拉效果
    var flag=true;
    $('.searchBar').on('click',function(){
        if(flag){
            //显示
            $(this).find(':first-of-type').hide();
            $(this).find(':last-of-type').show();
            flag=false;
            $('.adbanner').css('marginTop',55);
        }else{
            //隐藏
            $(this).find(':first-of-type').show();
            $(this).find(':last-of-type').hide();
            flag=true;
            $('.adbanner').css('marginTop',0);
        }
         $('.search').toggle();
    })
    //设置固定导航
    var H = $("header").offset().top+$('.slideNav').offset().top;

    $(window).scroll(function() {
        //设置固定导航
        var docSccrollTop = $(document).scrollTop();
        if (docSccrollTop > H) {
            $("header").css({
                "position": "fixed",
                "top": 0,
                "zIndex":999
            });
            $(".slideNav").css({
                "position": "fixed",
                "top": '44px',
                "zIndex":999
            });
            // 此时 nav和头部的位置固定，如果不设置 广告部分的margin-top的话，将有一部分内容被挡住nav的高度
            $(".adbanner").css("margin-top", $(".adbanner").height());
            //$('.search').show();
        } else {
            $("header").css({
                "position": "relative"
            }); /*静态定位*/
            $(".slideNav").css({
                "position": "static"
            }); /*静态定位*/
            $(".adbanner").css("margin-top", 10);
            //$('.search').hide();
        }

    });

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
    k_touch("myContent","y");
    //k_touch("up-box","y");
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
                }
            }

        }
        function touchEnd(event){
            console.log(1212);
            if(_end >=0){
                console.log("左滑或上滑  "+_end);
            }else{
                getData();
                //console.log("右滑或下滑"+_end);
                slideDownStep2();
                //刷新成功则
                //模拟刷新成功进入第三步
                setTimeout(function(){
                    console.log(12);
                    slideDownStep3();
                },500);
            }
        }
    }
    /*------------------------------ 下拉刷新结束-------------------------------*/

})
