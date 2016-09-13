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
     * fullpage  ����չ��jQuery
     * fullpage Ҫ�󣬵�ÿһ��Ļ����һ��section ����ʽ.
     * ��ôȥÿһ��Ļ��ôȥ������
     * fullpage ���õ�fullpage ����������һ�������ṩ�ĵ�������
     * fullpage ������Ҫ�鿴�ĵ�
     * ���������Ǹ�����������ݲ���������
     * */
    $("#fullpage").fullpage({
        /*
         *
         *
         * */
        afterLoad:function(aclink,index){
            //����һ���ص�����
            //��һ��������Ϊ�������ݣ���Ϊ�������ݵĺ������ǻص�����.
            //��ֻ��Ҫ֪������ص�����ʲôʱ��ĵ���.
            /*������Ҫ֪������index*/
            /*
             *
             *   �ҵ�Ŀ�ľ�����Ҫҳ���ж���Ч������css Ч��.
             *   js ��Ҫҳ���н���Ч��
             *   �������һ������
             *   ������ĳһ��Ļ���������һ���������棬Ȼ����css ������Ӷ�Ӧ����ʽ
             *  �Ϳ���ʵ��ҳ��Ч��.
             * */
            //�����������һ�����ȸ�˭
            //$(".section") ��һ������
            /*
             *   ��Ϊҳ����ص�ʱ��css������js�����������ͬʱ����
             *   �ҿ����ӳ�һС���ڶ�̬�������Ļ�����ʽ
             * */
            //window.setInterval(function(){},1000) ��ʱ��
            //window.setTimeout(function(){},1000) 1000����֮��ִ�� function(){}
            window.setTimeout(function(){
                $(".section").removeClass("current").eq(index-1).addClass("current");
            },100);

        }
    });
    //�ֲ�ͼ
    slider();
    //�ڶ�����Ļ�ĵ���¼�
    LiClick();
    //��������Ļ�ĵ���¼�
    dropDownClick();
});

//�ֲ�ͼ
function slider(){
    /**
     * 1.�ֲ�ͼ�����Զ�����
     * 2.�޷��ֲ�ͼ
     * 3.�ֲ�ͼҪ֧�ֻ��� �������һ�  �л�����һ�� ��������Ҫ���� ��һ��
     * 4.������Ҫ��Ԥ����һ�Ż�����һ��
     * 5.�������볬���ֲ�ͼ��1/3��ʱ����л� ��������� ������ȥ
     * 6.�л�ͼƬ��ʱ��СԲ��ҲҪ������
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

    //�������ɽ����¼�
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

    //��ȡСԲ���ƶ�
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
     * 1.��֪�������ľ��� �������ֵ���л��� �л�����һ��
     * 2.����Ǹ�ֵ���л�����һ��
     * 3.���2���¼� touchstart touchend  ��ȡ��ʼ�ͽ�����λ�����
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
    //1.��֪������������ �����ľ���
    //2.��ȡ����������� ���õ���ǰ�Ķ�λλ��
    //3. ����һ������λ�ü����������
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

//�ڶ�����Ļ�ĵ���¼�
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
        //aboutP��Ӧ������
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

//��������Ļ�ĵ���¼�
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

