const snakeCnv = document.getElementById('snakeGame');
snakeCnv.width = 680;
snakeCnv.height = 680;
const snakeCtx = snakeCnv.getContext('2d');
const canvas = document.getElementById('notFoundText');
const ctx = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 250;
let gameInterval=null;
window.onload = () => {
    createNotFound();
    document.addEventListener('keydown', rotateSnake);
    gameInterval=setInterval(game, 1000 / 15);
}

//#region game
let psX = psY = 10;
let gs = 17;
let tc = 40;
let appleX = appleY = 15;
let vlcX = vlcY = 0;
let trail = [];
let tail = 5;
const rotateSnake = (e) => {
    if (e.key == 'w' || e.key == 'ArrowUp') {
        vlcY == 1 ? vlcY = 1 : vlcY = -1;
        vlcX = 0;
    } else if (e.key == 's' || e.key == 'ArrowDown') {
        vlcY == -1 ? vlcY = -1 : vlcY = 1;
        vlcX = 0;
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
        vlcY = 0;
        vlcX == 1 ? vlcX = 1 : vlcX = -1;
    } else if (e.key == 'd' || e.key == 'ArrowRight') {
        vlcY = 0;
        vlcX == -1 ? vlcX = -1 : vlcX = 1;
    }
}
const game = () => {
    try {
        psX += vlcX;
        psY += vlcY;
        if (psX < 0) {
            psX = tc - 1;
        }
        if (psX > tc -1) {
            psX = 0;
        }
        if (psY < 0) {
            psY = tc - 1;
        }
        if (psY > tc - 1) {
            psY = 0;
        }
        snakeCtx.fillStyle = "black";
        snakeCtx.fillRect(0, 0, 680, 680);
        snakeCtx.fillStyle = "lime";

        for (var i = 0; i < trail.length; i++) {
            snakeCtx.fillRect(trail[i].x * gs, trail[i].y * gs, gs-2, gs-2);
            if (trail[i].x == psX && trail[i].y == psY) {
                tail = 5;
                createNotFound();
            }
        }
        trail.push({
            x: psX,
            y: psY
        });

        while (trail.length > tail) {
            trail.shift();
        }
        if (appleX == psX && appleY == psY) {
            tail++;
            appleX = Math.floor(Math.random() * tc);
            appleY = Math.floor(Math.random() * tc);
            revealRandomPoint();
        }
        snakeCtx.fillStyle = "red";
        snakeCtx.fillRect(appleX * gs, appleY * gs, gs-2, gs-2);
    } catch (error) {
        console.log(error);
    }

}
//#endregion

//#region craete not found text
let gap = 1;
let cube = 10;
let locationList = [];
const letterLocation = (posX, posY, color = "white") => {
    return {
        x: posX,
        y: posY,
        color
    }
};
const revealRandomPoint=()=>{
    let point="";
    for(var i=0;i<4;i++){
        let index=Math.floor(Math.random()*Math.floor(locationList.length));
        point=locationList[index];
        ctx.fillStyle="black";
        ctx.fillRect(point.x,point.y,10,10);
        locationList.splice(index,1);
    }
    if(locationList.length==0){
        clearInterval(gameInterval);
        window.requestAnimationFrame(explode);
    }
}
const createNotFound = () => {
    createN(20, 20);
    createO(170, 20);
    createT(290, 20);
    createF(470, 20);
    createO(555, 20);
    createU(675, 20);
    createN(775, 20);
    createD(930, 20);
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

const createN = (posX, posY) => {
    let x = posX;
    let y = posY;
    for (let j = 0; j < 12; j++) {
        y = posY;
        for (let i = 0; i < 10; i++) {
            if (j == 0) {
                locationList.push(letterLocation(x, y));
            } else if (j > 0 && j < 11) {
                if ((i + 1) == j) {
                    locationList.push(letterLocation(x, y));
                }
            } else {
                locationList.push(letterLocation(x, y));
            }
            y += (gap + cube);
        }
        x += (gap + cube);
    }
}
const createO = (posX, posY) => {
    let x = posX;
    let y = posY;
    let emptyCell = 2;
    for (let j = 0; j < 9; j++) {
        y = posY;
        for (let i = 0; i < 10; i++) {

            if (j == 3 || j == 5) {
                if (i == 0 || i == 1 || i == 8 || i == 9) {
                    locationList.push(letterLocation(x, y));
                }
            } else {
                if (i >= emptyCell && i <= 9 - (emptyCell)) {
                    if (j == 1 || j == 7) {
                        if (i > 2 && i < 7) {
                            y += (gap + cube);
                            continue;
                        }
                    }
                    if (j == 2 || j == 6) {
                        if (i > 1 && i < 8) {
                            y += (gap + cube);
                            continue;
                        }
                    }
                    if (j == 4) {
                        if (i > 0 && i < 9) {
                            y += (gap + cube);
                            continue;
                        }
                    }
                    locationList.push(letterLocation(x, y));
                }
            }
            y += (gap + cube);
        }
        if (j < 2) {
            emptyCell -= 1;
        }
        if (j > 5) {
            emptyCell += 1;
        }
        x += (gap + cube)
    }
}
const createT = (posX, posY) => {
    let x = posX;
    let y = posY;
    for (let j = 0; j < 11; j++) {
        y = posY;
        for (let i = 0; i < 10; i++) {
            if (j != 5 && i != 0) {
                break;
            }
            locationList.push(letterLocation(x, y));
            y += (gap + cube);
        }
        x += (gap + cube)
    }
}
const createF = (posX, posY) => {
    let x = posX;
    let y = posY;
    for (let j = 0; j < 6; j++) {
        y = posY;
        for (let i = 0; i < 10; i++) {
            if (j == 0) {
                locationList.push(letterLocation(x, y));
            } else if (j > 0 && j < 5) {
                if (i == 0 || i == 4) {
                    locationList.push(letterLocation(x, y));
                }
            } else if (j >= 5) {
                if (i == 0) {
                    locationList.push(letterLocation(x, y));
                }
            }
            y += (gap + cube);
        }
        x += (gap + cube);
    }
}
const createU = (posX, posY) => {
    let x = posX;
    let y = posY;
    for (let j = 0; j < 7; j++) {
        y = posY;
        for (let i = 0; i < 10; i++) {
            if (j == 0 || j == 6) {
                if (i < 8) {
                    locationList.push(letterLocation(x, y));
                }
            }
            if ((j == 1 || j == 5) && i == 7) {
                locationList.push(letterLocation(x, y));
                locationList.push(letterLocation(x, y + (gap + cube)));
            }
            if ((j == 2 || j == 4) && i == 8) {
                locationList.push(letterLocation(x, y));
                locationList.push(letterLocation(x, y + (gap + cube)));
            }
            if (j == 3 && i == 9) {
                locationList.push(letterLocation(x, y));
            }
            y += (gap + cube);
        }
        x += (gap + cube);
    }
}
const createD = (posX, posY) => {
    let x = posX;
    let y = posY;
    for (let j = 0; j < 8; j++) {
        y = posY;
        for (let i = 0; i < 10; i++) {
            if (j == 0) {
                locationList.push(letterLocation(x, y));
            } else if (j > 0 && j < 5) {
                if (i == 0 || i == 9) {
                    locationList.push(letterLocation(x, y));
                }
            } else if (j == 5) {
                if (i == 0 || i == 7) {
                    locationList.push(letterLocation(x, y));
                    locationList.push(letterLocation(x, y += (gap + cube)));
                }
            } else if (j == 6) {
                if (i == 1 || i == 6) {
                    locationList.push(letterLocation(x, y));
                    locationList.push(letterLocation(x, y += (gap + cube)));
                }
            } else if (j == 7) {
                if (i >= 2 && i <= 7) {
                    locationList.push(letterLocation(x, y));
                }
            }
            y += (gap + cube);
        }
        x += (gap + cube);
    }
}
//#endregion