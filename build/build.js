var theApp;
function draw() {
    clear();
    theApp.OnLoop();
    theApp.OnRender();
}
function setup() {
    p6_CreateCanvas();
    theApp = new CApp();
    theApp.OnInit();
}
function windowResized() {
    p6_ResizeCanvas();
}
var __MARGIN_SIZE = 0;
function __desiredCanvasWidth() {
    return windowWidth - __MARGIN_SIZE * 2;
}
function __desiredCanvasHeight() {
    return windowHeight - __MARGIN_SIZE * 2;
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
var StateOfGame;
(function (StateOfGame) {
    StateOfGame[StateOfGame["WORKING"] = 0] = "WORKING";
    StateOfGame[StateOfGame["TINDER"] = 1] = "TINDER";
    StateOfGame[StateOfGame["PLANT"] = 2] = "PLANT";
    StateOfGame[StateOfGame["CATFLIX"] = 3] = "CATFLIX";
    StateOfGame[StateOfGame["YARN"] = 4] = "YARN";
})(StateOfGame || (StateOfGame = {}));
;
var countYarn;
var countWater;
var countTinder;
function keyPressed() {
    if (theApp.inMiniGame == StateOfGame.TINDER) {
        if (countTinder == undefined) {
            countTinder = 0;
        }
        if (countTinder % 2 == 0 && keyCode == LEFT_ARROW) {
            print("You swipped left");
            countTinder++;
            theApp.Tinder.currentFrameRow = 0;
            theApp.points += 2;
        }
        else if (countTinder % 2 == 1 && keyCode == RIGHT_ARROW) {
            print("You swipped right");
            countTinder++;
            theApp.Tinder.currentFrameRow = 1;
            theApp.points += 2;
        }
        if (countTinder > 10) {
            print("Go back to work before boss sees you !");
            theApp.Walter.currentFrameRow = 0;
            theApp.Walter.anim_Control.maxFrames = 2;
            theApp.inMiniGame = StateOfGame.WORKING;
            theApp.Tinder.currentFrameRow = 1;
            countTinder = 0;
        }
    }
    if (theApp.inMiniGame == StateOfGame.PLANT && key == "w") {
        countWater.Start();
        theApp.Plant.currentFrameRow = 1;
    }
    if (theApp.inMiniGame == StateOfGame.YARN) {
        if (countYarn == undefined) {
            countYarn = 0;
        }
        theApp.Yarn.currentFrameRow = 8 - countYarn;
        if ((countYarn == 3 || countYarn == 7) && keyCode === LEFT_ARROW)
            countYarn++;
        if ((countYarn == 2 || countYarn == 6) && keyCode === DOWN_ARROW)
            countYarn++;
        if ((countYarn == 1 || countYarn == 5) && keyCode === RIGHT_ARROW)
            countYarn++;
        if ((countYarn == 0 || countYarn == 4) && keyCode === UP_ARROW)
            countYarn++;
        if (countYarn == 8) {
            print("Yarn now ready !");
            theApp.yarnState = 1;
            theApp.Yarn.currentFrameRow = 9;
            print("Go back to work before boss sees you !");
            theApp.inMiniGame = StateOfGame.WORKING;
            countYarn = 0;
            theApp.Yarn.currentFrameRow = 0;
        }
        else {
            theApp.Yarn.currentFrameRow = 8 - countYarn;
        }
        print("Yarn count :" + countYarn);
    }
    if (keyCode === LEFT_ARROW) {
    }
    else if (keyCode === RIGHT_ARROW) {
    }
    else if (theApp.inMiniGame != StateOfGame.WORKING && key == ' ') {
        print("Back to work");
        theApp.inMiniGame = StateOfGame.WORKING;
        if (theApp.yarnState != 1) {
            countYarn = 0;
            theApp.Yarn.currentFrameRow = 9;
        }
        theApp.Walter.currentFrameRow = 0;
        theApp.Walter.anim_Control.maxFrames = 2;
        theApp.Computer.currentFrameCol = 0;
        theApp.Computer.currentFrameRow = 0;
        if (theApp.plantState != 1) {
            theApp.Plant.currentFrameRow = 0;
            theApp.inMiniGame == StateOfGame.PLANT;
        }
        print("Your points are :" + theApp.points);
    }
}
function keyReleased() {
    if (theApp.inMiniGame == StateOfGame.PLANT && key == "w") {
        countWater.Stop();
        if (countWater.Get_ticks() > 1000 * 3) {
            print("Plant now ready");
            theApp.plantState = 1;
            theApp.Plant.currentFrameRow = 2;
        }
        else {
            theApp.Plant.currentFrameRow = 0;
            print("Too fast");
        }
        print("Go back to work before boss sees you !");
        theApp.inMiniGame = StateOfGame.WORKING;
    }
    if (keyCode === LEFT_ARROW) {
    }
    else if (keyCode === RIGHT_ARROW) {
    }
    else if (theApp.inMiniGame != StateOfGame.WORKING && key == ' ') {
        print("Back to work");
        theApp.inMiniGame = StateOfGame.WORKING;
        countYarn = 0;
    }
}
function calculateBBOXES(elements) {
    var bboxes = [];
    for (var index = 0; index < elements.length; index++) {
        var element = elements[index];
        if (index % 2 == 0) {
            var followElement = elements[index + 1];
            bboxes.push([followElement[0] * windowWidth, (followElement[0] * windowWidth) + element.width,
                followElement[1] * windowHeight, (followElement[1] * windowHeight) + element.height]);
        }
    }
    return bboxes;
}
function mouseClicked() {
    if (theApp.inMenu) {
        if (theApp.menu.currentMenuState == Page.GAMEOVER || theApp.menu.currentMenuState == Page.GOODOVER || theApp.menu.currentMenuState == Page.MIDDLEOVER) {
            theApp.inDefeat = false;
            theApp.menu.currentMenuState = DetectButtonToMainMenu(theApp.menu);
        }
        var elements = [theApp.menu.playButtonImage, theApp.menu.playButtonCoordinates, theApp.menu.rulesButtonImage, theApp.menu.rulesButtonCoordinates, theApp.menu.backButtonImage, theApp.menu.backButtonCoordinates];
        var bboxes = calculateBBOXES(elements);
        if (theApp.menu.currentMenuState == Page.MENU) {
            if (mouseX >= bboxes[0][0] && mouseX <= bboxes[0][1] && mouseY >= bboxes[0][2] && mouseY <= bboxes[0][3]) {
                theApp.inGame = true;
                theApp.inMenu = false;
                theApp.clock = new Timer();
                theApp.clock.Start();
                theApp.clock.OnLoad();
            }
            if (mouseX >= bboxes[1][0] && mouseX <= bboxes[1][1] && mouseY >= bboxes[1][2] && mouseY <= bboxes[1][3]) {
                theApp.menu.currentMenuState = Page.RULES;
            }
        }
        else if (theApp.menu.currentMenuState == Page.RULES) {
            if (mouseX >= bboxes[2][0] && mouseX <= bboxes[2][1] && mouseY >= bboxes[2][2] && mouseY <= bboxes[2][3]) {
                theApp.menu.currentMenuState = Page.MENU;
            }
        }
    }
    else if (theApp.inGame) {
        var elements = [theApp.Computer, theApp.staticElementsCoordinates[3], theApp.staticElements[4], theApp.staticElementsCoordinates[4], theApp.Plant, theApp.staticElementsCoordinates[5], theApp.staticElements[6], theApp.staticElementsCoordinates[6]];
        theApp.bboxesInteractablesElements = calculateBBOXES(elements);
        if (theApp.inMiniGame == StateOfGame.WORKING) {
            if (mouseX >= theApp.bboxesInteractablesElements[0][0] && mouseX <= theApp.bboxesInteractablesElements[0][1] && mouseY >= theApp.bboxesInteractablesElements[0][2] && mouseY <= theApp.bboxesInteractablesElements[0][3]) {
                print("Launch CatFlix");
                theApp.inMiniGame = StateOfGame.CATFLIX;
            }
            if (mouseX >= theApp.bboxesInteractablesElements[1][0] && mouseX <= theApp.bboxesInteractablesElements[1][1] && mouseY >= theApp.bboxesInteractablesElements[1][2] && mouseY <= theApp.bboxesInteractablesElements[1][3]) {
                print("Launch Tinder");
                theApp.inMiniGame = StateOfGame.TINDER;
                theApp.Walter.currentFrameRow = 1;
                theApp.Walter.anim_Control.maxFrames = 1;
            }
            if (mouseX >= theApp.bboxesInteractablesElements[2][0] && mouseX <= theApp.bboxesInteractablesElements[2][1] && mouseY >= theApp.bboxesInteractablesElements[2][2] && mouseY <= theApp.bboxesInteractablesElements[2][3]) {
                print("Launch Plant Action");
                theApp.inMiniGame = StateOfGame.PLANT;
                theApp.Plant.currentFrameRow = 1;
            }
            if (mouseX >= theApp.bboxesInteractablesElements[3][0] && mouseX <= theApp.bboxesInteractablesElements[3][1] && mouseY >= theApp.bboxesInteractablesElements[3][2] && mouseY <= theApp.bboxesInteractablesElements[3][3]) {
                print("Launch Yarn Action");
                theApp.inMiniGame = StateOfGame.YARN;
            }
        }
        if (theApp.inMiniGame == StateOfGame.YARN && theApp.yarnState == 1) {
            print("Throw Yarn ! Distract the boss");
            theApp.Yarn.currentFrameRow = 9;
            theApp.yarnState = 0;
            tempoBoss = 0;
            theApp.bossVisible = false;
            countBoss.Start();
            print("Go back before boss sees you");
            theApp.inMiniGame = StateOfGame.WORKING;
        }
        if (theApp.inMiniGame == StateOfGame.YARN && theApp.yarnState == 0 && (countYarn == 0 || countYarn == undefined)) {
            theApp.Yarn.currentFrameRow = 8;
        }
        if (theApp.inMiniGame == StateOfGame.PLANT) {
            if (theApp.plantState == 1) {
                print("You relax now !");
                theApp.Plant.currentFrameRow = 0;
                theApp.plantState = 0;
                theApp.progressBarPercentage -= 15;
                if (theApp.progressBarPercentage < 15)
                    theApp.progressBarPercentage = 1;
                print("Go back before boss sees you");
                theApp.inMiniGame = StateOfGame.WORKING;
            }
        }
        if (theApp.inMiniGame == StateOfGame.CATFLIX && mouseButton === LEFT) {
            print("You see a movie, it's loud !");
            theApp.Computer.currentFrameCol = 1;
            theApp.Computer.currentFrameRow = (theApp.Computer.currentFrameRow + 1) % 2;
            theApp.points += 30;
        }
    }
}
var countBoss;
var tempoBoss = 0;
var CApp = (function () {
    function CApp() {
        this.inMenu = true;
        this.inGame = false;
        this.inVictory = false;
        this.inDefeat = false;
        this.staticElements = [];
        this.inMiniGame = StateOfGame.WORKING;
        this.yarnState = 1;
        this.points = 0;
        this.plantState = 1;
        this.progressBarImage = "./src/assets/progress.png";
        this.progressBarCoordinates = [0.79, 0.02];
        this.progressBarPercentage = 1;
        this.bossVisible = false;
    }
    CApp.prototype.OnInit = function () {
        var _this = this;
        countBoss = new Timer();
        countBoss.Start();
        countWater = new Timer();
        this.staticElements = [
            "./src/assets/game_background.png",
            "./src/assets/desk.png",
            "./src/assets/window_day.png",
            "./src/assets/computer.png",
            "./src/assets/phone.png",
            "./src/assets/plant.png",
            "./src/assets/yarn.png",
            "./src/assets/hands.png",
            "./src/assets/tinder.png",
            "./src/assets/boss.png",
            "./src/assets/space.png"
        ];
        this.progressBarImage = loadImage(this.progressBarImage, function () {
            _this.progressBarImage.resize(windowWidth * (_this.progressBarImage.width / 1920), windowHeight * (_this.progressBarImage.height / 1080));
        });
        this.Walter = new CPlayer();
        this.Walter.OnLoad(this.staticElements[7], 869, 421, 2);
        this.Computer = new CObject();
        this.Computer.OnLoad(this.staticElements[3], 814, 767, 1);
        this.Plant = new CObject();
        this.Plant.OnLoad(this.staticElements[5], 171, 316, 1);
        this.Yarn = new CObject();
        this.Yarn.OnLoad(this.staticElements[6], 199, 254, 1);
        this.Tinder = new CObject();
        this.Tinder.OnLoad(this.staticElements[8], 482, 631, 1);
        this.menu = new Menu([0.55, 0.65], [0.56, 0.78], [0, 0]);
        this.menu.OnLoad();
        this.staticElementsCoordinates = [
            [0, 0],
            [0, 0],
            [0, 0.15],
            [0.1, 0.18],
            [0.6, 0.78],
            [0.56, 0.43],
            [0., 0.52],
            [0.1, 0.65],
            [0.115, 0.455],
            [0.43, 0.3],
            [0.26, 0.02]
        ];
        var _loop_1 = function (index) {
            var element = this_1.staticElements[index];
            this_1.staticElements[index] = loadImage(element, function () {
                _this.staticElements[index].resize(windowWidth * (_this.staticElements[index].width / 1920), windowHeight * (_this.staticElements[index].height / 1080));
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.staticElements.length; index++) {
            _loop_1(index);
        }
        this.Computer.X = windowWidth * this.staticElementsCoordinates[3][0];
        this.Computer.Y = windowHeight * this.staticElementsCoordinates[3][1];
        this.Computer.Owidth = 1628;
        this.Computer.Oheight = 1534;
        this.Computer.width *= windowWidth / 1920.0;
        this.Computer.height *= windowHeight / 1080.0;
        CEntity.EntityList[0] = this.Computer;
        this.Plant.X = windowWidth * this.staticElementsCoordinates[5][0];
        this.Plant.Y = windowHeight * this.staticElementsCoordinates[5][1];
        this.Plant.Owidth = 171;
        this.Plant.Oheight = 948;
        this.Plant.width *= windowWidth / 1920.0;
        this.Plant.height *= windowHeight / 1080.0;
        this.Plant.currentFrameRow = 2;
        CEntity.EntityList[1] = this.Plant;
        this.Yarn.X = windowWidth * this.staticElementsCoordinates[6][0];
        this.Yarn.Y = windowHeight * this.staticElementsCoordinates[6][1];
        this.Yarn.Owidth = 199;
        this.Yarn.Oheight = 2540;
        this.Yarn.width *= windowWidth / 1920.0;
        this.Yarn.height *= windowHeight / 1080.0;
        CEntity.EntityList[2] = this.Yarn;
        this.Walter.X = windowWidth * this.staticElementsCoordinates[7][0];
        this.Walter.Y = windowHeight * this.staticElementsCoordinates[7][1];
        this.Walter.Owidth = 869;
        this.Walter.Oheight = 842;
        this.Walter.width *= windowWidth / 1920.0;
        this.Walter.height *= windowHeight / 1080.0;
        CEntity.EntityList[3] = this.Walter;
        this.Tinder.X = windowWidth * this.staticElementsCoordinates[8][0];
        this.Tinder.Y = windowHeight * this.staticElementsCoordinates[8][1];
        this.Tinder.Owidth = 482;
        this.Tinder.Oheight = 1262;
        this.Tinder.width *= windowWidth / 1920.0;
        this.Tinder.height *= windowHeight / 1080.0;
        this.Tinder.currentFrameRow = 1;
        this.ENTITY = 4;
    };
    CApp.prototype.restart = function () {
        tempoBoss = 0;
        countBoss.Start();
        this.Computer.currentFrameCol = 0;
        this.Computer.currentFrameRow = 0;
        this.Computer.anim_Control.maxFrames = 1;
        this.Plant.currentFrameCol = 0;
        this.Plant.currentFrameRow = 2;
        this.Plant.anim_Control.maxFrames = 1;
        this.Yarn.currentFrameCol = 0;
        this.Yarn.currentFrameRow = 0;
        this.Yarn.anim_Control.maxFrames = 1;
        this.Walter.currentFrameCol = 0;
        this.Walter.currentFrameRow = 0;
        this.Walter.anim_Control.maxFrames = 2;
        this.Tinder.currentFrameCol = 0;
        this.Tinder.currentFrameRow = 1;
        this.Tinder.anim_Control.maxFrames = 1;
        this.inMenu = true;
        this.inGame = false;
        this.inVictory = false;
        this.inDefeat = false;
        this.inMiniGame = StateOfGame.WORKING;
        this.yarnState = 1;
        this.points = 0;
        this.plantState = 1;
        this.progressBarPercentage = 1;
        this.bossVisible = false;
        countYarn = 0;
    };
    CApp.prototype.OnLoop = function () {
        CFPS.FPSControl.OnLoop();
        if (this.inGame) {
            for (var i = 0; i < this.ENTITY; i++) {
                CEntity.EntityList[i].OnLoop();
                CEntity.EntityList[i].Surf_Entity.resize(windowWidth * (CEntity.EntityList[i].Owidth / 1920.0), windowHeight * (CEntity.EntityList[i].Oheight / 1080.0));
                this.Tinder.OnLoop();
                this.Tinder.Surf_Entity.resize(windowWidth * (this.Tinder.Owidth / 1920.0), windowHeight * (this.Tinder.Oheight / 1080.0));
            }
            if (this.inMiniGame == StateOfGame.PLANT && keyIsDown(87)) {
                if (countWater.Get_ticks() > 1000 * 3) {
                    print("Plant now ready");
                    theApp.plantState = 1;
                    theApp.Plant.currentFrameRow = 2;
                    print("Back to work");
                    theApp.inMiniGame = StateOfGame.WORKING;
                    countWater.Stop();
                }
            }
            this.progressBarPercentage = UpdatePercentage(this.progressBarPercentage);
            if (!this.bossVisible)
                this.bossVisible = UpdateBossApparition(this.progressBarPercentage);
            if (this.bossVisible && countBoss.Get_ticks() > 1000 * tempoBoss) {
                countBoss.Start();
                this.bossVisible = false;
            }
            if (this.progressBarPercentage > 100) {
                this.inDefeat = true;
                this.inGame = false;
            }
            if (this.inMiniGame != StateOfGame.WORKING && this.bossVisible && countBoss.Get_ticks() > 1000 * 1.5) {
                this.inDefeat = true;
                this.inGame = false;
            }
        }
        if (this.inVictory) {
        }
        if (this.inDefeat) {
            print("You loose");
            this.menu.currentMenuState = Page.GAMEOVER;
            this.inMenu = true;
        }
    };
    CApp.prototype.OnRender = function () {
        if (this.inMenu) {
            this.menu.OnDraw(0, 0);
        }
        if (this.inGame) {
            if (this.clock.Get_ticks() > 1000 * 40) {
                this.inGame = false;
                this.inMenu = true;
                this.menu.currentMenuState = Page.GOODOVER;
                if (this.points > 700) {
                    this.menu.currentMenuState = Page.GOODOVER;
                }
                else {
                    this.menu.currentMenuState = Page.MIDDLEOVER;
                }
            }
            this.GameStaticElements();
            this.clock.ShowClock();
            for (var i = 0; i < this.ENTITY; i++) {
                CEntity.EntityList[i].OnRender();
            }
            if (this.inMiniGame != StateOfGame.WORKING) {
                image(this.staticElements[10], windowWidth * this.staticElementsCoordinates[10][0], this.staticElementsCoordinates[10][1] * windowHeight);
            }
            if (this.inMiniGame == StateOfGame.TINDER) {
                theApp.Tinder.OnRender();
            }
            CSurface.OnDraw(this.progressBarImage, (windowWidth * 0.995) - (this.progressBarPercentage * this.progressBarImage.width) / 100, this.progressBarCoordinates[1] * windowHeight, this.progressBarImage.width - (this.progressBarPercentage * this.progressBarImage.width / 100), 0, (this.progressBarPercentage * this.progressBarImage.width) / 100, this.progressBarImage.height);
        }
        if (this.inVictory) {
        }
        else if (this.inDefeat) {
        }
    };
    CApp.prototype.GameStaticElements = function () {
        image(this.staticElements[0], 0, 0);
        image(this.staticElements[1], 0, windowHeight - this.staticElements[1].height);
        CSurface.OnDraw(this.staticElements[2], windowWidth - this.staticElements[2].width, 0.15 * windowHeight, 0, this.staticElements[2].height / 3 * Math.floor((this.clock.Get_ticks() * 3) / (40 * 1000)), this.staticElements[2].width, this.staticElements[2].height / 3);
        image(this.staticElements[4], windowWidth * this.staticElementsCoordinates[4][0], this.staticElementsCoordinates[4][1] * windowHeight);
        if (this.bossVisible == true) {
            image(this.staticElements[9], windowWidth * this.staticElementsCoordinates[9][0], this.staticElementsCoordinates[9][1] * windowHeight);
        }
    };
    return CApp;
}());
;
var CFPS = (function () {
    function CFPS() {
        this.oldTime = 0;
        this.lastTime = 0;
        this.speedFactor = 0;
        this.frames = 0;
        this.numFrames = 0;
    }
    CFPS.prototype.OnLoop = function () {
        if (this.oldTime + 1000 < millis()) {
            this.oldTime = millis();
            this.numFrames = frames;
            this.frames = 0;
        }
        this.speedFactor = ((millis() - this.lastTime) / 1000.0) * 32.0;
        this.lastTime = millis();
        this.frames++;
    };
    CFPS.prototype.GetFPS = function () {
        return this.numFrames;
    };
    CFPS.prototype.GetSpeedFactor = function () {
        return this.speedFactor;
    };
    CFPS.FPSControl = new CFPS();
    return CFPS;
}());
;
var CAnimation = (function () {
    function CAnimation() {
        this.currentFrame = 0;
        this.maxFrames = 0;
        this.frameInc = 1;
        this.frameRate = 100;
        this.oldTime = 0;
        this.oscillate = false;
    }
    CAnimation.prototype.OnAnimate = function () {
        if ((this.oldTime + this.frameRate) > millis()) {
            return;
        }
        this.oldTime = millis();
        this.currentFrame += this.frameInc;
        if (this.oscillate) {
            if (this.frameInc > 0) {
                if (this.currentFrame >= this.maxFrames) {
                    this.frameInc = -this.frameInc;
                }
            }
            else if (this.currentFrame <= 0) {
                this.frameInc = -this.frameInc;
            }
        }
        else if (this.currentFrame >= this.maxFrames) {
            this.currentFrame = 0;
        }
    };
    CAnimation.prototype.SetFrameRate = function (rate) {
        this.frameRate = rate;
    };
    CAnimation.prototype.SetCurrentFrame = function (frame) {
        if (frame < 0 || frame >= this.maxFrames)
            return;
        this.currentFrame = frame;
    };
    CAnimation.prototype.GetCurrentFrame = function () {
        return this.currentFrame;
    };
    return CAnimation;
}());
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CVFX = (function (_super) {
    __extends(CVFX, _super);
    function CVFX() {
        var _this = _super.call(this) || this;
        _this.X = 0;
        _this.Y = 0;
        _this.nbW = 0;
        _this.width = 0;
        _this.height = 0;
        _this.frameCol = 0;
        _this.frameRow = -1;
        _this.currentFrameCol = 0;
        _this.currentFrameRow = 0;
        return _this;
    }
    CVFX.prototype.VFX_end = function () {
        if ((this.GetCurrentFrame() >= this.maxFrames - 1) || (this.frameRow == -1)) {
            this.frameRow = -1;
            this.currentFrame = 0;
            return true;
        }
        return false;
    };
    CVFX.prototype.Start = function () {
        this.frameRow = 0;
    };
    CVFX.prototype.Stop = function () {
        this.frameRow = -1;
        this.currentFrame = 0;
    };
    CVFX.prototype.OnLoad = function (file, width, height, maxFrames) {
        this.Surf_VFX = CSurface.OnLoad(file);
        this.nbW = this.Surf_VFX.w / width;
        this.width = width;
        this.height = height;
        this.maxFrames = maxFrames;
    };
    CVFX.prototype.OnRender = function () {
        if (this.VFX_end())
            return;
        CSurface.OnDraw(this.Surf_VFX, this.X, this.Y, (this.frameCol + this.GetCurrentFrame() % this.nbW) * this.width, (this.frameRow + this.GetCurrentFrame() / this.nbW) * this.height, this.width, this.height);
    };
    return CVFX;
}(CAnimation));
;
function test_draw() {
    ellipse(0, 0, 200);
}
var Type;
(function (Type) {
    Type[Type["ENTITY_TYPE_GENERIC"] = 0] = "ENTITY_TYPE_GENERIC";
    Type[Type["ENTITY_TYPE_PLAYER"] = 1] = "ENTITY_TYPE_PLAYER";
    Type[Type["ENTITY_TYPE_OBJECT"] = 2] = "ENTITY_TYPE_OBJECT";
    Type[Type["ENTITY_TYPE_BOSS"] = 3] = "ENTITY_TYPE_BOSS";
})(Type || (Type = {}));
;
var CEntity = (function () {
    function CEntity() {
        this.anim_Control = new CAnimation();
        this.X = this.Y = 0.0;
        this.width = this.height = 0;
        this.type = Type.ENTITY_TYPE_GENERIC;
        this.currentFrameCol = 0;
        this.currentFrameRow = 0;
        this.frameCol = 0;
        this.frameRow = 0;
    }
    CEntity.prototype.OnLoad = function (File, width, height, maxFrames) {
        this.Surf_Entity = CSurface.OnLoad(File);
        this.width = width;
        this.height = height;
        this.anim_Control.maxFrames = maxFrames;
    };
    CEntity.prototype.OnLoop = function () {
        this.OnAnimate();
    };
    CEntity.prototype.OnRender = function () {
        CSurface.OnDraw(this.Surf_Entity, this.X, this.Y, (this.frameCol + this.currentFrameCol) * this.width, ((this.frameRow + this.currentFrameRow) + this.anim_Control.GetCurrentFrame()) * this.height, this.width, this.height);
    };
    CEntity.prototype.OnAnimate = function () {
        this.anim_Control.OnAnimate();
    };
    CEntity.EntityList = new Array(10);
    return CEntity;
}());
;
function generateImage(link) {
    return loadImage(link);
}
function drawPartOfImage(srcImage, x, y, width, height) {
    var cutSpriteSheet = srcImage.get(x, y, width, height);
    image(cutSpriteSheet, 0, 0);
}
var Page;
(function (Page) {
    Page[Page["MENU"] = 0] = "MENU";
    Page[Page["RULES"] = 1] = "RULES";
    Page[Page["GAMEOVER"] = 2] = "GAMEOVER";
    Page[Page["GOODOVER"] = 3] = "GOODOVER";
    Page[Page["MIDDLEOVER"] = 4] = "MIDDLEOVER";
})(Page || (Page = {}));
;
function DetectButtonToMainMenu(menu) {
    var bbox = calculateBBOXES([menu.finalImages[1], menu.finalCoordinates[1]]);
    if (mouseX >= bbox[0][0] && mouseX <= bbox[0][1] && mouseY >= bbox[0][2] && mouseY <= bbox[0][3]) {
        theApp.restart();
        return Page.MENU;
    }
    else {
        return menu.currentMenuState;
    }
}
var Menu = (function () {
    function Menu(_a, _b, _c) {
        var xPlayButton = _a[0], yPlayButton = _a[1];
        var xRulesButton = _b[0], yRulesButton = _b[1];
        var xBackButton = _c[0], yBackButton = _c[1];
        this.currentMenuState = Page.MENU;
        this.backgroundImage = "./src/assets/background_menu.png";
        this.playButtonImage = "./src/assets/play_button.png";
        this.rulesButtonImage = "./src/assets/rules_button.png";
        this.rulesBackgroundImage = "./src/assets/rules.png";
        this.backButtonImage = "./src/assets/back_button.png";
        this.playButtonCoordinates = [xPlayButton, yPlayButton];
        this.rulesButtonCoordinates = [xRulesButton, yRulesButton];
        this.backButtonCoordinates = [xBackButton, yBackButton];
        this.finalImages = [
            "./src/assets/gameover.png",
            "./src/assets/main_menu.png",
            "./src/assets/goodend.png",
            "./src/assets/middleend.png"
        ];
        this.finalCoordinates = [
            [0, 0],
            [0.7, 0.8],
            [0, 0],
            [0, 0]
        ];
    }
    Menu.prototype.OnLoad = function () {
        var _this = this;
        this.backgroundImage = loadImage(this.backgroundImage);
        this.playButtonImage = loadImage(this.playButtonImage);
        this.rulesButtonImage = loadImage(this.rulesButtonImage);
        this.rulesBackgroundImage = loadImage(this.rulesBackgroundImage);
        this.backButtonImage = loadImage(this.backButtonImage);
        var _loop_2 = function (index) {
            var element = this_2.finalImages[index];
            this_2.finalImages[index] = loadImage(element, function () {
                _this.finalImages[index].resize(windowWidth * (_this.finalImages[index].width / 1920), windowHeight * (_this.finalImages[index].height / 1080));
            });
        };
        var this_2 = this;
        for (var index = 0; index < this.finalImages.length; index++) {
            _loop_2(index);
        }
    };
    Menu.prototype.OnDraw = function (X, Y) {
        if (this.currentMenuState == Page.MENU) {
            this.backgroundImage.resize(windowWidth, windowHeight);
            image(this.backgroundImage, X, Y);
            image(this.playButtonImage, this.playButtonCoordinates[0] * windowWidth, this.playButtonCoordinates[1] * windowHeight);
            image(this.rulesButtonImage, this.rulesButtonCoordinates[0] * windowWidth, this.rulesButtonCoordinates[1] * windowHeight);
        }
        else if (this.currentMenuState == Page.RULES) {
            this.rulesBackgroundImage.resize(windowWidth, windowHeight);
            image(this.rulesBackgroundImage, X, Y);
            image(this.backButtonImage, this.backButtonCoordinates[0] * windowWidth, this.backButtonCoordinates[1] * windowHeight);
        }
        else if (this.currentMenuState == Page.GAMEOVER) {
            image(this.finalImages[0], this.finalCoordinates[0][0] * windowWidth, this.finalCoordinates[0][1] * windowHeight);
            image(this.finalImages[1], this.finalCoordinates[1][0] * windowWidth, this.finalCoordinates[1][1] * windowHeight);
        }
        else if (this.currentMenuState == Page.GOODOVER) {
            image(this.finalImages[2], this.finalCoordinates[2][0] * windowWidth, this.finalCoordinates[2][1] * windowHeight);
            image(this.finalImages[1], this.finalCoordinates[1][0] * windowWidth, this.finalCoordinates[1][1] * windowHeight);
        }
        else if (this.currentMenuState == Page.MIDDLEOVER) {
            image(this.finalImages[3], this.finalCoordinates[3][0] * windowWidth, this.finalCoordinates[3][1] * windowHeight);
            image(this.finalImages[1], this.finalCoordinates[1][0] * windowWidth, this.finalCoordinates[1][1] * windowHeight);
        }
    };
    return Menu;
}());
;
var CObject = (function (_super) {
    __extends(CObject, _super);
    function CObject() {
        var _this = _super.call(this) || this;
        _this.type = Type.ENTITY_TYPE_OBJECT;
        _this.anim_Control.maxFrames = 0;
        _this.anim_Control.SetFrameRate(0);
        return _this;
    }
    CObject.prototype.OnLoad = function (File, Width, Height, maxFrames) {
        _super.prototype.OnLoad.call(this, File, Width, Height, maxFrames);
    };
    CObject.prototype.OnLoop = function () {
        _super.prototype.OnLoop.call(this);
    };
    CObject.prototype.OnRender = function () {
        _super.prototype.OnRender.call(this);
    };
    CObject.prototype.OnAnimate = function () {
        _super.prototype.OnAnimate.call(this);
    };
    return CObject;
}(CEntity));
;
var CPlayer = (function (_super) {
    __extends(CPlayer, _super);
    function CPlayer() {
        var _this = _super.call(this) || this;
        _this.type = Type.ENTITY_TYPE_PLAYER;
        _this.anim_Control.maxFrames = 4;
        _this.anim_Control.SetFrameRate(500);
        return _this;
    }
    CPlayer.prototype.OnLoad = function (File, Width, Height, maxFrames) {
        _super.prototype.OnLoad.call(this, File, Width, Height, maxFrames);
    };
    CPlayer.prototype.OnLoop = function () {
        _super.prototype.OnLoop.call(this);
    };
    CPlayer.prototype.OnRender = function () {
        _super.prototype.OnRender.call(this);
    };
    CPlayer.prototype.OnAnimate = function () {
        _super.prototype.OnAnimate.call(this);
    };
    return CPlayer;
}(CEntity));
;
function UpdatePercentage(currentPercentage) {
    var newPercentage = currentPercentage;
    if (theApp.inMiniGame == StateOfGame.CATFLIX) {
        newPercentage += 0.2;
    }
    if (theApp.inMiniGame == StateOfGame.TINDER) {
        newPercentage += 0.08;
    }
    return newPercentage;
}
function UpdateBossApparition(currentPercentage) {
    if (tempoBoss == 0) {
        tempoBoss = random(1, 5 - (currentPercentage * 4 / 100));
    }
    else if (countBoss.Get_ticks() > tempoBoss * 1000 && !theApp.bossVisible) {
        tempoBoss = 3;
        countBoss.Start();
        return true;
    }
    return false;
}
var CSurface = (function () {
    function CSurface() {
    }
    CSurface.OnLoad = function (File) {
        return loadImage(File);
    };
    CSurface.OnDraw = function (Surf_Src, X, Y, X2, Y2, W, H) {
        var SpriteSheet = Surf_Src;
        if (X2 !== undefined && Y2 !== undefined) {
            SpriteSheet = Surf_Src.get(X2, Y2, W, H);
        }
        image(SpriteSheet, X, Y);
    };
    return CSurface;
}());
;
var Timer = (function () {
    function Timer() {
        this.startTicks = 0;
        this.pausedTicks = 0;
        this.paused = false;
        this.started = false;
        this.clockImage = "./src/assets/clock.png";
        this.clockCoordinates = [0.6, 0.1];
    }
    Timer.prototype.OnLoad = function () {
        var _this = this;
        this.clockImage = loadImage(this.clockImage, function () {
            _this.clockImage.resize(windowWidth * _this.clockImage.width / 1920, windowHeight * _this.clockImage.height / 1080);
        });
    };
    Timer.prototype.ShowClock = function () {
        image(this.clockImage, this.clockCoordinates[0] * windowWidth, this.clockCoordinates[1] * windowHeight);
        push();
        strokeWeight(10);
        stroke(73, 72, 70);
        translate(this.clockCoordinates[0] * windowWidth + (this.clockImage.width / 2), this.clockCoordinates[1] * windowHeight + (this.clockImage.height / 2));
        rotate(PI + (2 * PI * this.Get_ticks() / 40000));
        line(0, 50, 0, 0);
        pop();
    };
    Timer.prototype.Start = function () {
        this.started = true;
        this.paused = false;
        this.startTicks = millis();
    };
    Timer.prototype.Stop = function () {
        this.started = false;
        this.paused = false;
    };
    Timer.prototype.Pause = function () {
        if (this.started && !this.paused) {
            this.paused = true;
            this.pausedTicks = millis() - this.startTicks;
        }
    };
    Timer.prototype.Unpause = function () {
        if (this.paused) {
            this.paused = false;
            this.startTicks = millis() - this.pausedTicks;
            this.pausedTicks = 0;
        }
    };
    Timer.prototype.Get_ticks = function () {
        if (this.started) {
            if (this.paused) {
                return this.pausedTicks;
            }
            else {
                return millis() - this.startTicks;
            }
        }
        return 0;
    };
    Timer.prototype.Is_started = function () {
        return this.started;
    };
    Timer.prototype.Is_paused = function () {
        return this.paused;
    };
    return Timer;
}());
;
//# sourceMappingURL=../src/src/build.js.map