function showChooseBox() {

    var takeNow = document.getElementsByClassName('selective_use')[0]; //取现用途

    var repaymentPlan = document.getElementsByClassName('repayment_plan')[0]; //还款计划

    var popupClick = document.getElementsByClassName('selective_use_popup'); //弹出层

    var closeClick = document.getElementsByClassName('close_plate'); //关闭按钮



    //点击弹出层，关闭弹窗
    for (var i=0;i<popupClick.length;i++) {

        popupClick[i].addEventListener('click',function () {

            takeNow.className = 'selective_use';

            repaymentPlan.className = 'repayment_plan';

        },false)

    }

    //点击关闭按钮，关闭弹窗

    for (var i=0;i<closeClick.length;i++) {

        closeClick[i].addEventListener('click',function () {


            takeNow.className = 'selective_use';

            repaymentPlan.className = 'repayment_plan';

        },false)

    }

    var checkBoxs=document.getElementsByClassName('radio_fonts');

    for(var i=0;i<checkBoxs.length;i++){

        checkBoxs[i].addEventListener('click',function () {

            var thisChooseValue=this.innerText;

            document.getElementsByClassName('check_use')[0].innerHTML=thisChooseValue;

            takeNow.className = 'selective_use';

        },false)

    }

}

//取现用途
function myUse() {

    document.getElementsByClassName('selective_use')[0].className = 'selective_use popup_use_block';

}

//还款计划
function myPlan() {

    document.getElementsByClassName('repayment_plan')[0].className = 'repayment_plan popup_use_block';

}

//同意服务协议
function checkedService() {

    //window.onload=function () {

       // document.getElementsByClassName('bottom_btn')[0].className = 'bottom_btn gray_button_background';

        var clickText=document.getElementsByClassName('agreement')[0].getElementsByTagName('label')[0];

        clickText.addEventListener('click',function () {

            var checkedBorrow=document.getElementsByClassName('tate_y')[0];

            if (checkedBorrow.checked ==true) {

                document.getElementsByClassName('ag_yellow_borrow_btn ')[0].className = 'ag_yellow_borrow_btn ';

            }else {

                document.getElementsByClassName('ag_yellow_borrow_btn ')[0].className = 'ag_yellow_borrow_btn gray_button_background';

            }
        },false)

   // }

}