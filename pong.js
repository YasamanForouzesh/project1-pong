let startButton=document.getElementById("start")
let playerName=document.getElementById("pName")
let boardGame=document.getElementById("parent")
let boardFirst=document.getElementById("enterInput")
let playerNameGame=document.getElementById("playerName")
startButton.addEventListener("click",()=>{
    
    if(playerName.value!=""){
        boardFirst.style.display="none"
        boardGame.style.display="grid"
        playerNameGame.innerText=playerName.value
        wholeGame()
    }
})
let startAgain=document.getElementById("startAgain")
let gameOver=document.getElementById("gameOver")
let scoreFace=document.getElementById("scoreNum")
let scoreNumber=document.getElementById("scoreNumber")
let canvas=document.getElementById("game")
let resault=document.getElementById("resault")
let wholeGame=()=>{
    
    let check=false
    let gameScore=0
    let ctx=canvas.getContext('2d')
    // canvas.setAttribute("height",500)
    // canvas.setAttribute("width",500)

    ctx.clearRect(0,0,canvas.width,canvas.height)
    let ball=new CrawlerEmoji(130,70,4,0,Math.PI,true)
    let board=new Crawler(0,145,40,5)
    startAgain.style.visibility="hidden"
    let b
    console.log(`canvas width : ${canvas.width} canvas heigth: ${canvas.height}`)
    let locationBall=""
    resault.innerText="play Game"
    startAgain.style.visibility="hidden"
    //(end canvas point: Cx=270 Cy=140),(board points: By=board.height Bx=Bx+board.width)
    //The BAx and BAy are the center of the ball
    //we need to find first y and x and m randomly for ball(0<x<270 && 0<y<50)
    scoreFace.innerText="🙄"
    let findB=()=>{
        b=ball.y-(m*ball.x)
    }
    let randomly=()=>{
        ball.x=Math.floor(Math.random()*262)
        ball.y=Math.floor(Math.random()*50)
        m=1
        locationBall="first"
        findB()
    }
    randomly()
    ball.render()
    board.render()
    //function findB
    //put x and y and m in y=mx+b
    //find b b=y-mx
    let reflexLine=()=>{
        gameScore+=10
        scoreNumber.innerText=gameScore
        scoreFace.innerText="😊"
        
            let divM
            do{
                divM=Math.floor(Math.random()*5)
            }while(divM==0)
            if(m<0){
                m=(1)/divM
                
            }else{
                m=(-1)/divM

            }
            console.log(`m: ${m} divM: ${divM}`)
        
        findB()
    }
    //each time incresea BAx and put in y=mx+b to find BAy
    let ballMovement=()=>{

        if(gameScore==200){
            check=false
            resault.innerText="You Win"
            startAgain.style.visibility="visible"
            ball.alive=false
            clearInterval(ba)
        }
        if(ball.x+ball.radius==canvas.width){
            check=false
            scoreFace.innerText="🙄"
            if(m<0){
                m=1
            }else{
                m=-1
            }
            //m=-1*(m)
            findB()
            ball.x-=1
            ball.y=m*ball.x+b
            //if ball come from right border the x has to subtract
            locationBall="right"
        }else if(ball.x-ball.radius==0){
            check=false
            scoreFace.innerText="🙄"
            if(m<0){
                m=1
            }else{
                m=-1
            }
            //m=-1*(m)
            ball.x+=1
            findB()
            ball.y=m*ball.x+b
            //if ball come from left border the x has to add
            locationBall="left"
        }else if(ball.y+ball.radius>=board.y){
            if(!check){
                if(ball.x>=board.x && ball.x<=(board.x+board.width)){
                   
                    reflexLine()
                   
                    check=true
                
              
                // win=true
            }else if(board.x >= ball.x && board.x <= ball.x+ball.radius){
                reflexLine()
                check=true

            }else if(board.x+board.width<=ball.x && board.x+board.width>=ball.x-ball.radius){
                reflexLine()
                check=true
            }
           else{
            //    win=false
            ball.alive=false
           }
        }
                
               if(ball.alive){

                   if(m>0){
                    ball.x-=1
                }else{
                    ball.x+=1
                }
                ball.y=m*ball.x+b
                locationBall="board"
               }
               if(gameScore==200){
                   board.alive=false
                   resault.innerText="You Win!"
                   scoreFace.innerText="😊"

               }

        }else if(ball.y-ball.radius<=0){
            check=false
            scoreFace.innerText="🙄"
            // m=-1*(m)
            let divM
            do{
                divM=Math.floor(Math.random()*5)
            }while(divM==0)
            if(m<0){
                m=(1)/divM
                
            }else{
                m=(-1)/divM

            }
            
            findB()
            if(m<0){
                ball.x-=1
            }else{
                ball.x+=1
            }
            ball.y=m*ball.x+b
            //if ball come from left border the x has to add
            locationBall="top"
        }{
            if(locationBall=="board"){
                if(m>0){
                    ball.x-=1
                    ball.y=(m)*ball.x+b
                }else{
                    ball.x+=1
                    ball.y=(m)*ball.x+b
                }
            }else if(locationBall=="right"){
                ball.x-=1
                ball.y=(m)*ball.x+b
            }else if(locationBall=="left"){
    
                ball.x+=1
                ball.y=(m)*ball.x+b
            }else if(locationBall=="first"){
                ball.x+=1
                ball.y=(m)*ball.x+b
            }else if(locationBall="top"){
                if(m<0){
                    ball.x-=1
                    ball.y=(m)*ball.x+b
                }else{
                    ball.x+=1
                    ball.y=(m)*ball.x+b
                }
            }
    
        }
        //I need to write the code when ball pass the board and if the ball touch the top intead of left and right==>tomorrow
    }
    //if (Bx<BAx<Bx+board.width && BAy==By+board.height)=>we should find where ball touch the board and devide m and multiply by -1
    //we multiply by -1 (to find b call findB())because we want to make the line on other side
    //if (BAy+ball.radius>By+board.heght)=>user lose
    //if(BAx+ball.radius>=270 )=> we have to reflex the same line in other side with same m and b but we have to decreese the
    // x to find the y
    //if (BAx-ball.radius==0)=>we have to reflex line by the same m and b but we have to increase the x to find y
    
    
    
    function CrawlerEmoji(x,y,radius,sPoint,ePoint,clockWise){
        this.x=x
        this.y=y
        this.radius=radius
        this.alive=true
        this.render=function(){
            ctx.beginPath()
            ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true)
            ctx.fillStyle="white"
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.stroke()
    
        }
    }
    function Crawler(x,y,width,height){
        this.x=x
        this.y=y
        this.width=width
        this.height=height
        this.alive=true
        this.render = function(){
            ctx.fillStyle="white"
            ctx.fillRect(this.x, this.y, this.width, this.height)
    
        }
    }
    
    
    let gameLoop=()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height)
        if(ball.alive){
            ballMovement()

        }else{
            if(m<0){
                ball.x-=1
            }else{
                ball.x+=1
            }
            ball.y=m*ball.x+b
            
        }
        ball.render()
        board.render()
        if(ball.y>=160){
            clearInterval(ballInterval)
            scoreFace.innerText="✋"
            startAgain.style.visibility="visible"
            resault.innerText="Game Over"
            scoreNumber.innerText=0
            gameScore=0
        }
    
    }
    let ballInterval=setInterval(gameLoop,20)
    let movement=(e)=>{
        switch (e.key){
            case "ArrowLeft":
                if(board.x!=0){
                    board.x-=20
                }
                break
            case "ArrowRight":
                if(board.x+board.width<canvas.width){

                    board.x+=20
                }
                break
        }
    }
            document.addEventListener('keyup',(e)=>{
            
                movement(e)
         
    
            })
    

}    
startAgain.addEventListener("click",wholeGame)