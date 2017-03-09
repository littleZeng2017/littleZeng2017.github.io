define(['jquery','bootstrap', 'template','util','common','nprogress'],function($,$,template,util,undefined,Nprogress){

    //调用进度条结束的方法
    Nprogress.done();
    //模板调用helper方法，截取'format'字符串
    function sliceStr(str){
        str=str.slice(1);
        return str.slice(0,str.indexOf('人'));
    }

    template.helper('format',sliceStr);

    var pagecount,pageid;//全局变量
    pageid = util.queryUrl('pageid') || 1;

    //给下拉框赋值
    $('#dropdownMenu2 > #page').html('第'+pageid+'页');

$.get('http://139.199.157.195:9090/api/getmoneyctrl',{pageid:pageid},function(data){


    $('#product-father').html(template('product-tpl', {list:data.result}));
    //渲染完成后，拿到每页数据条数，与商品总条数，得出总页数pagecount
    //console.log(data);
    var pagesize=data.pagesize;
    var totalCount=data.totalCount;
    //console.log(totalCount);
     pagecount=Math.ceil(totalCount/pagesize);
    //console.log(pagecount);

    //动态生成li标签，追加到ul里面
    for(var i=1;i<=pagecount;i++){
        var test='第'+' '+i+' '+"页";
        $('.dropdown-menu').append($('<li class="left-pad "></li>').text(test));
    }
});

    //$('#dropdownMenu1').html('第'+1+"页");//把button里的值写死了
//事件委托，点击li标签，获取第？页
    $('.dropdown-menu').on('click','li',function(){

        $(this).html();
        //截取出了问题：  页数为10-99以上要截取到两位
       pageid=$(this).html().slice(2,4);
        console.log(pageid);
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',{pageid:pageid},function(data){
            $('#product-father').html(template('product-tpl', {list:data.result}));
        });
        $('#dropdownMenu2').html($(this).html());//按钮的值与li连接

});

    $(document).on('touchstart','li',function(){
        $('.dropdown-menu li').removeClass('active');
        $(this).addClass('active');
    });


    //点击下一页，跳转到对应的页面
    $('.a-right').on('click',function(){
        if(pageid>=pagecount){
            alert('已经是最后一页啦');
            return false;
        }
           pageid++;
            $.get('http://139.199.157.195:9090/api/getmoneyctrl',{pageid:pageid},function(data){
                $('#product-father').html(template('product-tpl', {list:data.result}));
                $('#dropdownMenu2').html($('.dropdown-menu li:nth-of-type('+pageid+')').html());
            });

    });

    //点击上一页，跳转到对应的页面
    $('.a-left').on('click',function(){

        if(pageid==1){
            alert('已经是第一页啦');
            return false;
        }
        pageid--;
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',{pageid:pageid},function(data){
            $('#product-father').html(template('product-tpl', {list:data.result}));
            $('#dropdownMenu2').html($('.dropdown-menu li:nth-of-type('+pageid+')').html());
        });
    });
})


