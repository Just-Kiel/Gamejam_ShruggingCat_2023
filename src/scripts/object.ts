///<reference path="entity.ts"/>

class CObject extends CEntity {
    constructor() {
        super();
        this.type = Type.ENTITY_TYPE_OBJECT;
        this.anim_Control.maxFrames = 0;
        this.anim_Control.SetFrameRate(0);
    }
    
    //int width
    //int height
    //int maxFrames
    OnLoad(File : string, Width, Height, maxFrames) {
        super.OnLoad(File, Width, Height, maxFrames);
    }
    
    OnLoop() {
        super.OnLoop();
    }

    OnRender() {
        super.OnRender();
    }
    
    OnAnimate() {
        super.OnAnimate();
    }
};
