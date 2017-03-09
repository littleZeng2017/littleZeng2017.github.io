    /**
     * Created by Administrator on 2017/3/7.
     */
     //�Ż���Ʒ�б�ҳ��--by hcx
    define(['jquery','template','common','nprogress'], function($,template,undefinded,Nprogress){
        //调用进度条结束的方法
        Nprogress.done();
        //�Ż�ȯcheepCardҳ������
        $.get('http://139.199.157.195:9090/api/getcoupon',function(data){
            $('.box-cart').html(template('cheepCard',data));
            //console.log($('.box-cart').html(template('cheepCard',data)))
        });
    });

