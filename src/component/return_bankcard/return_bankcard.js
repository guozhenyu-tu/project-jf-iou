
//还款计划
function myPlan() {

    document.getElementsByClassName('repayment_plan')[0].className = 'repayment_plan popup_use_block';

}

function showChooseBox() {

    var takeNow = document.getElementsByClassName('repayment_plan')[0]; //还款计划

    //var repaymentPlan = document.getElementsByClassName('repayment_plan')[0]; //还款计划

    var popupClick = document.getElementsByClassName('selective_use_popup'); //弹出层

    var closeClick = document.getElementsByClassName('close_plate'); //关闭按钮



    //点击弹出层，关闭弹窗
    for (var i=0;i<popupClick.length;i++) {

        popupClick[i].addEventListener('click',function () {

            takeNow.className = 'repayment_plan';

            //repaymentPlan.className = 'repayment_plan';

        },false)

    }

    //点击关闭按钮，关闭弹窗

    for (var i=0;i<closeClick.length;i++) {

        closeClick[i].addEventListener('click',function () {


            takeNow.className = 'repayment_plan';

            //repaymentPlan.className = 'repayment_plan';

        },false)

    }

    var checkBoxs=document.getElementsByClassName('radio_fonts');

    for(var i=0;i<checkBoxs.length;i++){

        checkBoxs[i].addEventListener('click',function () {

            var thisChooseValue=this.innerText;

            document.getElementsByClassName('check_use')[0].innerHTML=thisChooseValue;

            takeNow.className = 'repayment_plan';

        },false)

    }

}
