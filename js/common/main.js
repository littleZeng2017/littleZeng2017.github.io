requirejs.config({
    baseUrl: '/',
    paths: {
        //第三方库
        jquery: 'lib/jquery/jquery.min',
        bootstrap: 'lib/bootstrap/js/bootstrap.min',
        template:'lib/artTemplate/template',
        util:'js/common/util',
        nprogress:'lib/nprogress/nprogress',
        common:'js/common/common',
        swipe:'lib/swipe/swipe',
        // 配置首页的js (董琳)
        index:'js/dl/index',

        //配置比价搜索的js(王福平)
        comparePrice:'js/wfp/comparePrice',
        comparePrice_product:'js/wfp/comparePrice_product',
        productsDetails:'js/wfp/products_details',

        //配置国内折扣的js(胡嘉成)
        discountList:'js/Discount/discount_list',
        discountDetails:'js/Discount/discount_details',
        login:'js/User/login',
        reg:'js/User/reg',

        //配置白菜价的js(曾元)
        cabbagePrice:'js/zy/cabbagePrice',

        //配置海淘折扣的js(梁晓华)
        haitao:'js/lxh/haitao',
        haitao_xqing:'js/lxh/haitao_xqing',
        //配置优惠券的js(何春雄)

        //配置凑单品的js(龙泽恩)
		addSingle: 'js/lze/addSingle',

        //配置商城导航的js(曾元)
        storeNavs:'js/zy/storeNavs',

        //配置品牌大全的js（林瑜）
        priceList:'js/ly/priceList',
        priceTwo:'js/ly/priceTwo',

        //配置省钱控(刘蓉)
        savemoney:'js/lr/savemoney',
        //配置优惠券（何春雄）
        cheepCard:'js/hcx/cheepCard',
        couponproductCheep:'js/hcx/couponproduct-cheep'

    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: '$'
        },
        swipe:{
            exports:'itcast'
        }
    }
});
//最先加载进度条插件
require(['nprogress'],function(NProgress){
    //加载进度条
    NProgress.start();
});
//所有都是依赖于bootstrap、jq、common
require(['jquery', 'bootstrap']);
//根据url来判断不同的模块加载不同的js
//沙箱模式
(function (w) {
    //获取到每个页面的目录路径
    var path = w.location.pathname;
    console.log(path);
    //加载js模块
    //根据不同的路径加载其网页对应的js
    switch (path) {
        //胡嘉成
        case "/html/Discount/inlanddiscount.html":
            require(['discountList']);
            break;
        case "/html/Discount/discount_details.html":
            require(['discountDetails']);
            break;
        case "/html/User/login.html":
            require(['login']);
            break;
        case "/html/User/reg.html":
            require(['reg']);
            break;
        //王福平
        case "/html/wfp/category.html":
            require(['comparePrice']);
            break;
        case "/html/wfp/comparePrice_product.html":
            require(['comparePrice_product']);
            break;
        case "/html/wfp/products_details.html":
            require(['productsDetails']);
            break;
        //龙泽恩
	    case "/html/lze/gsproduct.html":
            require(['addSingle']);
            break;
        //梁晓华
        case "/html/lxh/brandTitle.html":
            require(['haitao']);
            break;
        case "/html/lxh/haitao_xqing.html":
            require(['haitao_xqing']);
            break;
        //林瑜
        case "/html/ly/brandTitle.html":
            require(['priceList']);
            break;
        case "/html/ly/priceTwo.html":
            require(['priceTwo']);
            break;
        //董琳
        case "/index.html":require(['index']);
            break;
        //曾元
        case '/html/zy/baicaijia.html':require(['cabbagePrice']);
            break;
        case '/html/zy/sitenav.html':require(['storeNavs']);
            break;
        //刘蓉
        case '/html/lr/brandTitle.html':require(['savemoney']);
            break;
         //何春雄
        case '/html/hcx/coupon.html':require(['cheepCard']);
            break;
        case '/html/hcx/couponproduct.html':require(['couponproductCheep']);
            break;
    };


})(window)

