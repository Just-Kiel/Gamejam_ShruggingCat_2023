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
//       Drawing
// -------------------

function draw() {
    background("black")
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()
}

function windowResized() {
    p6_ResizeCanvas()
}


// Load image
// https://p5js.org/reference/#/p5/loadImage

// Windows 1920 _ 1080