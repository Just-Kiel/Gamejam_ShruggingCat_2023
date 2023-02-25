class CFPS {
    
    static FPSControl : CFPS = new CFPS();

    //int 
    oldTime;
    //int 
    lastTime;
    
    //Donnee qui permet de s'adapter a la vitesse de l'ordinateur
    //float 
    speedFactor;
    
    //int 
    numFrames;
    //int 
    frames;
    
    constructor() {
        this.oldTime = 0;
        this.lastTime = 0;
        
        this.speedFactor = 0;
        
        this.frames = 0;
        this.numFrames = 0;
    }
    
    OnLoop() {
        //Compte quand une seconde est passee
        if (this.oldTime + 1000 < millis()) {
            this.oldTime = millis();
            
            this.numFrames = frames;
            
            this.frames = 0;
        }
        
        //Donnee calculee en partant de la vitesse "ideale" de 32FPS
        this.speedFactor = ((millis() - this.lastTime) / 1000.0) * 32.0;
        
        this.lastTime = millis();
        
        this.frames++;
    }
    
    //int 
    GetFPS() {
        return this.numFrames;
    }
    
    //float 
    GetSpeedFactor() {
        return this.speedFactor;
    }
};
    