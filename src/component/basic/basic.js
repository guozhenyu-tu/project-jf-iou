/**
 * Created by Qiaodan on 2017/10/9.
 */
    //优化iphone点击速度
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);



//增加active事件
document.addEventListener('touchstart',function(){},false);




var browser = {
    os: function () {
        var u = navigator.userAgent;
        return {// 操作系统
            linux: !!u.match(/\(X11;( U;)? Linux/i), // Linux
            windows: !!u.match(/Windows/i), // Windows
            android: !!u.match(/Android/i), // Android
            iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // iOS
        };
    }(),
    device: function () {
        var u = navigator.userAgent;
        return {// 设备
            mobile: !!u.match(/AppleWebKit/i), // mobile
            iPhone: !!u.match(/iPhone/i), // iPhone
            iPad: !!u.match(/iPad/i), // iPad
        };
    }(),
    supplier: function () {
        var u = navigator.userAgent;
        return {// 浏览器类型
            qq: !!u.match(/QQ\/\d+/i), // QQ
            wechat: !!u.match(/MicroMessenger/i), // WeChat
            weixin: u.match(/MicroMessenger/i) == 'MicroMessenger',
            ios: u.indexOf('_JFiOS') > -1,
            android: u.indexOf('_jfAndroid') > -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        };

    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),

    androidVersion: function () {//判断安卓版本
        var userAgent = navigator.userAgent;
        var index = userAgent.indexOf("Android")
        if (index >= 0) {
            return parseFloat(userAgent.slice(index + 8));

        }
    }(),

    IosVersion:function () {//ios版本
        var str= navigator.userAgent.toLowerCase();
        var ver=str.match(/cpu iphone os (.*?) like mac os/);
        if(!ver){

            return -1;

        }else{

            return ver[1].replace(/_/g,".");
        }
    }()
    //browser.supplier.wechat
};

var windowBanEvent = {

    bundling: function () {

        var _self = this;
        //$(window).bind('click touchstart touchmove touchend ', _self.Canceling);//绑定禁止事件

        var allEvent = ['click', 'touchstart', 'touchmove', 'touchend'];

        for (var i = 0; i < allEvent.length; i++) {

            document.body.addEventListener(allEvent[i], _self.Canceling, false);

            addEventListener(allEvent[i], _self.Canceling, false)

        }

    },

    unbundling: function () {

        var _self = this;

        var allEvent = ['click', 'touchstart', 'touchmove', 'touchend'];

        for (var i = 0; i < allEvent.length; i++) {

            document.body.removeEventListener(allEvent[i], _self.Canceling, false);

            removeEventListener(allEvent[i], _self.Canceling, false)

        }

        //$(window).unbind('click touchstart touchmove touchend ', _self.Canceling);//解除绑定事件


    },

    Canceling: function (evt) {

        var evt = evt || window.event; //阻止事件

        if (evt.preventDefault) {

            evt.preventDefault();

            evt.stopPropagation();

        }
        else {

            evt.returnValue = false;

            evt.cancelBubble = true;

        }

    }

};





var allSelectEle=document.getElementsByTagName('select');
for(var i=0;i<allSelectEle.length;i++){
    allSelectEle[i].addEventListener("change",function(){
        this.style.color="#4a4a4a"
    },false);

    allSelectEle[i].addEventListener("focus",function(){
        this.getElementsByClassName('showoptionstips')[0].style.display="none";
    },false);

}





/*嘉福平台UI通用JS*/
/*包括轻量级提示，loading,弹出框等等*/
var jfShowTips = {

    //弱提示toast出现的方法
    //谯丹
    //2017.1.17
    toastShow: function (details) {

        var _this = this;

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        var thisText = details.text || 'null';

        var thisInnerHtml = '<span>' + thisText + '</span>';//插入元素的主题内容

        _this.toastRemove();//插入元素前，先删除一次，防止多次添加

        var className='';


        if(browser.os.iOS){//如果当前是IOS系统

            var thisActiveEle=document.activeElement;//当前获取焦点的元素

            if(thisActiveEle.tagName=='INPUT') {//如果当前元素是input

                var thisActiveEleType=thisActiveEle.getAttribute('type');//获取当前元素的type属性

                var inputType=['checkbox','radio','button','image','range','reset','submit','week'];//定义type类型不会发生变化的数组

                if(inputType.indexOf(thisActiveEleType)==-1){//如果当前type类型不存在，则添加Class

                    className='tip_input';
                }

            }

        }

        var thisAddToast = this.addNode('div', thisInnerHtml, 'tip_toast',className);//添加元素

        setTimeout(function () {//延迟2s后，自动删除

            _this.remove(thisAddToast)

        }, 2000);

    },

    //弱提示toast删除的方法
    //谯丹
    //2017.1.17
    toastRemove: function () {

        if (document.getElementById('tip_toast')) {//删除之前，先判断当前元素是否存在

            this.remove(document.getElementById('tip_toast'))

        }

    },


    //loading方法
    //陈羽翔
    //2017.2.3
    loadingShow:function (details) {

        var _this=this;

        if(!details){//为空时初始化数据
            details={};
        }

        windowBanEvent.bundling();//页面禁止事件

        _this.loadingRemove();//先删除页面上loading元素

        var thisText = details.text || 'LOADING..';//初始值

        var overtimeFn= details.overtimeFn || function () {

                _this.toastShow({'text':'等待超时'})

            };

        var thisInnerHtml='<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div><i>'+thisText+'</i>';//html内容

        _this.addBlur();

        var thisBg=_this.addBg('loading_bg');

        var thisAddEle=_this.addNode('div',thisInnerHtml,'tip_loading');//增加节点

        document.activeElement.blur();//页面控件失焦

        thisAddEle.focus();//loading元素获得焦点

        setTimeout(function () {

            if(thisAddEle){

                overtimeFn();

                _this.remove(thisAddEle);//删除该元素

                windowBanEvent.unbundling();//解绑页面禁止事件

                _this.removeBlur();

                _this.transitionEndFn(thisBg,function () {

                    _this.removeBg('loading_bg');

                });

                thisBg.style.opacity='0';

            }

        },30000);//30s



    },

    //loading删除方法
    //陈羽翔
    //2017.2.3
    loadingRemove:function () {//卸载loading

        var _this=this;

        if (document.getElementById('tip_loading')) {//删除之前，先判断当前元素是否存在

            windowBanEvent.unbundling();//解绑页面禁止事件

            _this.remove(document.getElementById('tip_loading'))//删除该元素

            _this.removeBlur();

            _this.removeBg('loading_bg');

        }

    },
    //新建元素的方法
    addNode: function (tag, innerHtml, id, className) {

        var obj = document.createElement(tag);

        if (id) {

            obj.id = id;

        }

        if(className){

            obj.className=className

        }

        obj.innerHTML = innerHtml;

        document.body.appendChild(obj);

        return obj;


    },


    //模糊增加方法
    //陈羽翔
    //2017.2.4
    addBlur:function () {
        /*
         var thisEle=this.returnAllBodyChildNode();

         var addClass='';

         if(browser.os.iOS){

         addClass=' body_blur_transition_ios';

         }
         else{

         addClass=' body_blur_transition_other';

         }

         for(var i=0;i<thisEle.length;i++){

         thisEle[i].className+=addClass;
         }
         */
    },

    removeBlur:function () {
        /*
         var addClass='';

         if(browser.os.iOS){

         addClass='body_blur_transition_ios';

         }
         else{

         addClass='body_blur_transition_other';

         }

         var thisEle=document.getElementsByClassName(addClass);

         for(var i=thisEle.length-1;i>=0;i--){

         thisEle[i].className=thisEle[i].className.replace(addClass,'');
         }
         */
    },

    dialogShow:function (details) {

        if(!details){//如果details未输入，则防止报错
            details={};
        }

        var mainText = details.mainText || 'null';

        var minText = details.minText || 'null';

        var hasCheck = details.noCheck|| false;

        var hasCancel = details.noCancel || false;

        var checkFn = details.checkFn || null;

        var checkBtnText=details.checkBtnText ||'确认';

        var cancleBtnText=details.cancleBtnText ||'取消';

        var thisUrl=details.thisUrl||'javascript:void(0)';


        var _this=this;

        _this.addBlur();

        var thisBg=_this.addBg('dialog_bg');

        var thisInnerHtml='<div class="text_dialog_container"><div class="text_big">'+mainText+'</div><div class="text_small">'+minText+'</div><div class="dialog_button">';
        if(!hasCancel){

            thisInnerHtml+='<a class="dialog_cancel" href="javascript:void(0)">'+cancleBtnText+'</a>'

        }
        if(!hasCheck){

            thisInnerHtml+='<a class="dialog_check" href='+thisUrl+'>'+checkBtnText+'</a>'

        }



        thisInnerHtml+='</div></div>';

        var thisAddDialog = _this.addNode('div', thisInnerHtml, 'tip_dialog');//添加元素


        if(thisAddDialog.getElementsByClassName('dialog_cancel')[0]) {

            thisAddDialog.getElementsByClassName('dialog_cancel')[0].addEventListener('click', _this.dialogRemove.bind(_this), false);

        }
        if(checkFn) {

            thisAddDialog.getElementsByClassName('dialog_check')[0].addEventListener('click',checkFn,false);

        }


    },

    dialogRemove:function () {

        var _this=this;

        var thisDialogEle= document.getElementById('tip_dialog');

        _this.removeBlur();

        thisDialogEle.style.opacity='0';
        _this.settimeoutFn(function(){

            _this.remove(thisDialogEle);//删除该元素

        })


        var thisBgEle=document.getElementById('dialog_bg');


        _this.settimeoutFn(function(){

            _this.removeBg('dialog_bg');//删除背景
        })


        thisBgEle.style.opacity='0';

    },

    //增加背景
    //陈羽翔
    //2017.2.4
    addBg:function (thisId) {

        var _this=this;

        _this.removeBg();

        return _this.addNode('div','',thisId,'tip_bg');//增加节点

    },

    removeBg:function (thisId) {

        if(document.getElementById(thisId)){

            // document.getElementById(thisId).click();

            this.remove(document.getElementById(thisId));

        }

    },

    //自动删除的方法
    remove: function (_element) {

        var _parentElement = _element.parentNode;//找到父元素，然后删除

        if (_parentElement) {

            _parentElement.removeChild(_element);

        }

    },

    //批量增加平滑过渡后监听方法
    transitionEndFn:function (thisEle,myFn) {

        thisEle.addEventListener("webkitTransitionEnd", myFn);

        thisEle.addEventListener("transitionend", myFn);




    },

    settimeoutFn:function(myFn){

        setTimeout(myFn,500);

    }

};

/*通用UIjs结束*/
