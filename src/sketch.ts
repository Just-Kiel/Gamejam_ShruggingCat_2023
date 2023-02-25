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
let menu : Menu;

// -------------------
//       Drawing
// -------------------

function draw() {
    clear()

    menu.OnDraw(0, 0)
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    menu = new Menu([0.55, 0.65], [0.56, 0.78], [0, 0]);
    menu.OnLoad();
}

function windowResized() {
    p6_ResizeCanvas()
}