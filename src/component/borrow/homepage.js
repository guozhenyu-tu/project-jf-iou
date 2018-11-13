/**
 * Created by Qiaodan on 2017/10/10.
 */


//选择天数点击

    function chooseDate(details){

    var _this=this;

    if(!details){
        details={}
    }

    _this.fn=details.fn||0;

    var chooseAllDate=document.getElementsByClassName('date')[0];

    chooseAllDate.addEventListener("click",function(e){

        var evt=e||window.event;

        var thistargetEle=evt.srcElement||evt.target;

        if(thistargetEle.className.indexOf('choosed')<0&&thistargetEle.tagName.toLowerCase()=="p"){

            if(document.getElementsByClassName('choosed')[0]){
                document.getElementsByClassName('choosed')[0].className="";
            }

            thistargetEle.className="choosed";

            if(_this.fn){

                _this.fn()
            }

        }



    },false)
}



var chooseSalary={

    "run":{

        "data":function(){

            if(document.getElementsByClassName('money_num')[0]){

                return document.getElementsByClassName('money_num')[0].innerHTML
            }

        }

    },



    init:function(details){

        var _this=this;


        if(!details){
            details={}
        }

        _this.fn=details.fn||0;


        var thisMoveCoin=document.getElementsByClassName('move_coin')[0];

        var changeGreenEle=document.getElementsByClassName('green')[0];

        var saveMoneyEle=document.getElementsByClassName('money_num')[0];//显示金额

        var parentEleWidth=document.getElementsByClassName('move_bar')[0].offsetWidth;//显示总长度

        var salaryTotal=parseFloat(document.getElementsByClassName('max')[0].innerHTML)-parseFloat(document.getElementsByClassName('min')[0].innerHTML);

        var addBtn = document.getElementsByClassName('add_money_btn')[0];

        var noneBtn = document.getElementsByClassName('none_money_btn')[0];

        var firstPointX;

        var lastPonintX;

        var moveDis;

        var thisGreenEleWidth;//绿色条的宽度

        var lastcoinMoveDis=0;//缓存上一次移动的距离；

        var coinMove;//钱币移动的距离

        var changeNum = 100;//点击按钮变换金额幅度

        initNum();//初始化数据

        thisMoveCoin.addEventListener("touchstart",startFn,false);

        thisMoveCoin.addEventListener("touchmove",moveFn,false);

        addBtn.addEventListener('click',function () {

            if(+saveMoneyEle.innerHTML < +document.getElementsByClassName('max')[0].innerHTML){

                if(+document.getElementsByClassName('max')[0].innerHTML - saveMoneyEle.innerHTML < 100){

                    changeNum = +document.getElementsByClassName('max')[0].innerHTML - saveMoneyEle.innerHTML;

                }

                saveMoneyEle.innerHTML = +(saveMoneyEle.innerHTML) + changeNum;

                initNum();

                changeNum = 100;

            }
        });

        noneBtn.addEventListener('click',function () {

            if(+saveMoneyEle.innerHTML > +document.getElementsByClassName('min')[0].innerHTML){

                if(+saveMoneyEle.innerHTML - document.getElementsByClassName('min')[0].innerHTML < 100){

                    changeNum = +saveMoneyEle.innerHTML - document.getElementsByClassName('min')[0].innerHTML;

                }

                saveMoneyEle.innerHTML = +(saveMoneyEle.innerHTML) - changeNum;

                initNum();

                changeNum = 100;

            }
        });

        //初始化数据
        function initNum(){

            var initMoney=saveMoneyEle.innerHTML;//初始化金额

            var initPercent=(parseFloat(initMoney)-parseFloat(document.getElementsByClassName('min')[0].innerHTML))/salaryTotal

            initPercent=initPercent.toFixed(2);

            var initGreenWidth=parentEleWidth*initPercent;

            if(initGreenWidth<=0){//防止出现金额小于最小值

                initGreenWidth=0
            }else if(initGreenWidth>=parentEleWidth) {//防止出现金额大于最大值

                initGreenWidth=parentEleWidth

            }

           changeGreenEle.style.width=initGreenWidth+'px';

            coinMove=initGreenWidth;

            translateFn(thisMoveCoin);

            if(+saveMoneyEle.innerHTML >= +document.getElementsByClassName('max')[0].innerHTML){

                addBtn.classList.add('gray_btn');

            }else{

                addBtn.classList.remove('gray_btn');

            }

            if(+saveMoneyEle.innerHTML <= +document.getElementsByClassName('min')[0].innerHTML){

                noneBtn.classList.add('gray_btn');
            }
            else{
                noneBtn.classList.remove('gray_btn');
            }
        }

        function startFn(e){

            var evt=e||window.event;

            firstPointX=evt.touches[0].screenX;

            thisGreenEleWidth=changeGreenEle.offsetWidth;

            lastcoinMoveDis=thisGreenEleWidth;


        }

        function moveFn(e){

            var evt=e||window.event;

            evt.preventDefault();

            lastPonintX=evt.touches[0].screenX;

            moveDis=parseFloat(lastPonintX)-parseFloat(firstPointX);//移动距离

            var changeWidth=thisGreenEleWidth+moveDis;//变化宽度

            if(thisGreenEleWidth+moveDis<0){

                changeWidth=0;

            }else if(thisGreenEleWidth+moveDis>parentEleWidth){

                changeWidth=parentEleWidth;
            }
            if(0<=changeWidth&&changeWidth<=parentEleWidth){

                changeGreenEle.style.width=changeWidth+'px';

                 coinMove=parseFloat(lastcoinMoveDis)+parseFloat(moveDis);//钱币应该移动的距离

                moneyMoveFn();//临界值判断；防止超出

                translateFn(this);//移动的方法

                moneyShow();   //计算金额的显示

                //钱币移动的临界值
                function moneyMoveFn(){

                    if(coinMove>parentEleWidth) {

                        coinMove = parentEleWidth ;

                    }else if(coinMove<0){

                        coinMove=0;
                    }

                }
                //计算金额的显示
                function moneyShow(){

                    var showMoneyNum=(changeWidth/parentEleWidth*salaryTotal).toFixed(0);

                    var thisBalance=showMoneyNum%100;//取模

                    if(thisBalance>=50){//超过50，则加100,否则维持原来整数

                        if(+document.getElementsByClassName('max')[0].innerHTML - saveMoneyEle.innerHTML > 100){

                            showMoneyNum=showMoneyNum-thisBalance+100;

                        }else{

                            if(parseFloat(document.getElementsByClassName('green')[0].style.width) > parentEleWidth-10){

                                saveMoneyEle.innerHTML = document.getElementsByClassName('max')[0].innerHTML;

                                return;

                            }else{

                                showMoneyNum=showMoneyNum-thisBalance;

                            }

                        }
                    }else {
                        showMoneyNum=showMoneyNum-thisBalance;
                    }

                    showMoneyNum=showMoneyNum+parseFloat(document.getElementsByClassName('min')[0].innerHTML);

                    saveMoneyEle.innerHTML=showMoneyNum;

                    chooseSalary.run.data=function(){

                        return saveMoneyEle.innerHTML
                    };

                   // console.log(chooseSalary.run.data())

                }

                if(_this.fn){

                    _this.fn();

                }



            }

            if(+saveMoneyEle.innerHTML >= +document.getElementsByClassName('max')[0].innerHTML){

                addBtn.classList.add('gray_btn');

            }else{

                addBtn.classList.remove('gray_btn');

            }

            if(+saveMoneyEle.innerHTML <= +document.getElementsByClassName('min')[0].innerHTML){

                noneBtn.classList.add('gray_btn');
            }
            else{
                noneBtn.classList.remove('gray_btn');
            }

        }

        function translateFn(ele){
            ele.style.transform='translate3d('+coinMove+'px,0,0)';

            ele.style.webkitTransform='translate3d('+coinMove+'px,0,0)';

        }

    },





}












