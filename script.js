window.onload = function() {
/////Declaring Global Variables/////
    var canvas; 
    var ctx;
    var delay = 100;
    //Set a color for the canvas background + Snake
    const canvasBGColor = "rgb(166, 212, 2)";
    const snakeColor = "#364F0A";
    //Set apple color
    const appleColor = "#364F0A";
    let score = 0;
///////Setting the canvas//////
    canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;
    canvas.style.border = "1px solid";
    document.body.appendChild(canvas);
    //Get a 2d representation on the canvas
    ctx = canvas.getContext("2d");
/////Set the snake initial position on the canvas
    let snake = [{x : 300, y : 300},{x : 290, y : 300},{x : 280, y : 300}]
    //Variables to have the snake moving    
    let xPos = 15;
    let yPos = 0;
    
////////////STARTS THE GAME///////////////
    init();
//////////Create apple at the start/////////
    createApple();
///////////Listen to event//////////////
    document.addEventListener("keydown", changeDirection);


    
////////////INITIALIZING THE GAME/////////////// 
    function init() 
    {
        if(checkCollision()) return
           
        //JS function that allows to reppeat a function after a delay. Here we want to fill the canvas with the green color, to draw the initial position of the snake, to move it, and to reppeatidely do that - init, with the given delay set in variables  
        setTimeout(function onTick(){drawCanvas(); drawApple(); moveSnake(); drawSnake(); init();
        },delay)
    }
    
    
    
    ///////FILLING THE BACKGROUND OF THE CANVAS/////// 
    function drawCanvas() 
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Select the canvas background color to fill the canvas
        ctx.fillStyle = canvasBGColor;
        //Indicates the browser how to fill the canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    //////DRAW FOOD ON THE CANVAS//////////
    function drawApple() 
    {
        ctx.fillStyle = appleColor;
        ctx.fillRect(applePosX, applePosY, 15, 15);   
    }
//////////SNAKE BEHAVIOR FOR MOVING////////    
    function moveSnake() 
    {
       const head = {
           x: snake[0].x + xPos, y: snake[0].y + yPos
       };
       //unshift() method is like the push() method, only it works at the beginning of the array. The unshift() method can prepend one or more elements to the beginning of an array. === will move the head forward (add new head)
       snake.unshift(head);
       const appleEaten = snake[0].x === applePosX && snake[0].y === applePosY;
       if (appleEaten) 
       {
           score ++;
           document.getElementById('score').innerHTML = score;
           createApple();
       } else{
       //The pop() method removes a last element of an array and returns that element. It will remove an item from the end of an array and return that item. === will delete the last piece
            snake.pop();
       }
    }
        
///////APPLE PIE/////////
    //Random number for creating food  
    function randomTen(min, max) {
        return Math.round((Math.random() * (max-min) + min) / 15) * 15;
    }
    //Actually creates food 
    function createApple() {
        // Generate a random number the food x-coordinate
        applePosX = randomTen(0, canvas.width - 15);
        // Generate a random number for the food y-coordinate
        applePosY = randomTen(0, canvas.height - 15);
        // if the new food location is where the snake currently is, generate a new food location
        snake.forEach(function isOnSnake(part) {
          if (part.x == applePosX && part.y == applePosY) createFood();
        });
      }

    
/////DRAWING THE SNAKE///////
    function snakeBody(body) 
    {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(body.x, body.y, 15, 15);
    }

    function checkCollision() 
        {
            for (let i = 4; i < snake.length; i++) {
                
                const collision = snake[i].x === snake[0].x && snake[i].y === snake[0].y
                if (collision) return true
            }
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > canvas.width - 10;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > canvas.height - 10;
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
        }
    
   function drawSnake() 
    {
       //that will check the array and for each element will draw on canva as instructed in snakeboby
        snake.forEach(snakeBody);
    }
    
    function changeDirection(event) 
    {
        //defining the key code
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
        //defining the key pressed event
        const keyPressed = event.keyCode;
        //giving the values
        const goUp = yPos === -15;
        const goDown = yPos === 15;
        const goRight = xPos === 15;
        const goLeft = xPos === -15;
        //Defining the direction for next block
        if (keyPressed === LEFT_KEY && !goRight) 
        {
            xPos = -15;
            yPos = 0;
        }
        if (keyPressed === UP_KEY && !goDown) 
        {
            xPos = 0;
            yPos = -15;
        }
        if (keyPressed === RIGHT_KEY && !goLeft) 
        {
            xPos = 15;
            yPos = 0;
        }
        if (keyPressed === DOWN_KEY && !goUp) 
        {
            xPos = 0;
            yPos = 15;
        }
    }
}
 
