//创建画布
var canvas = document.createElement("canvas");//新建画布
var ctx = canvas.getContext("2d");//新建2d环境
canvas.width = 1024;//画布宽
canvas.height = 600;//画布高
document.body.appendChild(canvas);//在body中添加cavans

//背景图片
var bgReady = false;
var bgImage = new Image();//新建背景图片
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";//添加背景图片

//redfish图片
var redfishReady = false;
var redfishImage = new Image();
redfishImage.onload = function () {
	redfishReady = true;
};
redfishImage.src = "images/redfish.png";

//goldfish图片
var goldfishReady = false;
var goldfishImage = new Image();
goldfishImage.onload = function () {
	goldfishReady = true;
};
goldfishImage.src = "images/goldfish.png";

// 创建游戏对象
var redfish = {//创建红色的鱼
	speed: 256 // 每秒256像素的移速
};
var goldfish = {};//创建金色的鱼
var goldfishsCaught = 0;//金鱼被抓住的次数

// 键盘控制
var keysDown = {};
//添加键盘按下时的监听事件
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
//添加键盘放开时的监听事件
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//重置游戏对象的位置
var reset = function () {
	//红鱼位于图片中央
	redfish.x = canvas.width / 2;
	redfish.y = canvas.height / 2;
	// 金鱼位于cavans随机位置
	goldfish.x = 32 + (Math.random() * (canvas.width - 64));
	goldfish.y = 32 + (Math.random() * (canvas.height - 64));
};

// 更新游戏
var update = function (modifier) {
	if (38 in keysDown) { // 按下↑
		redfish.y -= redfish.speed * modifier;
	}
	if (40 in keysDown) { // 按下↓
		redfish.y += redfish.speed * modifier;
	}
	if (37 in keysDown) { // 按下←
		redfish.x -= redfish.speed * modifier;
	}
	if (39 in keysDown) { // 按下→
		redfish.x += redfish.speed * modifier;
	}

	// 当两条鱼接触的时候
	if (
		redfish.x <= (goldfish.x + 32)
		&& goldfish.x <= (redfish.x + 32)
		&& redfish.y <= (goldfish.y + 32)
		&& goldfish.y <= (redfish.y + 32)
	) {
		++goldfishsCaught;//接触到时，分数++
		reset();//重置游戏对象位置
	}
};

// 画出对应的图片
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (redfishReady) {
		ctx.drawImage(redfishImage, redfish.x, redfish.y);
	}

	if (goldfishReady) {
		ctx.drawImage(goldfishImage, goldfish.x, goldfish.y);
	}

	// 计分
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("计分: " + goldfishsCaught, 32, 32);
};

// 主游戏循环
var main = function () {
	var now = Date.now();
	var delta = now - then;

	//更新游戏
	update(delta / 1000);
	//
	render();

	then = now;

	//执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画
	requestAnimationFrame(main);
};

//使重绘动画支持各种各样的浏览器
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// 开始游戏
var then = Date.now();
reset();
main();
