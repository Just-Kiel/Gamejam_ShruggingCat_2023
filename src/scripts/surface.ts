class CSurface {

    static Abs_path : string;
    
    constructor() {
    }
    
    //Image
    static OnLoad(File : string) : p5.Image {
        return loadImage(File);
    }

    //int X
    //int Y
    //int X2
    //int Y2
    //int W
    //int H
    static OnDraw(Surf_Src : p5.Image, X, Y);
    static OnDraw(Surf_Src : p5.Image, X, Y, X2, Y2, W, H);
    static OnDraw(Surf_Src : p5.Image, X, Y, X2?, Y2?, W?, H?) {
        let SpriteSheet;
        if (X2 === undefined && Y2 === undefined) {
            SpriteSheet = Surf_Src.get(X2, Y2, W, H);
        }
        image(SpriteSheet, X, Y);
    }

};
    