/**
 * Created by Pig on 2017/3/8.
 */
define(['jquery', 'template', 'util','common','nprogress'], function ($, template, util,undefined,Nprogress) {
    //调用进度条结束的方法
    Nprogress.done();
    //获取到当前品牌的数据
    var categoryid = util.queryUrl('categoryId');
    //获取到对应的商品列表
    getNextPage(1);

    var pageId = 1;
    //定义一个Pageid用来获取要跳转的页数
    //注册点击事件，实现下一页
    $('#a2').on('click', function () {
        pageId++;
        if (pageId > maxPage) {
            console.log('下一页数' + pageId);
            pageId = maxPage;
            alert('已经是最后一页了');
            return false;
        } else {
            console.log('下一页数' + pageId);
            //getNextPage(pageId);
            getRenderPage(pageId);
            console.log(12);
            //设置当前的select为对应的页数
            $('#selectPage').val(pageId);
        }
    })

    function getRenderPage(pageid){
        /*3.2:计算出起始位置*/
        var start=(pageid-1)*pageSize;
        /*3.3截取指定长度的元素，存储到新数组中*/
        //console.log(renderData.result);
        //console.log(renderData.result.slice(10,11));
        var data=(renderData.result).slice(start,pageSize+start);
        $('#product-list_ul').html(template('product_tpl',{result:data}));
    }

    //注册点击事件，实现上一页
    $('#a1').on('click', function () {
        pageId--;
        if (pageId <= 0) {
            console.log('上一页数' + pageId);
            alert('已经是第一页了！');
            pageId = 1;
            return false;
        } else {
            console.log('上一页数' + pageId);
            //getNextPage(pageId);
            getRenderPage(pageId);
            $('#selectPage').val(pageId);
        }


    })
    //给select框注册文本改变事件
    $('#selectPage').on('change', function () {
        console.log($(this).val());
        pageId = $(this).val();
        getRenderPage($(this).val());
    })

    //点击价格排序时，实现当前页的排序功能
    var count = 1;
    //点击排序
    $('#price-sort').on('click', function () {
        count++;
        if (count % 2 == 0) {
            //实现升序排列
            $(this).find('i').removeClass('fa-caret-up').addClass('fa-caret-down');

            console.table(renderData);
            renderData.result.sort(function (a, b) {
                //按照从小到大进行排序
                //return (sliceStr(a['productPrice'])) > (sliceStr((b['productPrice'])));
                return sliceStr(a['productPrice']) - sliceStr(b['productPrice']);
            })
            console.table(renderData.result);
            getRenderPage(pageId);

        } else {
            $(this).find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
            renderData.result.sort(function (a, b) {
                //按照从大到小进行排序
                return sliceStr((b['productPrice'])) - sliceStr(a['productPrice']);
            })
            console.table(renderData.result);
            getRenderPage(pageId);

        }

        //发送ajax请求获取到当前的数据

        return false;
    });

    //用来处理价格字符串
    function sliceStr(str) {
        //console.log(+(str.slice(1)));
        return +(str.slice(1));
    }
    var maxPage = 0;
    var pageSize = 0;
    var totalCount = 0;
    var renderData = {};
    renderData.result=[];

    //按品牌筛选
    $(document).on('click','.rowbody li',function () {
        $("#ctl00CPBODYsearchField").css('transform','translate(-100%)')
        $('.mask').css('display','none');
    })

    //发送ajax
    function getNextPage(pageid) {
        $.get('http://mmb.ittun.com/api/getproductlist', {categoryid: categoryid, pageid: pageid}, function (data) {
            console.log(pageid+'====页数');
            console.log(data);
            $('#product-list_ul').html(template('product_tpl', data));
            pageSize = data.pagesize;
            totalCount = data.totalCount;

            //第一次更新数据的时候才去获取到页数
            if (totalCount % pageSize != 0) {
                maxPage = parseInt(totalCount / pageSize) + 1;
            } else {
                maxPage = parseInt(totalCount / pageSize);
            }
            for (var i = 0; i < maxPage; i++) {
                str = '<option value="' + (i + 1) + '">第' + (i + 1) + '页\/' + pageSize + '</option>'
                $('#selectPage').append(str);
            }
            //根据页数获取到所有要渲染的数据
            for (var i = 1; i <= maxPage; i++) {
                (function (i) {
                    $.get('http://mmb.ittun.com/api/getproductlist', {
                        categoryid: categoryid,
                        pageid: i
                    }, function (data) {
                        renderData.result = renderData.result.concat(data.result);
                        //console.log(renderData.result);
                    });
                })(i);
            }
        })


    }

    //点击商品链接，跳转到相对应页面
    $(document).on('click','.item',function () {
        console.log($(this));
        var id = $(this).find('.goto').attr('data_id')
        var xx = $(this).find('.inf>.price').html().substring(2);
        location.href='/html/wfp/products_details.html?id='+id+'&productPrice='+xx;
    });
    // 点击筛选按钮显示出筛选内容
    $(document).on('click','.filter',function () {
        $('.mask').css('display','block');
        $("#ctl00CPBODYsearchField").css('transform','translate(0)')
    })
    //筛选
    $(document).on('click','.down',function () {
        if($(this).parent().next().hasClass('heightauto')){
            $(this).parent().next().removeClass('heightauto');
            $(this).addClass('icon-xiangxiajiantou').removeClass('icon-xiangshangjiantou');
        }else {
            $(this).parent().next().addClass('heightauto');
            $(this).addClass('icon-xiangshangjiantou').removeClass('icon-xiangxiajiantou');
        }
    });
    //关闭遮罩层
    $(document).on('click','.headtit',function () {
        $("#ctl00CPBODYsearchField").css('transform','translate(-100%)')
        $('.mask').css('display','none');
    });
})