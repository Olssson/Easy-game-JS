var character = document.getElementById("character");
var game = document.getElementById("Gra");
var intervalL;
var intervalR;
var bothL = 0;
var bothR = 0;
var goright = 0;
var goleft = 0;
var counter = 0;
var currentBlocks = [];
var velocity = 0;
var horvelocity = 0;
var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
console.log(characterTop)
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){
		horvelocity = 1;
        character.style.left = left + horvelocity + "px";
    }
}
function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
		horvelocity = -1;
        character.style.left = left + horvelocity + "px";
    }
}
document.addEventListener("keydown", event => {
	if(event.key==="ArrowRight"){
		goright = 1;
	}
    if(event.key==="ArrowLeft"){
		goleft = 1;
	}
});
document.addEventListener("keyup", event => {
	if(event.key==="ArrowLeft") {
		goleft = 0;
	}
	if(event.key==="ArrowRight") {
		goright = 0;
	}
});
/*
document.addEventListener("keydown", event => {
    if(bothR==0){
        bothR++;
		if(event.key==="ArrowRight"){
            intervalR = setInterval(moveRight, 0.01);
        }
	}
	if(bothL==0){
		bothL++;
        if(event.key==="ArrowLeft"){
            intervalL = setInterval(moveLeft, 0.01);
        }
        
    }
});
document.addEventListener("keyup", event => {
	if(event.key==="ArrowLeft") {
		clearInterval(intervalL);
		bothL=0;
	}
	if(event.key==="ArrowRight") {
		clearInterval(intervalR);
		bothR=0;
	}
});*/


var blocks = setInterval(function(){
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
		var holeLastLeft = parseInt(window.getComputedStyle(holeLast).getPropertyValue("left"));
    }
    if(blockLastTop<400||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 400) - 200;
		if(random+holeLastLeft > 360){
			hole.style.left = holeLastLeft-random + "px";
		}else{
			hole.style.left = Math.abs(holeLastLeft+random) + "px";
		}
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }
    //var characterToap = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    //var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
        alert("GAME OVER your score is: "+(counter-9));
        clearInterval(blocks);
        location.reload();
    }
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if(iblockTop < -20){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }

        if(iblockTop-20<characterTop && iblockTop>characterTop){
            drop++;
			
			//velocity = 1
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop = 0;
            }else{
				characterTop = iblockTop-20
			}
        }
		
		if(iholeLeft-10<=characterLeft && iholeLeft+30>=characterLeft && iblockTop-17<characterTop && iblockTop>characterTop){
            drop = 0;
        }
		if(-2 > iblockTop-characterTop-velocity && iblockTop-characterTop-velocity > -10 && velocity < 0){
			console.log(iblockTop-characterTop)
			//characterTop = iblockTop
			velocity = 0
		}
    }
	
	if(!goleft && !goright){
		characterLeft = characterLeft + horvelocity;
		horvelocity = horvelocity/1.02
	}else{
		if(goright){
			if(characterLeft<380){
				horvelocity = 0.8
				characterLeft = characterLeft + horvelocity;
			}
		}
		if(goleft){
			if(characterLeft>0){
				horvelocity = -0.8
				characterLeft = characterLeft + horvelocity;
			}
		}
	}
	if(characterLeft<0){
		characterLeft = 0
	}
	if(characterLeft>380){
		characterLeft = 380
	}
	character.style.left = Math.round(characterLeft) + "px";
	
    if(drop==0){
        if(characterTop < 480){
			velocity = velocity + 0.1
            
        }else{
			velocity = -velocity/1.2
		}
		
		characterTop = characterTop + velocity;
    }else{
		velocity = -velocity/1.2
        characterTop = characterTop - 0.5 + velocity;
		
    }
	character.style.top = characterTop + "px";
	//console.log(characterTop)
	
},1);