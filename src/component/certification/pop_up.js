/**
 * Created by Qiaodan on 2017/10/9.
 */


var jfShowPop = function (details) {

    if(!details){

        details ={}

    }

    this.details = details;

    var thisEle = document.getElementById(this.details.ele);




    thisEle.getElementsByClassName('pop_cancel')[0].addEventListener('click', clickEven.bind(this), false);

    thisEle.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('click', clickEven.bind(this), false);


    function clickEven() {

        this.hide();
    }


    if(thisEle.getElementsByClassName('jf_pop_up_bg')[0]) {

        if(browser.os.android){

            thisEle.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('touchmove',windowBanEvent.Canceling,false);

        }
        else {

            addEvent(thisEle.getElementsByClassName('jf_pop_up_bg')[0]);
        }


    }


    function addEvent(ele) {

        var allEvent=['touchstart','touchmove','touchend'];

        for(var i=0;i<allEvent.length;i++) {

            ele.addEventListener(allEvent[i],eventBan,false)

        }

    }

    function eventBan(e) {

        // window.event? window.event.cancelBubble = true : e.stopPropagation();

        window.event ? window.event.returnValue = false : e.preventDefault();


    }





};

jfShowPop.prototype.show = function (details) {

    if(details){

        details.fn();
    }

    var thisEle = document.getElementById(this.details.ele);

    thisEle.style.display = 'block';

    setTimeout(function () {

        if (thisEle.className.indexOf('show') == -1) {

            thisEle.className += ' show'

        }

    }, 1);

    document.getElementsByClassName('jf_pop_up_bg')[0].addEventListener('touchmove',windowBanEvent.Canceling,false);//给阴影绑定冒泡事件


    document.getElementsByTagName("body")[0].className = "ovfHiden";//页面禁止滚动
    document.getElementsByTagName("html")[0].className = "ovfHiden";//页面禁止滚动



};

jfShowPop.prototype.hide = function () {

    var thisEle = document.getElementById(this.details.ele);


    if (thisEle.className.indexOf('show') > -1) {


        transitionMove(thisEle);

        thisEle.className = thisEle.className.replace(' show', '')

    }

    windowBanEvent.unbundling();//解绑页面禁止事件

    function transitionMove(ele) {

        // Safari 3.1 到 6.0 代码
        ele.addEventListener("webkitTransitionEnd", MFunction);
        // 标准语法
        ele.addEventListener("transitionend", MFunction);

        function MFunction() {

            ele.style.display = 'none';
            // Safari 3.1 到 6.0 代码
            ele.removeEventListener("webkitTransitionEnd", MFunction);
            // 标准语法
            ele.removeEventListener("transitionend", MFunction);


        }


    }

    document.getElementsByTagName("body")[0].className = "";//页面禁止滚动
    document.getElementsByTagName("html")[0].className = "";//页面禁止滚动


};
