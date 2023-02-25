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
function test_draw() {
    ellipse(0, 0, 200);
}
function generateImage(link) {
    return loadImage(link);
}
function drawPartOfImage(srcImage, x, y, width, height) {
    var cutSpriteSheet = srcImage.get(x, y, width, height);
    image(cutSpriteSheet, 0, 0);
}
//# sourceMappingURL=../src/src/build.js.map