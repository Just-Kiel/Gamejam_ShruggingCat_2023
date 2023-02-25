//Permet de differencier les entites
enum Type {
    ENTITY_TYPE_GENERIC = 0,
    ENTITY_TYPE_PLAYER,
    ENTITY_TYPE_OBJECT,
    ENTITY_TYPE_BOSS
};

class CEntity {

    static EntityList : Array<CEntity> ;
    
    anim_Control : CAnimation;
    Surf_Entity : p5.Image;
    
    //float 
    X;
    //float 
    Y;
    
    //int 
    width;
    //int 
    height;
    
    //int 
    type;
    
    //int 
    currentFrameCol;
    //int 
    currentFrameRow;
    //int 
    frameCol;
    //int 
    frameRow;
    
    //Timer 
    clock;
    //int 
    end_clock;
    
    constructor() {

        this.X = this.Y = 0.0;
        this.width = this.height = 0;
    
        this.type = Type.ENTITY_TYPE_GENERIC;
        
        this.currentFrameCol = 0;
        this.currentFrameRow = 0;
        this.frameCol = 0;
        this.frameRow = 0;
    }
    
    //bool 
    //int width
    //int height
    //int maxFrames
    //int R
    //int G
    //int B
    OnLoad(File : string, width, height, maxFrames, R, G, B) {

    }
    
    OnLoop?();
    OnRender?();
    OnCleanup?();
    OnAnimate?();
};