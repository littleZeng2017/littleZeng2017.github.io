define(['jquery','template','util','common','nprogress'],function($,template,util,undefined,Nprogress){
    //调用进度条结束的方法
    Nprogress.done();
    var id= util.queryUrl('id');
        //储存每张图片的id
        var imgId;

        $.get('http://139.199.157.195:9090/api/getcouponproduct',{couponid:id},function(data){
            //console.log(data.result);
            //把标题直接拼接在url中传到列表页面---截取字符串
            //console.log(location.search);
            //由于做了a标签的锚点，给页面的url添加了一个#，导致需要解码
            data.result[0].couponId =decodeURI(util.queryUrl('couponTitle')) ;
            //console.log(util.queryUrl('couponTitle'));

            //在渲染之前，做映射---不符合灵活的要求
            //switch(data.result[0].couponId){
            //    case 0:
            //        data.result[0].couponId='肯德基';
            //        break;
            //    case 1:
            //        data.result[0].couponId='必胜客';
            //        break;
            //    case 2:
            //        data.result[0].couponId='棒约翰';
            //        break;
            //    case 3:
            //        data.result[0].couponId='哈根达斯';
            //        break;
            //    default:
            //        data.result[0].couponId='更多';
            //}
            $('.shop-show').append(template('cheep-goods',data));
            //遮罩层图片
            $('.imgs').html(template('box-banner',data));



            //控制轮播图的样式
            //注册事件委托
            //获取遮罩层节点
            var box=document.getElementById("box");
            var placeholder=box.firstElementChild;

            var ul=placeholder.children[0];
            var arrow=placeholder.children[1];
            var left=arrow.children[0];
            var right=arrow.children[1];
            var lis=ul.children;
            //获取不到ul的第一个元素---动态创建出来的子元素获取不到
            //console.log(lis);
            //console.log(ul.children[0]);
            $(document).on('click','li',function(e){
                //让遮罩层显示出来
                box.style.display='block';
                //e.stopPropagation();
                //e.preventDefault();

                //$.style('#box','display','block');
                //获取li内图片的编号--couponProductId
                var e= e || window.event;
                var target= e.target || e.srcElement;
                //x寻找点击到的li标签
                target = target=='li'?target:$(target).parents('li');
                //获取li的id值
                //通过自定义属性固定id值
                imgId=parseInt($(target).attr('data-id')) ;
                //console.log(imgId+1);
                //点击定位在对应id的图片

                switch (imgId){
                    //返回的id是一个字符
                    case 57:
                        imgId=0;
                        break;
                    case 58:
                        imgId=0;
                        break;
                    case 59:
                        imgId=0;
                        break;
                    case 60:
                        imgId=1;
                        break;

                };
                //console.log(imgId);--因为动态追加了图片，默认显示
                //默认显示第一张
                imgId+=1;
                ul.style.left=-200*(imgId)+'px';
            });
            //遮罩层的点击事件---清除遮罩层
            box.onclick=function(e){
                //底下的子元素通过冒泡会使用该事件，造成滑动的一些影响
                box.style.display='none';
            }
            //lis=lis.splice(-1,1);//--把“更多优惠”的图片去掉
            //lis.pop('img');
            //console.log(lis);

            //动态克隆第一张图片放在后面
            ul.appendChild(lis[0].cloneNode(true));
            //动态克隆最后一张图片放在前面  第一次克隆后倒数第二张--eg：要给一个参照--插入
            //$('#did').first().insertBefore(divObj);
             var lastimg=lis[lis.length-2].cloneNode(true);
             console.log(lastimg);
            console.log($('.imgs').first());
            $('.imgs').first().prepend(lastimg);
            //console.log(lis[0]);
            //console.log(ul);
            //让轮播点显示出来
            placeholder.onmouseover=function(e){

                arrow.style.display='block';

                //让轮播图动起来
                left.onclick=function(e){
                    box.style.display='block';
                    e.stopPropagation();
                    e.preventDefault();

                    if(imgId==lis.length-1){ // 动态添加后的判断
                        imgId=1; // 动态添加后的判断--原来第0张，是现在的第一张
                        ul.style.left=-200*imgId+'px';
                    }
                    imgId++;
                    util.animate(ul,-200*imgId);

                };

                right.onclick=function(e){
                    box.style.display='block';
                    e.stopPropagation();
                    e.preventDefault();
                    if(imgId==0){
                        imgId=lis.length-2;
                        ul.style.left=-200*imgId+'px';
                    }
                    imgId--;
                    util.animate(ul,-200*imgId);

                };

                placeholder.onclick=function(e){
                    //保证点击图片的时候遮罩层不消失
                    box.style.display='block';
                    e.stopPropagation();
                    e.preventDefault();
                }

            };
            //遮罩层消失
            placeholder.onmouseout=function(){
                arrow.style.display='none';
            }


            //移动端的滑动事件
            var startDistance=0;
            var moveDistance=0;
            var distance=0;
            //给容器添加触摸事件，而不是ul，否则会受到arrow的遮挡
            placeholder.addEventListener('touchstart',function(e){
                e=e || window.event;
                //去掉轮播点
                //arrow.style.display= 'none';
                arrow.style.display= 'block';
                startDistance= e.touches[0].clientX;
                //每次重新点击距离为零
            });
            placeholder.addEventListener('touchmove',function(e){
                e=e || window.event;
                moveDistance= e.touches[0].clientX;

                //if(imgId==0){
                //    imgId=lis.length-1;
                //    ul.style.left=-200*imgId+'px';
                //}//else if (imgId ==lis.length-1){
                //    //这里有bug
                //    imgId=1;
                //    ul.style.left=0+'px';
                //}

                distance =moveDistance - startDistance;
                console.log(distance);
                //把每次移动的距离限定在200之类
                distance = distance >=200? 200:distance;

                util.animate(ul,(-200*imgId + distance));
            });
            placeholder.addEventListener('touchend',function(e){
                e=e || window.event;
                console.log(distance);
                if( Math.abs(distance)>50){//滑动距离超过50，跳下一张
                    if(distance>0){//往右滑动

                        if(imgId==0){
                            imgId=lis.length-2;
                            ul.style.left=-200*imgId+'px';
                        }
                        imgId--;

                    }else{//往左滑动
                        if(imgId==lis.length-1){
                            imgId=1;
                            ul.style.left=imgId+'px';
                        };
                        imgId++;

                    }
                    util.animate(ul,(-200*imgId));
                }else{
                    ul.style.left= -200*imgId + 'px';
                }


                //回复轮播点
                //arrow.style.display= 'block';
            });

        });

});
