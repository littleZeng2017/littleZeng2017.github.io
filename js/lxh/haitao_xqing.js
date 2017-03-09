define(['jquery','template','nprogress'], function ($,template,Nprogress) {
    //调用进度条结束的方法
    Nprogress.done();
    var pro_id=localStorage.getItem("pro_id");
    console.log(pro_id);
    $.get(('http://139.199.157.195:9090/api/getmoneyctrlproduct?productid='+pro_id), function (data) {
        $('#haitao_pro').html(template('hao_pro_tpl',{list:data.result}))
        $('#comment').html(template('comment_tpl',{list:data.result}))
    })



    $('#haitao_pro_back').on('click', function () {
        localStorage.removeItem("pro_id")
        history.back()&&location.reload()

    })
});//define--x
