//Permet de differencier les entites
enum Type {
    ENTITY_TYPE_GENERIC = 0,
    ENTITY_TYPE_PLAYER,
    ENTITY_TYPE_OBJECT,
    ENTITY_TYPE_BOSS
};

class CEntity {

    static EntityList : Array<CEntity> = new Array(10);
    
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
        this.anim_Control = new CAnimation();

        this.X = this.Y = 0.0;
        this.width = this.height = 0;
    
        this.type = Type.ENTITY_TYPE_GENERIC;
        
        this.currentFrameCol = 0;
        this.currentFrameRow = 0;
        this.frameCol = 0;
        this.frameRow = 0;
    }
    
    //int width
    //int height
    //int maxFrames
    //int R
    //int G
    //int B
    OnLoad(File : string, width, height, maxFrames) {
        this.Surf_Entity = CSurface.OnLoad(File);

        this.width = width;
        this.height = height;
        
        this.anim_Control.maxFrames = maxFrames;
    }

    OnLoop(){
        this.OnAnimate();
    } 

    OnRender(){
        //Si la camera suit le joueur on dessine le joueur au centre
        //Le cas echeant, on calcule ses coordonnees
        CSurface.OnDraw(this.Surf_Entity, this.X, this.Y, (this.frameCol + this.currentFrameCol) * this.width, ((this.frameRow + this.currentFrameRow) + this.anim_Control.GetCurrentFrame()) * this.height, this.width, this.height);
    } 
    
    OnAnimate() {
        this.anim_Control.OnAnimate();
    }
};