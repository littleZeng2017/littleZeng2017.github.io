/**
 * Created by Administrator on 2017/3/6.
 */
define(['jquery', 'util', 'template','common','nprogress'], function ($, util, template,undefined,Nprogress) {
    //调用进度条结束的方法
    Nprogress.done();
    /**
     * ˼·
     * 1���Ȼ�ȡ��̬��Ⱦ�����̵�ͷ���ݲ���Ⱦ��
     * 2���ڻ�ȡ�̵�ص��л�ȡ�����������ݲ���Ⱦ
     *    ��ȡ����¼�
     * 3����ȡ��Ʒ��Ⱦ����
     */
    var Shopid = null;
    var Areaid = null;
    $('#coudan_back').on('click', function () {
        location.href = '/';
    })
    //�����л�
    $('#coudan_search').on("click", function () {
        $('#coudan_hidden_search').toggle();
    })
//��ȡ��������
    $.get('http://mmb.ittun.com/api/getgsshop', function (data) {
        console.log(data.result);
        var html = template('shopTpl', {list:data.result});
        Shopid=data.result[0].shopId;
//��ȡ��������
        $.get('http://mmb.ittun.com/api/getgsshoparea', function (data) {
            $('#coudan_area_tpl').html(template('areaTpl',{list: data.result}));
            Areaid = data.result[0].areaId;
            getProduct();
            //�л���������
            $('.coudan_area').on('click', function () {
                //$('.xiaosanjiaoA').toggleClass("icon-xiaosanjiao icon-zhengxiaosanjiao");

                $('#coudan_hidden_area').toggle();
                $('#coudan_hidden_shop').css('display','none');
                getProduct();
            })
            $.get('http://mmb.ittun.com/api/getgsshoparea', function (data) {
                $('#coudan_hidden_area').html(template('area_hiddenTpl', data));
                $(document).on('click','#coudan_hidden_area li',function(){
                    $('.coudan_area').attr('areaId',$(this).children('a').attr('areaHidden'));
                    $('.coudan_area').text($(this).children('a').text());
                    areaHidden = $(this).children('a').attr('areaHidden');

                    Areaid = $(this).children('a').attr('areaHidden')
                    getProduct();
                    $('#coudan_hidden_area').css('display','none');
                });
            })

        $('#coudan_shop_tpl').html(html);
        $('.coudan_shop').on('click', function () {
            //$('.xiaosanjiaoS').toggleClass("icon-xiaosanjiao icon-zhengxiaosanjiao");
            $('#coudan_hidden_shop').toggle();
            $('#coudan_hidden_area').css('display','none');

        });
        $.get('http://mmb.ittun.com/api/getgsshop', function (data) {
            $('#coudan_hidden_shop').html(template('shop_hiddenTpl', data));
            $(document).on('click','#coudan_hidden_shop li',function(){
                $('.coudan_shop').attr('shopId',$(this).children('a').attr('shopHidden'));
                $('.coudan_shop').text($(this).children('a').text());
                shopHidden = $(this).children('a').attr('shopHidden');
                Shopid = $(this).children('a').attr('shopHidden');
                getProduct()
                $('#coudan_hidden_shop').css('display','none');
            });
        })


    });


//��ȡ��������
//    $.get('http://mmb.ittun.com/api/getgsshoparea', function (data) {
//        $('#coudan_area_tpl').html(template('areaTpl',{list: data.result}));
//        $('.coudan_area').on('click', function () {
//            //$('.xiaosanjiaoA').toggleClass("icon-xiaosanjiao icon-zhengxiaosanjiao");
//            Areaid = data.result[0].areaId;
//            $('#coudan_hidden_area').toggle();
//            $('#coudan_hidden_shop').css('display','none');
//        })
//        $.get('http://mmb.ittun.com/api/getgsshoparea', function (data) {
//            $('#coudan_hidden_area').html(template('area_hiddenTpl', data));
//            $(document).on('click','#coudan_hidden_area li',function(){
//                $('.coudan_area').attr('areaId',$(this).children('a').attr('areaHidden'));
//                $('.coudan_area').text($(this).children('a').text());
//                areaHidden = $(this).children('a').attr('areaHidden');
//                getProduct();
//                $('#coudan_hidden_area').css('display','none');
//            });
//        })

    })

//��ȡ��Ʒ


    function getProduct() {
        $.get("http://mmb.ittun.com/api/getgsproduct?shopid="+Shopid+"&areaid="+Areaid, function (data) {
            $('#coudan_product').html(template('coudan_productTpl', {list:data.result}));
        })
    }

})

