define([],function(){
    return{
        //创建一个方法，不传参数时返回url传递参数的对象，传递参数时返回对应的属性值
        queryUrl:  function(key){
        var href,tempArr,newArr=null,objSearch={};
        href=location.search;
        //截取？
        href=href.slice(1);
        //截取每个属性
        tempArr= href.split('&');
        console.log(tempArr);
        //遍历数组，获取到每一个属性以及属性值，并添加到对象中
        for(var i= 0,len=tempArr.length;i<len;i++){
            newArr=tempArr[i].split('=');
            objSearch[newArr[0]]=newArr[1];
        }
        //判断有没有参数传递，有则返回对应的属性值，无则返回对象
        return  arguments.length?objSearch[key]:objSearch;
    },
        getNowTime:function () {
            //生成当前时间
            var date=new Date();
            //年
            var year=date.getFullYear();
            //月
            var month=date.getMonth()+1;
            //日
            var day=date.getDate();
            //时
            var hours=date.getHours();
            //分
            var minutes=date.getMinutes();
            //秒
            var second=date.getSeconds();
            //当前时间
            var span=document.createElement("span");
            nowTime=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+second;
            return nowTime;
        },

        animate: function(obj,target){
            clearInterval(obj.timerId); // 保证当前标签对象运动的时候，只会开启一个定时器
            obj.timerId=  setInterval(function(){  // 开启定时器
                var leader = obj.offsetLeft; //获取标签对象的当前的位置
                var  step = 20;//定义一个步长
                step=  leader<target?step:-step; //判断步长是正还是负
                if(Math.abs(leader-target)>Math.abs(step)){ //修改判断条件
                    leader = leader + step;//在当前的位置加上步长
                    obj.style.left = leader +'px';
                }else {
                    clearInterval(obj.timerId); //清除当前对象的定时器
                    obj.style.left = target+'px'; //最后不足一个步长的时候，不用迈那一步了，直接设置成目标位置即可
                }
            },15);
        },
    }
})