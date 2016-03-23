/**
 * Created by jx on 16-3-23.
 */
!function($,doc){


    $.cWd=document.documentElement.clientWidth;
    $.cHt=document.documentElement.clientHeight;
    /**
     * 设置指定对象style
     * @param obj 目标对象
     * @param options 样式对象
     * @returns {mobileFn} 返回源对象（用于链式操作）
     */
    $.setStyle = function(elements,options){
        var arry = null;
        elements.length?arry=elements:arry=new Array(elements);
        $.each(arry,function(i,elment){
            for(var i in options){
                elment.style[i]=options[i];
            }
        });
        return this;
    }
    /**
     *  消息提示
     * @param msg 要显示的提示消息
     * @returns {mobileFn} 返回源对象（用于链式操作）
     */
    $.showMsg = function(msg){
        var _self = this;
        if($(".ajaxmsg")[0]) $("body")[0].removeChild($(".ajaxmsg")[0]);
        var obj = document.createElement('div');
        obj.setAttribute('class','ajaxmsg');
        obj.appendChild(document.createTextNode(msg));
        document.body.appendChild(obj);
        this.setStyle(obj,{left:($.cWd-obj.offsetWidth)/2+"px"});
        //动画模式
        obj.style.webkitAnimation="loading 3s ease-out";
        return this;
    }
    /**
     *dialog弹出层
     * @param type dialog类型 alert||confirm
     * @param title dialog title
     * @param msg 提示消息
     * @param options 详细配置对象{theme:"主题",btn_yes:"确认按钮值",btn_no:"否认按钮值",click_yes:function(){},click_no:function(){}}
     * @returns {mobileFn} 返回源对象（用于链式操作）
     */
    $.diaLog = function(type,title,msg,options){
        var mobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        var clickName = mobile?"tap":"click";
        var m = arguments[0];
        if(arguments.length==2){
            options = msg||{};
            msg = title;
            title = type;
            type = 'alert';
        }
        if(arguments.length==3){
            if(new Object().toString.call(msg)=='[object Object]'){
                options = msg;msg = title;title = type;type = 'alert';
            }else{
                options = options||{}
            }
        }
        if(arguments.length==1){type='alert';title='提示';msg=m;options={}}
        title = title==''?'提示':title;
        var _self = this,theme = options.theme||'white',btn_yes = null,btn_no = null,click_yes = null,click_no = null,
            animate_show = options.animate_show||'showDialog_down .2s ease-out',
            animate_hide = options.animate_hide||'hideDialog .3s ease-out';
        var hidFn = function(){
            _self.setStyle($('.d_window')[0],{opacity:0,webkitAnimation:animate_hide});
            _self.setStyle($('.d_bg')[0],{opacity:0,webkitTransition:"opacity .3s ease-out"});
            $('.d_window')[0].addEventListener('webkitAnimationEnd', function(){
                $("body")[0].removeChild($('.d_window')[0]);
                $("body")[0].removeChild($('.d_bg')[0]);
            }, false);
        }
        if($('.d_window')[0]) $("body")[0].removeChild($('.d_window')[0]);
        if($('.d_bg')[0]) $("body")[0].removeChild($('.d_bg')[0]);
        var divObj = document.createElement('div'),
            bgObj = document.createElement('div');
        divObj.setAttribute('class','d_window d_theme_'+theme);
        bgObj.setAttribute('class','d_bg');
        if(type!='confirm'){
            btn_yes = options.btn_yes||'确 认';
            divObj.innerHTML='<div class="d_title">'+title+'</div>' +
                '<div class="d_content">'+msg+'</div>' +
                '<div class="d_foot"><span onselectstart="return false" id="btn_yes" class="span_all">'+btn_yes+'</span></div>';
            $('body')[0].appendChild(divObj);
            $('body')[0].appendChild(bgObj);
        }else{
            btn_yes = options.btn_yes||'确定';
            btn_no = options.btn_no||'取消';
            divObj.innerHTML='<div class="d_title">'+title+'</div>' +
                '<div class="d_content">'+msg+'</div>' +
                '<div class="d_foot"><span onselectstart="return false" id="btn_no">'+btn_no+'</span><span onselectstart="return false" id="btn_yes" class="span_last">'+btn_yes+'</span></div>';
            $('body')[0].appendChild(divObj);
            $('body')[0].appendChild(bgObj);
        }
        this.setStyle($('.d_window')[0],{left:($.cWd-$('.d_window')[0].offsetWidth)/2+"px",webkitAnimation:animate_show});
        $(".d_bg")[0].addEventListener(clickName,function(){if(options.onClose) options.onClose.call();hidFn();},false);
        $("#btn_yes")[0].addEventListener(clickName,function(){if(options.click_yes) options.click_yes.call();hidFn();},false);
        if($("#btn_no")[0]) $("#btn_no")[0].addEventListener(clickName,function(){if(options.click_no) options.click_no.call();hidFn();},false);
        return this;
    }
}(mui,document);
