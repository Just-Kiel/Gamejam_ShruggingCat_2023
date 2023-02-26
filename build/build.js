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
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
    }
    else if (keyCode === RIGHT_ARROW) {
    }
    else if (theApp.inMiniGame != StateOfGame.WORKING && key == ' ') {
        print("Back to work");
        theApp.inMiniGame = StateOfGame.WORKING;
    }
}
function keyReleased() {
    if (keyCode === LEFT_ARROW) {
    }
    else if (keyCode === RIGHT_ARROW) {
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
        var elements = [theApp.staticElements[3], theApp.staticElementsCoordinates[3], theApp.staticElements[4], theApp.staticElementsCoordinates[4], theApp.staticElements[5], theApp.staticElementsCoordinates[5], theApp.staticElements[6], theApp.staticElementsCoordinates[6]];
        theApp.bboxesInteractablesElements = calculateBBOXES(elements);
        if (theApp.inMiniGame == StateOfGame.WORKING) {
            if (mouseX >= theApp.bboxesInteractablesElements[0][0] && mouseX <= theApp.bboxesInteractablesElements[0][1] && mouseY >= theApp.bboxesInteractablesElements[0][2] && mouseY <= theApp.bboxesInteractablesElements[0][3]) {
                print("Launch CatFlix");
                theApp.inMiniGame = StateOfGame.CATFLIX;
            }
            if (mouseX >= theApp.bboxesInteractablesElements[1][0] && mouseX <= theApp.bboxesInteractablesElements[1][1] && mouseY >= theApp.bboxesInteractablesElements[1][2] && mouseY <= theApp.bboxesInteractablesElements[1][3]) {
                print("Launch Tinder");
                theApp.inMiniGame = StateOfGame.TINDER;
            }
            if (mouseX >= theApp.bboxesInteractablesElements[2][0] && mouseX <= theApp.bboxesInteractablesElements[2][1] && mouseY >= theApp.bboxesInteractablesElements[2][2] && mouseY <= theApp.bboxesInteractablesElements[2][3]) {
                print("Launch Plant Action");
                theApp.inMiniGame = StateOfGame.PLANT;
            }
            if (mouseX >= theApp.bboxesInteractablesElements[3][0] && mouseX <= theApp.bboxesInteractablesElements[3][1] && mouseY >= theApp.bboxesInteractablesElements[3][2] && mouseY <= theApp.bboxesInteractablesElements[3][3]) {
                print("Launch Yarn Action");
                theApp.inMiniGame = StateOfGame.YARN;
            }
        }
        if (mouseButton === LEFT) {
        }
        if (mouseButton === RIGHT) {
        }
        if (mouseButton === CENTER) {
        }
    }
}
var CApp = (function () {
    function CApp() {
        this.inMenu = true;
        this.inGame = false;
        this.inVictory = false;
        this.inDefeat = false;
        this.staticElements = [];
        this.inMiniGame = StateOfGame.WORKING;
    }
    CApp.prototype.OnInit = function () {
        var _this = this;
        this.Walter = new CPlayer();
        this.Walter.OnLoad("./src/assets/PKM_1.png", 32, 32, 2);
        this.menu = new Menu([0.55, 0.65], [0.56, 0.78], [0, 0]);
        this.menu.OnLoad();
        this.Walter.X = mouseX;
        this.Walter.Y = mouseY;
        CEntity.EntityList[0] = this.Walter;
        this.staticElements = [
            "./src/assets/game_background.png",
            "./src/assets/desk.png",
            "./src/assets/window_day.png",
            "./src/assets/computer.png",
            "./src/assets/phone.png",
            "./src/assets/plant_grown.png",
            "./src/assets/yarn_completed.png"
        ];
        this.staticElementsCoordinates = [
            [0, 0],
            [0, 0],
            [0, 0.15],
            [0.1, 0.18],
            [0.6, 0.78],
            [0.56, 0.43],
            [0., 0.52]
        ];
        var _loop_1 = function (index) {
            var element = this_1.staticElements[index];
            this_1.staticElements[index] = loadImage(element, function () {
                _this.staticElements[index].resize(windowWidth * _this.staticElements[index].width / 1920, windowHeight * _this.staticElements[index].height / 1080);
            });
        };
        var this_1 = this;
        for (var index = 0; index < this.staticElements.length; index++) {
            _loop_1(index);
        }
    };
    CApp.prototype.OnLoop = function () {
        CFPS.FPSControl.OnLoop();
        if (this.inGame) {
            for (var i = 0; i < 1; i++) {
                CEntity.EntityList[i].OnLoop();
            }
        }
        if (this.inVictory) {
        }
        if (this.inDefeat) {
        }
    };
    CApp.prototype.OnRender = function () {
        if (this.inMenu) {
            this.menu.OnDraw(0, 0);
        }
        if (this.inGame) {
            if (this.clock.Get_ticks() > 1000 * 120) {
                this.inGame = false;
                this.inMenu = true;
            }
            this.GameStaticElements();
            this.clock.ShowClock();
            for (var i = 0; i < 1; i++) {
                CEntity.EntityList[i].OnRender();
                this.Walter.OnRender();
            }
        }
        if (this.inVictory) {
        }
        else if (this.inDefeat) {
        }
    };
    CApp.prototype.GameStaticElements = function () {
        image(this.staticElements[0], 0, 0);
        image(this.staticElements[1], 0, windowHeight - this.staticElements[1].height);
        CSurface.OnDraw(this.staticElements[2], windowWidth - this.staticElements[2].width, 0.15 * windowHeight, 0, this.staticElements[2].height / 3 * Math.floor((this.clock.Get_ticks() * 3) / (120 * 1000)), this.staticElements[2].width, this.staticElements[2].height / 3);
        image(this.staticElements[3], windowWidth * this.staticElementsCoordinates[3][0], this.staticElementsCoordinates[3][1] * windowHeight);
        image(this.staticElements[4], windowWidth * this.staticElementsCoordinates[4][0], this.staticElementsCoordinates[4][1] * windowHeight);
        image(this.staticElements[5], windowWidth * this.staticElementsCoordinates[5][0], this.staticElementsCoordinates[5][1] * windowHeight);
        image(this.staticElements[6], windowWidth * this.staticElementsCoordinates[6][0], this.staticElementsCoordinates[6][1] * windowHeight);
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
})(Page || (Page = {}));
;
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
    }
    Menu.prototype.OnLoad = function () {
        this.backgroundImage = loadImage(this.backgroundImage);
        this.playButtonImage = loadImage(this.playButtonImage);
        this.rulesButtonImage = loadImage(this.rulesButtonImage);
        this.rulesBackgroundImage = loadImage(this.rulesBackgroundImage);
        this.backButtonImage = loadImage(this.backButtonImage);
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
    };
    return Menu;
}());
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
        rotate(PI + (2 * PI * this.Get_ticks() / 120000));
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