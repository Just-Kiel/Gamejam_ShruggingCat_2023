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
let theApp : CApp;

// -------------------
//       Drawing
// -------------------

function draw() {
    clear()
    theApp.OnLoop();
    theApp.OnRender();
}

// -------------------
//    Initialization
// -------------------

function setup() {
    p6_CreateCanvas()

    theApp = new CApp();
    theApp.OnInit();
}

function windowResized() {
    p6_ResizeCanvas()
}