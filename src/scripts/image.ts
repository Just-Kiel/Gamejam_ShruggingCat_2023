// Load image
// https://p5js.org/reference/#/p5/loadImage
function generateImage(link){
    return loadImage(link);
}

function drawPartOfImage(srcImage, x, y , width, height){
    let cutSpriteSheet = srcImage.get(x, y, width, height);
    image(cutSpriteSheet, 0, 0)
}