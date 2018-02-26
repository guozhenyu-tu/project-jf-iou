
function checkBoxFn() {

    var allChecked=document.getElementsByClassName('all_checked')[0];

    var partChecked=document.getElementsByClassName('part_checked');

    var allReturnMoney=document.getElementsByClassName('zero_font');

    var nextBtn=document.getElementsByClassName('bottom_btn')[0];

    var waitMoney=0;//选择的待换金额

    moneyInit()//金额初始化

    allChecked.onclick=function () {

        waitMoney=0;//先清空一次

        for (var i=0;i<partChecked.length;i++) {

            partChecked[i].checked = this.checked;
        }

        if(this.checked){

            for(var i=0;i<allReturnMoney.length;i++){

                waitMoney+=parseFloat(allReturnMoney[i].innerHTML.substr(1));

            }
            waitMoney=parseFloat(waitMoney).toFixed(2)

            nextBtn.className='bottom_btn';

            nextBtn.getElementsByTagName('a')[0].innerHTML='立即还款￥'+waitMoney;

            nextBtn.getElementsByTagName('a')[0].setAttribute('href','../return/return_fail.html')

        }else {

            waitMoney=0;

            nextBtn.className=nextBtn.className+' noclick';

            nextBtn.getElementsByTagName('a')[0].innerHTML='立即还款'

            nextBtn.getElementsByTagName('a')[0].removeAttribute('href');
        }
    }

    for ( var i = 0; i < partChecked.length; i++) {

        partChecked[i].onclick=function () {

            waitMoney=0;//先清空一次

            var ifChecked=myChecked();

            function myChecked() {

                for (var i=0;i<partChecked.length;i++) {

                    if (partChecked[i].checked == false) {

                        return false;

                    }

                }

                return true;

            }

            if (ifChecked == false) {

                allChecked.checked = false;

            }

            if (ifChecked == true) {

                allChecked.checked = true;

            }


            moneyInit();


           /* for(var j=0;j<partChecked.length;j++){

                if(partChecked[j].checked){

                    waitMoney+=parseFloat(partChecked[j].getAttribute('data-num'))

                }

            }


            if(waitMoney==0){

                waitMoney=0;

                nextBtn.className=nextBtn.className+' noclick';

                nextBtn.getElementsByTagName('a')[0].innerHTML='立即还款'

                nextBtn.getElementsByTagName('a')[0].removeAttribute('href')
            }else {

                waitMoney=parseFloat(waitMoney).toFixed(2)

                nextBtn.className='bottom_btn';

                nextBtn.getElementsByTagName('a')[0].innerHTML='立即还款￥'+waitMoney;

                nextBtn.getElementsByTagName('a')[0].setAttribute('href','../return/return_fail.html')
            }*/


        }

    }


    function moneyInit() {


        for(var j=0;j<partChecked.length;j++){

            if(partChecked[j].checked){

                waitMoney+=parseFloat(partChecked[j].getAttribute('data-num'))

            }

        }


        if(waitMoney==0){

            waitMoney=0;

            nextBtn.className=nextBtn.className+' noclick';

            nextBtn.getElementsByTagName('a')[0].innerHTML='立即还款';

            nextBtn.getElementsByTagName('a')[0].removeAttribute('href')
        }else {

            waitMoney=parseFloat(waitMoney).toFixed(2);

            nextBtn.className='bottom_btn';

            nextBtn.getElementsByTagName('a')[0].innerHTML='立即还款￥'+waitMoney;

            nextBtn.getElementsByTagName('a')[0].setAttribute('href','../return/return_fail.html')
        }


    }



}