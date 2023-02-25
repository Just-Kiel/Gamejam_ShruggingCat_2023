function generateImage(link){
    return loadImage(link);
}

function drawPartOfImage(srcImage, x, y , width, height){
    cutSpriteSheet = srcImage.get(x, y, width, height);
    image(cutSpriteSheet, 0, 0)
}