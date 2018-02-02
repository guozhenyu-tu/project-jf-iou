
function showGoActive() {

    //页面加载完，显示去激活弹窗
    var activationNone=document.getElementsByClassName('activation_popup')[0]; //父级元素

    activationNone.className = 'activation_popup activation_popup_block';

    document.getElementsByTagName('body')[0].className='ovfHiden';

    document.getElementsByTagName('html')[0].className='ovfHiden';

    //点击“去激活”按钮，关闭弹窗
    document.getElementsByClassName('activation_btn')[0].addEventListener('click',function () {

        activationNone.className = 'activation_popup';

        window.location.href='../certification/main.html'

    },false)

    //点击关闭按钮，关闭弹窗
    document.getElementsByClassName('activation_close_btn')[0].addEventListener('click',function () {

        activationNone.className = 'activation_popup';

        document.getElementsByTagName('body')[0].className='';

        document.getElementsByTagName('html')[0].className='';

    },false)

    //点击遮罩层，关闭弹窗
    document.getElementsByClassName('selective_use_popup')[0].addEventListener('click',function () {

        activationNone.className = 'activation_popup';

        document.getElementsByTagName('body')[0].className='';

        document.getElementsByTagName('html')[0].className='';

    },false)


}