class CAnimation {
    
    //int
   currentFrame;

    //int 
    frameInc;
    
    //int 
    frameRate;//Milliseconds

    //long 
    oldTime;
    
    //int 
    maxFrames;
    //bool 
    oscillate;
    
    constructor() {
        this.currentFrame = 0;
        this.maxFrames = 0;
        this.frameInc = 1;
    
        this.frameRate = 100; //Milliseconds
        this.oldTime = 0;
        
        //Animation qui boucle ou boomerang
        this.oscillate = false;
    }
    //Calcul du changement de frame de l'animation
    OnAnimate() {
        if ((this.oldTime + this.frameRate) > millis()) {
            return;
        }

        this.oldTime = millis();
        
        this.currentFrame += this.frameInc;
        
        if (this.oscillate) {
            if (this.frameInc > 0) {
                if (this.currentFrame >= this.maxFrames) {
                    this.frameInc = -this.frameInc;
                }
            }
            else if (this.currentFrame <= 0) {
                this.frameInc = -this.frameInc;
            }
        }
        else if (this.currentFrame >= this.maxFrames) {
            this.currentFrame = 0;
        }
    }
    
    //Determine la vitesse de l'animation en millisecondes
    //int rate
    SetFrameRate(rate) {
        this.frameRate = rate;
    }
    //int frame
    SetCurrentFrame(frame) {
        if (frame < 0 || frame >= this.maxFrames) return;
    
        this.currentFrame = frame;
    }

    GetCurrentFrame() {
        return this.currentFrame;
    }

};