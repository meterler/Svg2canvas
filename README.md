# Svg2canvas
Transform svg code to canvas path

svg里的路径一般形如
`<path fill="#FFFFFF" d="M152.3,19.9c0-1.6,1.3-2.8,2.8-2.8s2.8,1.3,2.8,2.8S152.3,21.4,152.3,19.9z"/>`

**fill**表示填充的颜色  
**d**表示路径（path data）是一些字母和数字还有逗号减号的组合  
例子中的d可以分为以下几个串  
M(152.3,19.9)  
c(0,-1.6,1.3,-2.8)  
s(2.8,1.3,2.8,2.8)  
S(152.3,21.4,152.3,19.9)  
z()  
注意当参数为负数的时候，前面的逗号会省略。

命令    名称	参数  
M	moveto  移动到	(x y)+  
Z	closepath  关闭路径	(none)  
L	lineto  画线到	(x y)+  
H	horizontal lineto  水平线到	x+  
V	vertical lineto  垂直线到	y+  
C	curveto  三次贝塞尔曲线到	(x1 y1 x2 y2 x y)+  
S	smooth curveto  光滑三次贝塞尔曲线到	(x2 y2 x y)+  
Q	quadratic Bézier curveto  二次贝塞尔曲线到	(x1 y1 x y)+  
T	smooth quadratic Bézier curveto  光滑二次贝塞尔曲线到	(x y)+  
A	elliptical arc  椭圆弧	(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+  
R	Catmull-Rom curveto*  Catmull-Rom曲线	x1 y1 (x y)+  
参考：[深度掌握SVG路径path的贝塞尔曲线指令 By 张鑫旭](http://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/)  
参考：[超级权威的文档 By W3C](http://www.w3.org/TR/SVG/paths.html)  

命令有大写和小写两种区分，大写表示绝对定位，小写表示相对于当前的坐标点定位。  
这些命令都可以对应到canvas的方法：  
M==moveTo(x,y)  
Z==  
L==lineTo(x,y)  
H==lineTo(newX,oldY)  
V==lineTo(oldX,newY)  
C==bezierCurveTo(x1,y1,x2,y2,x,y)  
S==bezierCurveTo(通过计算得到的x1,通过极端得到的y1,x2,y2,x,y)  
Q==quadraticCurveTo(x1,y1,x,y)  
T=quadraticCurveTo(通过计算得到的x1,通过极端得到的y1,x,y)  
