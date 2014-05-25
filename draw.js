var gcols = function(){ return ['#B7C68B','#9C9F84','#669966','#CDDB9D'][Math.floor(Math.random()*4)]};
var dgcols = function(){ return ['#5C755E','#2C6700','#587058','#669966','#759564'][Math.floor(Math.random()*4)]};
var bcols = function(){ return ['#614126','#7A5230','#663300','#685642','#A97D5D'][Math.floor(Math.random()*4)]};

function newTree(x,y){
	var ncnv = document.createElement('canvas');
	ncnv.height = 1000;
	ncnv.width = 1000;
	var nctx = ncnv.getContext("2d");
	var offsets = [{x: (Math.random()*200), y: 20},{x: (Math.random()*200), y: 0},{x: (Math.random()*200), y: 40}]
	var points = [randomCircle(120,20,offsets[0].x,offsets[0].y),randomCircle(100,20,offsets[1].x,offsets[1].y),randomCircle(80,20,offsets[2].x,offsets[2].y)];
	var pat = pattern(nctx,Math.random()*(25/6)+(25/8),bcols(),gcols(),dgcols());
	
	
	offsets[0].x += 120;
	offsets[1].x += 100;
	offsets[2].x += 80;
	offsets[0].y += 120;
	offsets[1].y += 100;
	offsets[2].y += 80;
	
	nctx.strokeStyle = bcols();
	nctx.lineWidth = 20;
	nctx.lineJoin = 'round';
	
	nctx.beginPath();
	nctx.moveTo(offsets[0].x,offsets[0].y);
	var n = midpoint(offsets[0],offsets[1]);
	n.y += offsets[0].y/1.2;
	nctx.lineTo(n.x,n.y);
	nctx.lineTo(offsets[1].x,offsets[1].y);
	nctx.moveTo(n.x,n.y);
	var m = midpoint(n,offsets[2]);
	m.y+= n.y/3;
	nctx.lineTo(m.x,m.y);
	nctx.lineTo(offsets[2].x,offsets[2].y);
	nctx.moveTo(m.x,m.y);
	nctx.lineTo((m.x+(Math.random()*10)-5),(m.y+(Math.random()*40)+40))
	nctx.closePath();
	nctx.stroke();
	
	nctx.strokeStyle = '#222';
	nctx.lineWidth = 3;

	nctx.beginPath();
	nctx.fillStyle = pat;
	for(var j = 0; j < points.length; j++){
		nctx.moveTo(points[j][0].x,points[j][0].y);
		for(var i = 1; i < points[j].length; i+=2){
			nctx.quadraticCurveTo(points[j][i].x,points[j][i].y,points[j][i+1].x,points[j][i+1].y);
		}
		nctx.closePath();
		nctx.stroke();
		nctx.fill();
	}
	
	return {c: nctx.canvas, x: x, y: y};
}

midpoint = function(p1,p2){
	return{
		x: p1.x+((p2.x-p1.x)*.5),
		y: p1.y+((p2.y-p1.y)*.5)
	}
}

roundRect = function (mctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  mctx.beginPath();
  mctx.moveTo(x+r, y);
  mctx.arcTo(x+w, y,   x+w, y+h, r);
  mctx.arcTo(x+w, y+h, x,   y+h, r);
  mctx.arcTo(x,   y+h, x,   y,   r);
  mctx.arcTo(x,   y,   x+w, y,   r);
  mctx.closePath();
	mctx.stroke();
	mctx.fill();
	return mctx
}

randomCircle = function(radius,breaks,ox,oy){
	prePoints = []
	for(var i = 0; i < 2 * Math.PI; i += ((2*Math.PI)/breaks)){
		var rd = radius-(Math.random()*(radius/Math.PI/1.5))
		prePoints.push({x: parseFloat(((Math.cos(i)*rd)+radius+ox).toFixed(1)), y: parseFloat(((Math.sin(i)*rd)+radius+oy).toFixed(1))});
	}
	points = []
	for(var i = 1; i < prePoints.length-1; i++){
		points.push(midpoint(prePoints[i-1],prePoints[i]));
		points.push(prePoints[i]);
	}
	points.push(midpoint(prePoints[prePoints.length-1],prePoints[0]));
	points.push(prePoints[0]);
	points.push(points[0]);
	return points;
}

trackTie = function(x){
	var ncnv = document.createElement('canvas');
	ncnv.height = 30;
	ncnv.width = 30;
	var nctx = ncnv.getContext("2d");
	nctx.moveTo(0,0);
	nctx.lineTo(30,0);
	nctx.lineTo(30,30);
	nctx.lineTo(0,30);
	nctx.closePath();
	nctx.strikeStyle = '#222';
	nctx.fillStyle = pattern(nctx,Math.random()*(15/6)+(15/8),bcols(),bcols(),bcols());
	nctx.stroke();
	nctx.fill();
	return {c: nctx.canvas, x: x};
}

trainEngine = function(){
	var ncnv = document.createElement('canvas');
	ncnv.height = 300;
	ncnv.width = 500;
	var nctx = ncnv.getContext("2d");
	
	nctx.strikeStyle = '#222';
	nctx.lineWidth = 4;
	
	nctx.fillStyle = '#222';
	roundRect(nctx,10,220,460,50,10)
	nctx.fillRect(400,40,20,40)
	
	nctx.fillStyle = '#aaa';
	nctx.beginPath();
  nctx.arc(80, 260, 40, 0, 2 * Math.PI, false);
  nctx.arc(380, 260, 40, 0, 2 * Math.PI, false);
	nctx.stroke();
	nctx.fill();
	
	nctx.beginPath();
	nctx.moveTo(4,14);
	nctx.quadraticCurveTo(4,4,14,4)
	nctx.lineTo(210,4);
	nctx.quadraticCurveTo(220,4,220,14);
	nctx.lineTo(220,230);
	nctx.lineTo(222,230);
	nctx.lineTo(222,80);
	nctx.lineTo(470,80);
	nctx.quadraticCurveTo(480,80,480,90);
	nctx.lineTo(480,230);
	nctx.lineTo(4,230);
	nctx.closePath();
	nctx.fillStyle = '#FF9933'
	nctx.stroke();
	nctx.fill();
	
	
	nctx.fillStyle = '#222'
	roundRect(nctx,160,20,40,120,5)
	
	return {c: nctx.canvas};
}

trainCar = function(){
	var ncnv = document.createElement('canvas');
	ncnv.height = 300;
	ncnv.width = 500;
	var nctx = ncnv.getContext("2d");
	
	nctx.fillStyle = '#222';
	nctx.fillRect(380,160,50,50);
	
	nctx.strikeStyle = '#222';
	nctx.lineWidth = 4;
	
	nctx.fillStyle = '#222';
	roundRect(nctx,20,210,440,50,10)
	nctx.fillStyle = bcols();
	roundRect(nctx,4,185,480,30,0)
	
	nctx.fillStyle = '#aaa';
	nctx.beginPath();
  nctx.arc(80, 260, 40, 0, 2 * Math.PI, false);
  nctx.arc(380, 260, 40, 0, 2 * Math.PI, false);
	nctx.stroke();
	nctx.fill();
	
	return {c: nctx.canvas};
}
resize = function(){
	var canvas = document.getElementById('mainCanvas');
	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function pattern(nctx,scale, lnCol, dotCol, bgCol){
	var ncnv = document.createElement('canvas');
	ncnv.width = ncnv.height = 4 * scale;
	var octx = ncnv.getContext("2d");
	octx.fillStyle = bgCol;
	octx.fillRect(0, 0, 4 * scale, 4 * scale);
	octx.fillStyle = dotCol;
	octx.moveTo(0*scale,2*scale);
	octx.lineTo(2*scale,0*scale);
	octx.lineTo(4*scale,2*scale);
	octx.lineTo(2*scale,4*scale);
	octx.closePath();
	octx.strokeStyle = lnCol;
	octx.lineWidth = (scale);
	octx.stroke();
	octx.fill();
	return nctx.createPattern(ncnv,'repeat');
}

// -- init -- //
var ctx = document.getElementById('mainCanvas').getContext("2d");
resize();
window.addEventListener('resize',resize,false);


var trees = [];
var i = window.innerHeight/25;
while (i > 0) {
	i--;
	trees.push(newTree(i*((window.innerWidth+750)/(window.innerHeight/25)), (Math.random()*(window.innerHeight-(window.innerHeight/2)))))
}

var ties = [];
var i = 31;
while (i > 0) {
	i--;
	ties.push(trackTie(i*((window.innerWidth-30)/30)));
}

var speed = 5;

var trainImg = trainEngine();
var carImg = trainCar();

// -- main -- //
function main(){
	var wh = window.innerHeight;
	var ww = window.innerWidth;
	ctx.clearRect(0,0,ww,wh);
	trees.sort(function(a,b){return a.y >= b.y ? 1 : -1});
	for(i = 0; i < trees.length; i++){
		trees[i].x -= speed;
		if (trees[i].x < -500) {
			trees[i] = newTree(ww+(250), (Math.random()*(wh-(wh/2))));
		}
		ctx.drawImage(trees[i].c,trees[i].x,trees[i].y);
	}
	
	ctx.fillStyle = '#685642';
	ctx.fillRect(0,wh-70,ww,70);
	ctx.fillStyle = '#222';
	ctx.fillRect(0,wh-100,ww,15);
	
	for(i = 0; i < ties.length; i++){
		ties[i].x -= speed;
		if (ties[i].x < -30) {
			ties[i] = trackTie(ww);
		}
		ctx.drawImage(ties[i].c,ties[i].x,wh-90);
	}
	
	ctx.drawImage(trainImg.c,ww-555,wh-400);
	ctx.drawImage(carImg.c,ww-1055,wh-400);
	ctx.drawImage(carImg.c,ww-1555,wh-400);
	ctx.drawImage(carImg.c,ww-2055,wh-400);
	
	requestAnimationFrame(main)
}
main();