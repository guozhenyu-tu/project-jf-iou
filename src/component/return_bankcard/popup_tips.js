function borrowMoneyTips() {

    //页面加载完，显示去激活弹窗
    var showPopupTips=document.getElementsByClassName('none_popup_tips')[0]; //父级元素

    showPopupTips.className = 'none_popup_tips show_borrow_tips';

    document.getElementsByTagName('body')[0].className='ovfHiden';

    document.getElementsByTagName('html')[0].className='ovfHiden';

    //点击关闭按钮，关闭弹窗
    document.getElementsByClassName('popup_tips_close')[0].addEventListener('click',function () {

        showPopupTips.className = 'none_popup_tips';

        document.getElementsByTagName('body')[0].className='';

        document.getElementsByTagName('html')[0].className='';

    },false)

    //点击遮罩层，关闭弹窗
    var hidePopupTips=document.getElementsByClassName('selective_use_popup');

    for (var i=0;i<hidePopupTips.length;i++) {

        hidePopupTips[i].addEventListener('click',function () {

            showPopupTips.className = 'none_popup_tips';

            document.getElementsByTagName('body')[0].className='';

            document.getElementsByTagName('html')[0].className='';

        },false)

    }

}
