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

// -------------------
//       Drawing
// -------------------

function draw() {
    background("black")
    drawPartOfImage(imageTest, 600, 250, 50, 50)

    image(imageTest, 0, 0)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    // need to add ./src/assets
    imageTest = generateImage("./src/assets/test_image.png")
    // imageTest = generateImage("https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387__480.png")
}

function windowResized() {
    p6_ResizeCanvas()
}

// load image + return image stockée dans les classes concernées
// regles on les affiche où ?