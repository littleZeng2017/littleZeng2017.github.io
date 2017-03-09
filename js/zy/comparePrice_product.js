/**
 * Created by Administrator on 2017/3/7.
 */
define(['jquery','util','template','nprogress','common'],function ($,util,template,nprogress,common) {
    $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:util.queryUrl('categoryId'),pageid:1},function (data) {
        // console.log(data.result);
       $("#product-list_ul").html(template('product_tpl',{list:data.result}));
        // nprogress.done()
       var html = '';
       var index =Math.ceil(data.totalCount/data.pagesize)
       for (var i=0;i<index;i++){
           html +='<option  value='+(i+1)+'>'+ (i+1)+'/'+index +'</option>'
       }
       $("#selectPage").html(html);
//默认显示第一页，先请求第一页的数据
        var page = 1;
        $('#selectPage').on('change',function () {
           page = this.options[this.options.selectedIndex].value;
            $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:util.queryUrl('categoryId'),pageid:page},function (data) {
                $("#product-list_ul").html(template('product_tpl',{list:data.result}));
            })
        })
//下一页，点到那一页加载哪一页
        $(document).on('click','#a2',function () {
            if(page<index){
                page++;
            }else {
                alert('已经是最后一页了');
                return;
            };

            $("#selectPage option").prop('selected',false);
            $("#selectPage option").eq(page-1).prop('selected','selected');

            $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:util.queryUrl('categoryId'),pageid:page},function (data) {
                $("#product-list_ul").html(template('product_tpl',{list:data.result}));
            })
        })

//上一页，点到那一页加载哪一页
        $(document).on('click','#a1',function () {
            if(page>1){
                page--;
            }else {
                alert('已经是第一页了');
                return;
            }
            $("#selectPage option").prop('selected',false);
            $("#selectPage option").eq(page-1).prop('selected','selected');
            $.get('http://139.199.157.195:9090/api/getproductlist',{categoryid:util.queryUrl('categoryId'),pageid:page},function (data) {
                $("#product-list_ul").html(template('product_tpl',{list:data.result}));
            })
        })


        //按品牌筛选
        $(document).on('click','.rowbody li',function () {
            $("#ctl00CPBODYsearchField").css('transform','translate(-100%)')
            $('.mask').css('display','none');
        })
    })
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