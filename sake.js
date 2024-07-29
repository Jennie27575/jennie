const table = document.getElementById('gameTable');

// 初始化游戏参数
const gridSize = 40;
const tableSize = 40;
let snake = [{x: 10, y: 10}];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;
let gameInterval;
let snakeSpeed = 200;

// 创建表格
    for (let i = 0; i < tableSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < tableSize; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }


    // for(let i = 0;i<tableSize;i++){
    //     const row = document.createElement('tr')
    //     for(let j = 0;j<tableSize;j++){
    //         const cell = document.createElement('td')
    //         row.appendChild(cell)

    //     }
    //     table.appendChild(row)

    // }

// 生成食物
    function generateFood() {
        let foodX = Math.floor(Math.random() * tableSize);
        let foodY = Math.floor(Math.random() * tableSize);
        return {x: foodX, y: foodY};
    }

    // function generateFood(){
    //     let foodX = 随机数
    //     let foodY = 随机数
    //     ruturn {x:foodX,y:foodY}
    // }

// 更新游戏状态
function update() {
    let head = {...snake[0]};

    switch (direction) {
        case 'W':
            head.y -= 1;
            break;
        case 'S':
            head.y += 1;
            break;
        case 'A':
            head.x -= 1;
            break;
        case 'D':
            head.x += 1;
            break;
    }

    if (head.x < 0 || head.x >= tableSize || head.y < 0 || head.y >= tableSize || isCollision(head)) {
        clearInterval(gameInterval);
        alert('游戏结束! 得分: ' + score);
        return;
    }
    // if(head.x<0||head.x>tableSize||head.y<0||head.y>tableSize||isCollision(head)){
    //     clearInterval(gameInterval)
    // }
    //吃到食物
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        score++;
        console.log(snake)
    } 
    else {
        snake.pop();
    }

    snake.unshift(head);

    draw();


    // if(head.x===food.x&&head.y===food.y){
    //     food=generateFood()
    //     score++


    // }
}

// 绘制游戏
function draw() {
    const cells = table.getElementsByTagName('td');

    for (let i = 0; i < cells.length; i++) {
        cells[i].className = '';
    }

    for (let segment of snake) {
        const index = segment.y * tableSize + segment.x;
        cells[index].className = 'snake';
    }

    const foodIndex = food.y * tableSize + food.x;
    cells[foodIndex].className = 'food';
}

// 检查是否撞到自己
function isCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// 处理按键事件
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'W':
            if (direction !== 'S') direction = 'W';
            break;
        case 'S':
            if (direction !== 'W') direction = 'S';
            break;
        case 'A':
            if (direction !== 'D') direction = 'A';
            break;
        case 'D':
            if (direction !== 'A') direction = 'D';
            break;
    }
});



// 开始游戏
gameInterval = setInterval(update, snakeSpeed);
console.log(snakeSpeed)
//难度选择
document.addEventListener('click',(event)=>{
    const target = event.target
    if(target.classList.contains('x2x3')){
        clearInterval(gameInterval);
        snakeSpeed=30
        console.log(snakeSpeed)
        gameInterval = setInterval(update, snakeSpeed);
        
        
       
    }
    else if(target.classList.contains('x2x2')){
        clearInterval(gameInterval);
        snakeSpeed=100
        console.log(snakeSpeed)
        gameInterval = setInterval(update, snakeSpeed);
       
    }
    else if(target.classList.contains('x2x1')){
        clearInterval(gameInterval);
        snakeSpeed=200
        console.log(snakeSpeed)
        gameInterval = setInterval(update, snakeSpeed);
       
    }
    else if(target.classList.contains('x2x4')){
        food = generateFood();

       
    }
    else if(target.classList.contains('x2x0')){
        clearInterval(gameInterval);

       
    }
    
    
})



