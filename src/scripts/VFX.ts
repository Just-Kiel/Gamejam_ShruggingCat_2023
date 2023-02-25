///<reference path="animation.ts"/>

class CVFX extends CAnimation {
    
    //p5.Image
    Surf_VFX;

    //int 
    nbW;
    //int 
    width;
    //int 
    height;
    
    //int 
    X;
    //int 
    Y;
    
    //int 
    frameCol;
    //int 
    frameRow;
    
    //int 
    currentFrameCol;
    //int 
    currentFrameRow;
    
    constructor() {
        super();
        this.X = 0;
        this.Y = 0;
        this.nbW = 0;
        this.width = 0;
        this.height = 0;
        this.frameCol = 0;
        this.frameRow = -1;
        this.currentFrameCol = 0;
        this.currentFrameRow = 0;
    }
    
    //Regarde et arrete le VFX une fois qu'il a fini
    //bool 
    VFX_end() {
        if ((this.GetCurrentFrame() >= this.maxFrames-1) || (this.frameRow == -1)){
            this.frameRow = -1;
            this.currentFrame = 0;
            return true;
        }
        return false;
    }
    
    Start() {
        this.frameRow = 0;
    }

    Stop() {
        this.frameRow = -1;
        this.currentFrame = 0;
    }
    
    //int width
    //int height
    //int maxframes
    //int R
    //int G
    //int B
    OnLoad(file : string, width, height, maxFrames) {

        this.Surf_VFX = CSurface.OnLoad(file);

        this.nbW = this.Surf_VFX.w / width;
        this.width = width;
        this.height = height;
        
        this.maxFrames = maxFrames;
    }

    OnRender() {
        if (this.VFX_end()) return;
        
        CSurface.OnDraw(this.Surf_VFX, this.X, this.Y, (this.frameCol + this.GetCurrentFrame()%this.nbW) * this.width, (this.frameRow + this.GetCurrentFrame()/this.nbW) * this.height, this.width, this.height);
    }
};
    