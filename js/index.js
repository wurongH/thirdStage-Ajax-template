/**************************************************************************/
$(function() {
/* 全局变量定义*/
var start = 0;
var num = 10;
var clickCount = 0;
var channel = ['头条', '财经', '体育', '娱乐', '军事', '教育', '科技', 'NBA' ];
var sId = window.location.hash;
/*************************************************************************/
// 导航栏固定
navScroll();
function navScroll() {
	var ologo = $(".logo");
	var oTop = $(".nav").offset().top;
	var sTop = 0;
	$(window).scroll(function(){
		sTop = $(this).scrollTop();
		if(sTop >= oTop) {
			$(".nav").css({"position":"fixed","top":"0"});
		} else {
			$(".nav").css({"position":"static"});
		}
	});
};

//第一次进入页面执行(默认为头条新闻)
firstData();
function firstData() {
	getData(start, num, '头条');
	console.log(sId);	
};

// 点击更多加载
$('#getMoreData').click(function() {
	clickCount++;
	start = clickCount * num + 1;	
	var sId = window.location.hash;
	console.log(sId);
	loadInner(sId);
});

//点击nav栏切换频道
$('.slidebar').on('click', 'li', function() {
        var sId = $(this).data('id'); //获取data-id的值
        window.location.hash = sId; //设置锚点
        $('.main').empty();
        loadInner(sId); 
        $('.slidebar li').eq(i).addClass('current').siblings().removeClass('current');
});
 
//频道设置
function loadInner(sId) {
	var sId = window.location.hash;
    switch(sId) {
        case '#headlineNews': i = 0;
            break;　　　　　　　
        case '#finance': i = 1;
            break;
        case '#sport': i = 2;
            break;
        case '#recreation': i = 3;
            break;　
        case '#military': i = 4;
            break;　　　　　　　
        case '#education': i = 5;
            break;
        case '#science': i = 6;
            break;
        case '#nba': i = 7;
            break;                        　　　　　
        default: i = 0;
            break;
    }
    getData(start, num, channel[i]); //加载相对应的频道
    //$('.slidebar li').eq(i).addClass('current').siblings().removeClass('current'); //当前列表高亮
};

// 公用ajax数据请求
function getData(start, num, channel) {    
    $.ajax({
        type: 'get',
        url: 'http://api.jisuapi.com/news/get',
        data: {
        	channel: channel,
            start: start,
            num: num,
            appkey: 'f408722dec56a195'
        },
        dataType:'jsonp',
        success: function(resp) {
            var html = template("test", {"list": resp.result.list});
            $('.container dl').append(html);
        }
    }); 
};

});










