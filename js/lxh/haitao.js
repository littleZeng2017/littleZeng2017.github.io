
define(['jquery','template','nprogress'], function ($,template,Nprogress) {
    //调用进度条结束的方法
    Nprogress.done();
    /*---渲染模板---*/
    var pageCount;
    $.get('http://139.199.157.195:9090/api/getmoneyctrl', function (data) {
        /*---有多少人评论---*/
        function sliceStr(str){
           str=str.slice(1);
            return str.slice(0,str.indexOf('人'));
        }
        //console.log(sliceStr('有1人评论'));
        template.helper('format',sliceStr);
        //渲染模板
        var html =template('haitao_tpl',{list:data.result});
        /*---页数---*/
        $('#haitao_tpl_list').html(html);
        pageCount=data.totalCount%data.pagesize==0?data.totalCount/data.pagesize:Math.ceil(data.totalCount/data.pagesize);
        $('.selectye').val(1+'/'+pageCount)
        for(var i=1;i<=pageCount;i++){
            var txt= i+ '/'+ pageCount;
            $('#dropdown-menu').append($('<li></li>').text(txt))
        }
        /*for(var i=0)*/

    });
    /*---翻页函数封装---*/
    var fanye=function (){
        $.get(get+id, function (data) {
            var html =template('haitao_tpl',{list:data.result});
            $('#haitao_tpl_list').html(html)
        });
    };
    var id=1;
    var get='http://139.199.157.195:9090/api/getmoneyctrl?pageid=';
    /*---点击翻页---*/
    $('.dropdown-menu').on('click','li', function () {
        console.log($(this))
            id=$(this).html()
            $('.selectye').val(id);
            id=id.split('/');
            id=id[0];
        fanye();
    });
    /*---上一页---*/
    $('#Previous').on('click', function () {
        console.log(id)
        if(id>=2&&id<pageCount){
            if(id>=2){
                id=id*1-1
                fanye();
                console.log(id)
                console.log(typeof id)
                $('.selectye').val(id+'/'+pageCount);
            }
        }else{
            alert('亲,这已经是第一页了')
        }

    });
    /*---下一页---*/
    $('#next').on('click', function () {
        if(id<pageCount){
            id=id*1+1;
            fanye();
            console.log(id)
            console.log(typeof id)
            $('.selectye').val(id+'/'+pageCount);
        }else{
            alert("这已经是最后一页了")
        }
    });
    /*触摸滑动翻页*/
    var startX=0;
    var moveX=0;
    var distanceX=0;
    $(".haitao_list").on("touchstart",function(e){
        console.log(e)
        startX= e.originalEvent.touches[0].clientX;
    });
    $(".haitao_list").on("touchmove",function(e){
        isMove=true;
        moveX= e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
    });
    $(".haitao_list").on("touchend",function(e){
        if(Math.abs(distanceX) > 50 && isMove){
            if(distanceX >0){
                /*上一张*/
                if(id>=2){
                    id=id*1-1
                    fanye();
                    $('.selectye').val(+id+'/'+pageCount);
                }
            }
            else {
                /*下一张*/
                id=id*1+1;
                fanye();
                $('.selectye').val(+id+'/'+pageCount);
            }
        }
    })
    /*---返回上一页---*/
    $('#haitao_back').on('click', function () {
        history.back()
    });
    $('#haitao_tpl_list').on('click','li', function () {
        localStorage.setItem("pro_id", $(this).val());
        location.href="/html/lxh/haitao_xqing.html";
        console.log(localStorage.getItem("pro_id"));
        console.log($(this).val())

    });
});
