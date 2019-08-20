;(function(gloal){
	let drawGraphing = function(target){
		return new drawGraphing.prototype.init(target)
	}
	let detaDefalut = {
		 drawWidth : 750, //居中X轴
		 drawHeight : 600, //居中Y轴
		 RADIUS : 300,	//圆的半径
		 scaleSize: 3 ,  //每一个刻度间的大小
		 time : 10,		//刻度渲染的时间
		 big: 115,		//圆盘的大小 180为最大
		 scale: 40,		//刻度的长度
		 width:4, 		//刻度的大小
		 color:'#dce2f0', 		//默认的背景刻度颜色
		 colorTwo : '#3c97f7',   //选中的刻度时间		
	}
	let textDefalut = {
		 key : 0,
		 textStyle:{  //中间圆形字体的配置
			 font : '80px bold 黑体',
			 fillStyle : '#000',
			 textAlign : 'center',
			 textBaseline : 'middle',
			 text : '暂无步数' ,
			 x : 0,
			 y : -50
		},
		somall : {
			 font : '40px 黑体',
			 fillStyle : '#707070',
			 textAlign : 'center',
			 textBaseline : 'middle',
			 text : '今日步数' ,
			 x : 0,
			 y : 20
		}
	}
	
	drawGraphing.prototype = {
		init : function(target){
			let elem = typeof(target) === 'string' && document.getElementById(target);
			this.elem = elem;
			return this;
		}
	}
	
	drawGraphing.extend = function(){  //参数有true为深拷贝， 否则为拷贝
		let target = arguments[0] || {};
		let length = arguments.length;
		let i = 1;
		let deep = false;
		let option, name,copy,src,copyIsArray,clone;
        if (typeof target === "boolean") {
        	deep = target;
			target = arguments[1];
			i = 2;
        }
		if (typeof target !== "object") {
			target = {};
		}
		//参数的个数 1
		if (length === i) {
			target = this;
			i--;
		}

		//浅拷贝  深拷贝
		for (; i < length; i++) {
			if ((option = arguments[i]) != null) {
				for (name in option) {
					copy = option[name];
					src = target[name];
					if(deep && (drawGraphing.isPlainObject(copy) || (copyIsArray = drawGraphing.isArray(copy)))){
						if(copyIsArray){
							copyIsArray = false;
							clone = src && drawGraphing.isArray(src) ? src : [];
						} else {
							clone = src && drawGraphing.isPlainObject(src) ? src : {};
						}
						target[name] = drawGraphing.extend(deep, clone, copy);
					} else if(copy != undefined){
						target[name] = copy;
					}
				}
			}
		}
        return target;
	}
	drawGraphing.extend({
		//类型检测
		isPlainObject: function(obj){
			return toString.call(obj) === "[object Object]";
		},
		isArray: function(obj){
			return toString.call(obj) === "[object Array]";
		}
	});
	
	
	drawGraphing.prototype.graphing = function(option){
		option = drawGraphing.extend(true,{},detaDefalut,option);
		 let ctx = this.elem.getContext('2d');
		 let PI = Math.PI;
		 
		 let RADIUS = option.RADIUS ; //表盘半径
		 let time =  option.time; //时间
		 let big =  option.big ; //表盘大小
		 let scale = option.scale ; //刻度大小
		 let width = option.width ; //刻度大小
		 let color = option.color ;  //刻度的颜色
		 let colorTwo = option.colorTwo ;  //跑马刻度的颜色
		 let scaleSize = option.scaleSize ; //刻度的大小
		 
		 function renderDial(ctx) {
		 //	ctx.clearRect(0, 0, RADIUS * 2, RADIUS * 2);
		 	ctx.save();
		 	//外圆定中心
		 	ctx.translate(option.drawWidth, option.drawHeight); //坐标原点
		 	ctx.beginPath();
		 	ctx.arc(0, 0, RADIUS - 2, 0, 2 * PI); //绘制圆
		 	ctx.strokeStyle = '#fff';
		 	ctx.fillStyle = '#fff'
		 	ctx.fill();
		 	ctx.stroke();
		 	ctx.closePath();

		 	//表盘刻度
		 	for (let i = -big; i < big; i+= scaleSize) {
		 		ctx.save();
		 		ctx.rotate((PI / 180 * i) - (PI / 2)); //旋转坐标轴
		 		ctx.beginPath();
		 		ctx.moveTo(RADIUS - scale, 0);
		 		ctx.lineTo(RADIUS - 5, 0);
		 		ctx.lineWidth = width; 
		 		ctx.strokeStyle = color ;
		 		ctx.stroke();
		 		ctx.closePath();
		 		ctx.restore();
		 	}
		 	ctx.restore();	
		 }
		 renderDial(ctx); //绘制页面刻度
		 
		return function(textOption){
			ctx.translate(option.drawWidth , option.drawHeight ); //坐标原点
			
			textOption = drawGraphing.extend(true , {} , textDefalut ,textOption);
			let textStyle = textOption.textStyle;
			let somall = textOption.somall;
			let n = textOption.key;
			//绘制 动态的步数
			ctx.font = textStyle.font; // 设置字体			
			ctx.fillStyle = textStyle.fillStyle; // 设置颜色		
			ctx.textAlign = textStyle.textAlign; // 设置水平对齐方式		
			ctx.textBaseline = textStyle.textBaseline; // 设置垂直对齐方式
			ctx.fillText(textStyle.text, textStyle.x, textStyle.y);
			
			//绘制 今日步数
			ctx.font = somall.font; // 设置字体			
			ctx.fillStyle = somall.fillStyle; // 设置颜色		
			ctx.textAlign = somall.textAlign; // 设置水平对齐方式		
			ctx.textBaseline = somall.textBaseline; // 设置垂直对齐方式
			ctx.fillText(somall.text, somall.x, somall.y);
				
			
			let arrList = []; 
			function listDraw(j){
				ctx.save();
				ctx.rotate((PI / 180 * j) - (PI / 2)); //旋转坐标轴
				ctx.beginPath();
				ctx.moveTo(RADIUS - scale, 0);
				ctx.lineTo(RADIUS - 5, 0);
				ctx.lineWidth = width; 
				ctx.strokeStyle =colorTwo;
				ctx.stroke();
				ctx.closePath();	
				ctx.restore();
					
			}
			for (let j = -big; j < n; j+= scaleSize ) {
					arrList.push(j);
			}
			let len = arrList.length , k = 0;
			let interval = setInterval(function(){
				listDraw(arrList[k]);
				k++ ;
				if(k >= len) clearInterval(interval)
			},time)	
		}
			
	}
	
	drawGraphing.prototype.init.prototype = drawGraphing.prototype; //原型共享
	gloal.drawGraphing = drawGraphing;
}(this))