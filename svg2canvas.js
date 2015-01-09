var svg2canvas = function(svg, canvas) {
	var svgConfig = checkXml(svg);
	if (svgConfig.width) {
		canvas.width = svgConfig.width;
	};
	if (svgConfig.height) {
		canvas.height = svgConfig.height;
	};
	var ctx = canvas.getContext("2d");
	if (svgConfig.paths) {
		svgConfig.paths.forEach(function(e, n) {
			drawPath(e, ctx);
		})

	};
}
var checkXml = function(string) {
	string = (string+"").replace(/\s/gi,"");
	var svg = /<(svg.+?)>/gi.exec(string);
	var width = /width="(.+?)(px)?"/gi.exec(svg);
	var height = /height="(.+?)(px)?"/gi.exec(svg);

	var pathReg = /<(path.+?)\/>/gi;
	var paths = [];
	for (var reg = "1"; reg;) {
		reg = pathReg.exec(string);
		reg && paths.push(reg[1]);
	};
	return {
		width: width && Number(width[1]),
		height: height && Number(height[1]),
		paths: paths
	}
}
var drawPath = function(path, ctx) {
	var color = /fill=\"(.+?)\"/gi.exec(path)[1];
	var d = /d=\"(.+?)\"/gi.exec(path)[1];
	var currentPoint = [0,0];
	var lastControl = [0,0];
	var actionReg = /([a-z])([^a-z]*)/gi;
	if (color) {
		ctx.fillStyle = color;
	};
	ctx.beginPath();
	for (var reg = "1"; reg;) {
		reg = actionReg.exec(d);
		if (reg) {
			var type = (reg[1]+"");
			var param = reg[2];
			switch (type){
				case "m":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					currentPoint[0] += +(param[0]);
					currentPoint[1] += +(param[1]);
					ctx.moveTo.apply(ctx,currentPoint);
					break;
				case "M":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					currentPoint[0] = +(param[0]);
					currentPoint[1] = +(param[1]);
					ctx.moveTo.apply(ctx,currentPoint);
					break;
				case "l":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					currentPoint[0] += +(param[0]);
					currentPoint[1] += +(param[1]);
					ctx.lineTo.apply(ctx,currentPoint);
					break;
				case "L":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					currentPoint[0] = +(param[0]);
					currentPoint[1] = +(param[1]);
					ctx.lineTo.apply(ctx,currentPoint);
					break;
				case "h":
					currentPoint[0] += +(param);
					ctx.lineTo.apply(ctx,currentPoint);
					break;
				case "H":
					currentPoint[0] = +(param);
					ctx.lineTo.apply(ctx,currentPoint);
					break;
				case "v":
					currentPoint[1] += +(param);
					ctx.lineTo.apply(ctx,currentPoint);
					break;
				case "V":
					currentPoint[1] = +(param);
					ctx.lineTo.apply(ctx,currentPoint);
					break;
				case "z":
					break;
				case "c":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					param[0] = +param[0] + currentPoint[0];
					param[1] = +param[1] + currentPoint[1];
					param[2] = +param[2] + currentPoint[0];
					param[3] = +param[3] + currentPoint[1];
					param[4] = +param[4] + currentPoint[0];
					param[5] = +param[5] + currentPoint[1];
					ctx.bezierCurveTo.apply(ctx,param);
					currentPoint = [param[4],param[5]];
					lastControl = [2*param[4]-param[2],2*param[5]-param[3]];
					break;
				case "C":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					param[0] = +param[0];
					param[1] = +param[1];
					param[2] = +param[2];
					param[3] = +param[3];
					param[4] = +param[4];
					param[5] = +param[5];
					ctx.bezierCurveTo.apply(ctx,param);
					currentPoint = [param[4],param[5]];
					lastControl = [2*param[4]-param[2],2*param[5]-param[3]];
					break;
				case "s":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					param[0] = +param[0] + currentPoint[0];
					param[1] = +param[1] + currentPoint[1];
					param[2] = +param[2] + currentPoint[0];
					param[3] = +param[3] + currentPoint[1];
					param = lastControl.concat(param);
					ctx.bezierCurveTo.apply(ctx,param);
					currentPoint = [param[4],param[5]];
					lastControl = [2*param[4]-param[2],2*param[5]-param[3]];
					break;
				case "S":
					param = param.replace(/,/g," ");
					param = param.replace(/-/g," -");
					param = param.trim().split(" ");
					param[0] = +param[0];
					param[1] = +param[1];
					param[2] = +param[2];
					param[3] = +param[3];
					param = lastControl.concat(param);
					ctx.bezierCurveTo.apply(ctx,param);
					currentPoint = [param[4],param[5]];
					lastControl = [2*param[4]-param[2],2*param[5]-param[3]];
					break;
				default:
					console.log(type)
			}
		};
	};
	ctx.fill();
	ctx.closePath();
}