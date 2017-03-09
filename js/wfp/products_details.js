/**
 * Created by Administrator on 2017/3/8.
 */
define(['jquery','util','template','nprogress','common'],function ($,util,template,Nprogress,common) {
    //调用进度条结束的方法
    Nprogress.done();
    //获取数据渲染当前页面
    $.get('http://139.199.157.195:9090/api/getproduct',{productid:util.queryUrl('id')},function (data) {
        console.dir(data.result[0]);
        var id = data.result[0].categoryId;
        //实现三级菜单
        $.get('http://139.199.157.195:9090/api/getcategorybyid',{categoryid:id},function (data) {
            console.log(data.result);
            $("#content").html(template("fenlei_tpl",data.result[0]));
            var _id=data.result[0].categoryId
            $(document).on('click','.tiaozhuan',function () {
                location.href='/html/wfp/comparePrice_product.html?categoryId='+_id
            })
        })
        //动态生成图片下的文字内容
        $("#div_ptl").html(template('product_tpl',data.result[0]))
        // var html = ' <ul>'+
        //     '<li class="price">'+
        //     '<span>商品报价</span>'+
        //     '<em>:&nbsp;' +
        //     '<i>&yen;'+ util.queryUrl('productPrice') +'</i>' +
        //     '</em>'+
        //     '</li>'+
        //     '<li class="mall">'+
        //     '<span>最低来自</span>' +
        //     '<em>:&nbsp;京东商城</em>'+
        //     '</li>'+
        //     '<li class="sales">'+
        //     '<span>全网评论</span>' +
        //     '<em>:&nbsp;310979条</em>'+
        //     '</li>'+
        //     '<li class="comment">' +
        //     '<span>优选评论</span>' +
        //     '<em>:&nbsp;4173条</em>' +
        //     '</li>'+
        //     '</ul>';
        // $(".inf").html(html)
    })
    //请求评论区的内容
    $.get('http://139.199.157.195:9090/api/getproductcom',{productid:util.queryUrl('id')},function (data) {
        $("#pl").html(template('pj_tpl',{list:data.result}));
        // nprogress.done();
    })
})