var canvas=document.getElementById("gc");
var context=canvas.getContext('2d');
var px=0,py=30;
var ballSpeedX=10,ballSpeedY=4;
var paddle1=250;
var paddleHeight=100;
var paddle2=250;
var score1=0,score2=0;

setInterval(function(){drawEverything();move();},1000/40);
canvas.addEventListener('mousemove',function(evt){
  var pos=calMousePos(evt);
  paddle1=pos.y-paddleHeight/2;
});

function drawEverything(){
  colorReact(0,0,canvas.width,canvas.height,'black');
  colorReact(0,paddle1,10,paddleHeight,'white');
  colorReact(canvas.width-10,paddle2,10,paddleHeight,'white');
  colorCircle(px,py,10,'white');
  context.font="30px Arial";
  context.fillText(score1,100,80);
  context.fillText(score2, canvas.width-100,80);
}
function computerMove(){
  var paddle2Ceneter=paddle2+(paddleHeight/2);
  if(paddle2Ceneter<py-35){
    paddle2 +=6;
  }else if(paddle2Ceneter>py+35){
    paddle2 -=6;
  }
}
function move(){
  computerMove();
  px +=ballSpeedX;
  py +=ballSpeedY;
  if(px<0){
    if(py>=paddle1&&py<=paddle1+paddleHeight){
      ballSpeedX=-ballSpeedX;
      var delta1Y=py-(paddle1+paddleHeight/2);
      ballSpeedY=delta1Y*0.25;
    }else{
      score2++;
      reset();
    }
  }
  if(px>canvas.width){
    if(py>=paddle2&&py<=paddle2+paddleHeight){
      ballSpeedX=-ballSpeedX;
      var delta2Y=py-(paddle2+paddleHeight/2);
      ballSpeedY=delta2Y*0.10;
    }else{
      score1++;
      reset();
    }
  }
  if(py<0){
    ballSpeedY=-ballSpeedY;
  }
  if(py>canvas.height){
    ballSpeedY=-ballSpeedY;
  }
}

function calMousePos(evt){
  var rect=canvas.getBoundingClientRect();
  var root=document.documentElement;
  var mouseX=evt.clientX-rect.left-root.scrollLeft;
  var mouseY=evt.clientY-rect.top-root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}

function reset(){
  px=canvas.width/2;
  py=canvas.height/2;
  ballSpeedX=-ballSpeedX;
}
 function colorReact(positionX,positionY,width,height,color){
  context.fillStyle= color;
  context.fillRect(positionX,positionY,width,height);
}

function colorCircle(centerX,centerY,radius,color){
  context.fillStyle=color;
  context.beginPath();
  context.arc(centerX,centerY,radius,0,Math.PI*2,true);
  context.fill();
}
