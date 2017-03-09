define(['jquery', 'template', 'util','common','nprogress'], function ($, template, util,undefined,Nprogress) {

    //调用进度条结束的方法
    Nprogress.done();

    //获取到对应的牌子排行的相关信息
    var brandtitleid = util.queryUrl('brandtitleid');
    console.log(brandtitleid);
    $.get('http://mmb.ittun.com/api/getbrand', {brandtitleid: brandtitleid}, function (data) {
        //console.log(data);
        //渲染模板到网页中显示
        $('.two_lis>ul').html(template('twoone', data));
    });
    //获取到该产品下的牌子商品信息
    $.get('http://mmb.ittun.com/api/getbrandproductlist',{brandtitleid: brandtitleid,pagesize:5},function(data){
        //渲染模板到网页中显示
        $('.sales_lis>ul').html(template('twotwo', data));
        //根据当前的最新的第一个productID来获取对应的用户评论
        var productid=$('.sales_lis li').eq(0).attr('data-id');
        console.log(productid);
        proimg=data.result[0].productImg;
        console.log(proimg);
        proname=data.result[0].productName;
        $.get('http://mmb.ittun.com/api/getproductcom',{productid:productid},function(data){
            data.productImg=proimg;
            data.productName=proname;
            $('.users_lis>ul').html(template('twothree',data));
        })
    })

})