var startBtn = document.getElementById('startBtn');
var restartBtn = document.getElementById('restartBtn');
var startPage = document.getElementById('startPage');
var scoreDiv = document.getElementById('score');
var map = document.getElementById('map');
var snakeBody = [[2,3,'head-right','right'],[1,3,'body-right42','right'],[0,3,'tail-01','right']];
var direction = 'right';
var gamePause = false;
var timer = null;
var score = 0;
var pauseBtn = document.getElementById('pauseBtn');
startBtn.onclick = init;
restartBtn.onclick = restart;
document.onkeydown = function(e){
    // console.log(e.keyCode);
    switch(e.keyCode){
        case 37:
        if(direction=='up'||direction=='down'){
            direction = 'left';
        }
        break;
        case 38:
        if(direction=='left'||direction=='right'){
            direction = 'up';
        }
        break;
        case 39:
        if(direction=='up'||direction=='down'){
            direction = 'right';
        }
        break;
        case 40:
        if(direction=='left'||direction=='right'){
            direction = 'down';
        }
        break;
        case 32:
        if(gamePause == false&&timer!=null){
            clearInterval(timer)
            timer = null;
            gamePause = true;
            pauseBtn.innerHTML = '&gt';
        }else if(gamePause == true){
            timer = setInterval('snakeMove()',300);
            gamePause = false;
            pauseBtn.innerHTML = '||';
        }
        break;
        default:
        break;
    }
    // snakeMove();
}

function restart(){
    score =0;
    scoreDiv.innerHTML='score:0';
    document.getElementById('endPage').style.display='none';
    snakeBody = [[2,3,'head-right','right'],[1,3,'body-right42','right'],[0,3,'tail-01','right']];
    direction = 'right';
    gamePause = false;
    if(timer!=null){
        clearInterval(timer);
    }
    timer = null;
    map.innerHTML = '';
    init();
}

function init(){
    startPage.style.display = 'none';
    document.getElementById('right-wrapper').style.display='block';
    initFood();
    initSnake();
    timer = setInterval('snakeMove()',300);
}

function initFood(){
    var food = document.createElement('div');
    food.style.width = '27px';
    food.style.height = '27px';
    food.style['background-image'] = "url('img/apple.png')";
    food.style['background-size'] = '100% 100%';
    food.style.position = 'absolute';
    food.style.top = Math.floor(Math.random()*18)*27 + 'px';
    food.style.left = Math.floor(Math.random()*30)*27 + 'px';
    map.appendChild(food).setAttribute('class','food');
}

function initSnake(){
    for(var i=0; i<snakeBody.length; i++){
        var snake = document.createElement('div');
        snake.style.width = '27px';
        snake.style.height = '27px';
        snake.style.position = 'absolute';
        snake.style.left = snakeBody[i][0]*27 + 'px';
        snake.style.top = snakeBody[i][1]*27 + 'px';
        snake.classList.add(snakeBody[i][2]);
        map.appendChild(snake).classList.add('snake');
    }
}

function snakeMove(){
    var snake = document.getElementsByClassName('snake');
    var snakeLen = snakeBody.length;
    var tail = snake[snakeLen-1];
    var tailArray = snakeBody[snakeLen-1];
    // console.log(tail);
    var food = document.getElementsByClassName('food')[0];
    for(var i=snakeLen-1;i>0;i--){
        snakeBody[i][0] = snakeBody[i-1][0];
        snakeBody[i][1] = snakeBody[i-1][1];
        snakeBody[i][3] = snakeBody[i-1][3];
    }
    switch(direction){
        case 'right':
        snakeBody[0][0] +=1;
        snakeBody[0][3] = 'right';
        break;
        case 'left':
        snakeBody[0][0] -=1;
        snakeBody[0][3] = 'left';
        break;
        case 'up':
        snakeBody[0][1] -=1;
        snakeBody[0][3] = 'up';
        break;
        case 'down':
        snakeBody[0][1] +=1;
        snakeBody[0][3] = 'down';
        break;
        default:
        break;
    }
    for(var i=1;i<snakeLen-1;i++){
        var str = snakeBody[i-1][3]+(snakeBody[i-1][0]-snakeBody[i+1][0]+2)+(snakeBody[i-1][1]-snakeBody[i+1][1]+2);
        snake[i].setAttribute('class','snake body-'+str);
    }
    for(var i=0;i<snakeLen;i++){
        snake[i].style.left = snakeBody[i][0]*27 + 'px';
        snake[i].style.top = snakeBody[i][1]*27 + 'px';
    }
    snake[0].setAttribute('class','snake head-'+direction);
    var str = ''+(snakeBody[snakeLen-1][0]-snakeBody[snakeLen-2][0]+1)+(snakeBody[snakeLen-1][1]-snakeBody[snakeLen-2][1]+1)
    snake[snakeLen-1].setAttribute('class','snake tail-'+str);
    // snakeBody[snakeLen-1][3] = 'tail-'+str;
    if(snake[0].style.top == food.style.top && snake[0].style.left == food.style.left){
        score++;
        scoreDiv.innerHTML ='socre:'+score;
        food.remove();
        initFood();
        var div = document.createElement('div');
        div.style.width = '27px';
        div.style.height = '27px';
        div.style.position = 'absolute';
        div.style.left = tail.style.left;
        div.style.top = tail.style.top;
        var str = ''+(snakeBody[snakeLen-1][0]-snakeBody[snakeLen-2][0]+1)+(snakeBody[snakeLen-1][1]-snakeBody[snakeLen-2][1]+1)
        div.setAttribute('class','snake tail-'+str);
        map.appendChild(div);
        snakeBody.push(tail);
    }
    if(gameOver()){
        clearInterval(timer);
        document.getElementById('endPage').style.display='block';
        document.getElementById('right-wrapper').style.display='none';
    }
}

function gameOver(){
    var snakeLen = snakeBody.length;
    var snake = document.getElementsByClassName('snake');
    if(parseInt(snake[0].style.top)<0||parseInt(snake[0].style.top)>=486||parseInt(snake[0].style.left)<0||parseInt(snake[0].style.left)>=810){
        return true;
    }
    for(var i=1;i<snakeLen;i++){
        if(snake[0].style.left == snake[i].style.left && snake[0].style.top == snake[i].style.top){
            return true;
        }
    }
    return false;
}


pauseBtn.onclick = function(){
    if(gamePause == false&&timer!=null){
        clearInterval(timer)
        timer = null;
        gamePause = true;
        pauseBtn.innerHTML = '&gt';
    }else if(gamePause == true){
        timer = setInterval('snakeMove()',300);
        gamePause = false;
        pauseBtn.innerHTML = '||';
    }
}

var upBtn = document.getElementById('upBtn');
upBtn.onclick = function(){
    if(direction=='left'||direction=='right'){
        direction = 'up';
    }
}

var leftBtn = document.getElementById('leftBtn');
leftBtn.onclick = function(){
    if(direction=='up'||direction=='down'){
        direction = 'left';
    }
}
var downBtn = document.getElementById('downBtn');
downBtn.onclick = function(){
    if(direction=='left'||direction=='right'){
        direction = 'down';
    }
}
var rightBtn = document.getElementById('rightBtn');
rightBtn.onclick=function(){
    if(direction=='up'||direction=='down'){
        direction = 'right';
    }
}