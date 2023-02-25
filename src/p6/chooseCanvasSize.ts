// -------------------
// Choose how your canvas will fit in the window
// You can uncomment the option you want, and comment the others
// -------------------

// -------------------
// Option 1 : Canvas with a fixed aspect ratio
// -------------------
const __ASPECT_RATIO = 1
const __MARGIN_SIZE = 25 // in pixels

function __desiredCanvasWidth(): number {
    const windowRatio = windowWidth / windowHeight
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO
    }
}
function __desiredCanvasHeight(): number {
    const windowRatio = windowWidth / windowHeight
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2
    }
}

// -------------------
// Option 2 : Canvas that fills the window
// -------------------
// const __MARGIN_SIZE = 0 // in pixels

// function __desiredCanvasWidth(): number {
//     return windowWidth - __MARGIN_SIZE * 2
// }
// function __desiredCanvasHeight(): number {
//     return windowHeight - __MARGIN_SIZE * 2
// }


// -------------------
// You don't need to touch the code bellow ;)
// -------------------
let __canvas: p5.Renderer // Need to access this each time we resize the window, to center the canvas

function __centerCanvas() {
    __canvas.position((windowWidth - width)/2, (windowHeight - height)/2)
}
/**
 *   Creates a canvas to start drawing. This is a wrapper around the p5 function createCanvas(w, h) ;
 *   it chooses the size automatically, based on the current option. You can change the option in the p6/chooseCanvasSize.ts file.
 */
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight())
    __centerCanvas()
}
/**
 *   Resizes the canvas. This is a wrapper around the p5 function resizeCanvas(w, h) ;
 *   it chooses the size automatically, based on the current option. You can change the option in the p6/chooseCanvasSize.ts file.
 */
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight())
    __centerCanvas()
}