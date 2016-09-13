/**
 * Created by sq on 2016/9/2.
 */
//window.onload = function(){
//    var section = document.querySelector('.section');
//    var sectionHeight = section.offsetHeight;
//    var fullpage = document.querySelector('.fullpage');
//    var index = 0;
//    var startY = 0;
//    var endY = 0;
//
//    fullpage.addEventListener('touchstart',function(e){
//        startY = e.touches[0].clientY;
//    });
//
//    fullpage.addEventListener('touchend',function(e){
//        endY = e.changedTouches[0].clientY;
//
//        if(endY - startY < 0){
//            index++;
//        }else if(endY - startY > 0){
//            index--;
//        }
//
//        if(index > 4 || index < 0){
//            return;
//        }
//
//        addTransition(fullpage);
//        addTransform(fullpage,-sectionHeight*index);
//    });
//
//}
//
//function addTransform(obj,y){
//    obj.style.transform = "translateY("+y+"px)";
//}
//
//function addTransition(obj){
//    obj.style.transition = "all 1s";
//}
//
//function removeTransition(obj){
//    obj.style.transition = "none";
//}

$(function(){
    /*
     * fullpage  是扩展的jQuery
     * fullpage 要求，的每一屏幕都加一个section 的样式.
     * 怎么去每一屏幕怎么去做动画
     * fullpage 调用的fullpage ，这个插件，一般它会提供文档给我们
     * fullpage 我们需要查看文档
     * 接下来就是给这个方法传递参数的问题
     * */
    $("#fullpage").fullpage({
        /*
         *
         *
         * */
        afterLoad:function(aclink,index){
            //这是一个回调函数
            //将一个函数作为参数传递，作为参数传递的函数就是回调函数.
            //你只需要知道这个回调函数什么时候的调用.
            /*我现在要知道的是index*/
            /*
             *
             *   我的目的就是想要页面有动画效果，有css 效果.
             *   js 想要页面有界面效果
             *   可以添加一个类名
             *   滚动到某一屏幕，给他添加一个类名上面，然后在css 里面添加对应的样式
             *  就可以实现页面效果.
             * */
            //假设滚动到第一屏我先给谁
            //$(".section") 是一个数组
            /*
             *   因为页面加载的时候css，加载js，这个操作是同时进行
             *   我可以延迟一小会在动态给这个屏幕添加样式
             * */
            //window.setInterval(function(){},1000) 定时器
            //window.setTimeout(function(){},1000) 1000秒钟之后执行 function(){}
            window.setTimeout(function(){
                $(".section").removeClass("current").eq(index-1).addClass("current");
            },100);

        }
    });
    //轮播图
    slider();
    //第二个屏幕的点击事件
    LiClick();
    //第三个屏幕的点击事件
    dropDownClick();
});

//轮播图
function slider(){
    /**
     * 1.轮播图可以自动播放
     * 2.无缝轮播图
     * 3.轮播图要支持滑动 从左往右滑  切换到上一张 从右往左滑要换到 下一张
     * 4.滑动中要能预览上一张或者下一张
     * 5.滑动距离超过轮播图的1/3的时候才切换 如果不超过 吸附回去
     * 6.切换图片的时候小圆点也要跟着走
     */
    var index = 1;
    var slider = document.querySelector('.slider');
    var sliderWidth = slider.offsetWidth;
    var sliderUl = document.querySelector('.slider ul');

    var timer;
    function timerr(){
        timer = setInterval(function(){
            index++;
            addTransition(sliderUl);
            addTransform(sliderUl,-sliderWidth*index);
        },2000);
    }

    timerr();

    //监听过渡结束事件
    sliderUl.addEventListener('transitionend',function(){
        if(index >= 6){
            index = 1;
            removeTranstiion(sliderUl);
            addTransform(sliderUl,-sliderWidth*index);
        }else if(index <= 0){
            index = 5;
            removeTranstiion(sliderUl);
            addTransform(sliderUl,-sliderWidth*index);
        }

        setPoints();
    });

    //获取小圆点移动
    var points = slider.querySelectorAll('ul:last-child li');
    function setPoints(){
        for(var i = 0;i < points.length;i++){
            points[i].className = '';
        }

        points[index-1].className = 'current';
    }

    var startX = 0;
    var endX = 0;
    var moveX = 0;
    var distanceX = 0;
    /**
     * 1.得知道滑动的距离 如果是正值就切换到 切换到上一张
     * 2.如果是负值就切换到下一张
     * 3.添加2个事件 touchstart touchend  获取开始和结束的位置相减
     */
    slider.addEventListener('touchstart',function(e){
       clearInterval(timer);
       startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend',function(e){
        endX = e.changedTouches[0].clientX;
        if(endX - startX > 0 && Math.abs(endX - startX) > 1/3*sliderWidth){
            index--;
        }else if(endX - startX < 0 && Math.abs(endX - startX) > 1/3*sliderWidth){
            index++;
        }

        addTransform(sliderUl,-sliderWidth*index);
        clearInterval(timer);
        timerr();
    });
    //1.得知道滑动过程中 滑动的距离
    //2.获取到了这个距离 设置到当前的定位位置
    //3. 从上一次最后的位置加上这个距离
    slider.addEventListener('touchmove',function(e){
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        addTransition(sliderUl);
        addTransform(sliderUl,-sliderWidth*index+distanceX);
    });


}

function removeTranstiion(obj){
    obj.style.transition = 'none';
}

function addTransition(obj){
    obj.style.transition = "all 1s";
}

function addTransform(obj,x){
    obj.style.transform = "translateX("+x+"px)";
}

//第二个屏幕的点击事件
function LiClick(){
    var aboutUl = document.querySelector('.about-container ul');
    var aboutP = document.querySelectorAll('.text-center p');
    aboutUl.addEventListener('click',function(e){
        var li = e.target.parentNode;
        var ArrayLi = aboutUl.querySelectorAll('li');
        for(var i = 0; i < ArrayLi.length;i++){
            ArrayLi[i].index = i;
            ArrayLi[i].className = '';
        }

        li.className = 'activee';
        //aboutP对应的索引
        var index = li.index*2;
        if($(aboutP[index]).hasClass('aot-display')){
            $(aboutP[index]).hide(1000).removeClass('aot-display');
            $(aboutP[index+1]).show(1000).addClass('aot-display');
        }else{
            $(aboutP[index]).show(1000).addClass('aot-display');
            $(aboutP[index+1]).hide(1000).removeClass('aot-display');
        }
    });
}

//第三个屏幕的点击事件
function dropDownClick(){
    var dropList = document.querySelectorAll('.main .list .dropdown');
    var picList = document.querySelectorAll('.main .list .pictxt');
    for(var i = 0,len = dropList.length;i < len;i++){
        (function(i){
            dropList[i].onclick = function(){

                if(this.classList.contains('actived')){
                    this.classList.remove('actived');
                    picList[i].classList.remove('actived')
                }else{
                    this.classList.add('actived');
                    picList[i].classList.add('actived')
                }

                for(var j = 0,len = dropList.length;j < len;j++) {
                    if(i !== j){
                        dropList[j].classList.remove('actived');
                        picList[j].classList.remove('actived');
                    }

                }
            }
        }(i));

    }
}

