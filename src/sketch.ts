// -------------------
//  Parameters and UI
// -------------------

// const gui = new dat.GUI()
// const params = {
//     Ellipse_Size: 30,
//     Download_Image: () => save(),
// }
// gui.add(params, "Ellipse_Size", 0, 100, 1)
// gui.add(params, "Download_Image")

// -------------------
//       Variables
// -------------------
let imageTest;
let cutSpriteSheet;

// -------------------
//       Drawing
// -------------------

function draw() {
    drawPartOfImage(imageTest, 600, 250, 50, 50)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    // need to add ./src/assets
    imageTest = generateImage("./src/assets/test_image.png")
}

function windowResized() {
    p6_ResizeCanvas()
}


// Load image
// https://p5js.org/reference/#/p5/loadImage

// Windows 1920 _ 1080

// load image + return image stockée dans les classes concernées
// regles on les affiche où ?
// draw part of image