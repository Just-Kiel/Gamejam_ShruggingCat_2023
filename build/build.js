var imageTest;
function draw() {
    background("black");
    drawPartOfImage(imageTest, 600, 250, 50, 50);
    image(imageTest, 0, 0);
}
function setup() {
    p6_CreateCanvas();
    imageTest = generateImage("./src/assets/test_image.png");
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
        if (this.oldTime + frameRate > millis()) {
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
    CVFX.prototype.OnLoad = function (file, width, height, maxFrames, R, G, B) {
        if (R === void 0) { R = 0; }
        if (G === void 0) { G = 0; }
        if (B === void 0) { B = 0; }
        this.nbW = this.Surf_VFX.w / width;
        this.width = width;
        this.height = height;
        this.maxFrames = maxFrames;
        return true;
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
        this.X = this.Y = 0.0;
        this.width = this.height = 0;
        this.type = Type.ENTITY_TYPE_GENERIC;
        this.currentFrameCol = 0;
        this.currentFrameRow = 0;
        this.frameCol = 0;
        this.frameRow = 0;
    }
    CEntity.prototype.OnLoad = function (File, width, height, maxFrames, R, G, B) {
    };
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
var CSurface = (function () {
    function CSurface() {
    }
    CSurface.OnLoad = function (File) {
        return loadImage(File);
    };
    CSurface.OnDraw = function (Surf_Src, X, Y, X2, Y2, W, H) {
        var SpriteSheet;
        if (X2 === undefined && Y2 === undefined) {
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
    }
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