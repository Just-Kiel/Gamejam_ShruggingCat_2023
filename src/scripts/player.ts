///<reference path="entity.ts"/>

class CPlayer extends CEntity {
        constructor() {
            super();
            this.type = Type.ENTITY_TYPE_PLAYER;
            this.anim_Control.maxFrames = 4;
            this.anim_Control.SetFrameRate(500);
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
    