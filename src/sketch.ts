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
let menu : Menu;
let theApp : CApp;

// -------------------
//       Drawing
// -------------------

function draw() {
    clear()
    //move to onrender
    menu.OnDraw(0, 0)
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
    //move to oninit
    menu = new Menu([0.55, 0.65], [0.56, 0.78]);
    menu.OnLoad();
}

function windowResized() {
    p6_ResizeCanvas()
}