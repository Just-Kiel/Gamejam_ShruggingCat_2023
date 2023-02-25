function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      //DO SOMETHING
    } else if (keyCode === RIGHT_ARROW) {
      //DO SOMETHING
    }
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        //DO SOMETHING
      } else if (keyCode === RIGHT_ARROW) {
        //DO SOMETHING
      }
}

class CApp {
    //VFX_FW : CVFX; //VFX example
    
    //clock : Timer; //Timer example
    Walter : CPlayer;
    menu : Menu;
    
    //bool
    inMenu;
    //bool 
    inGame;
    //bool 
    inVictory;
    //bool 
    inDefeat;
    
    constructor(){
        this.inMenu = true;
        this.inGame = false;
        this.inVictory = false;
        this.inDefeat = false;
    } 
    
    OnInit() {
        
        //Initialisation du joueur
        this.Walter = new CPlayer();
        this.Walter.OnLoad("./src/assets/PKM_1.png", 32, 32, 2);
        
        //Initialisation du menu
        //À REMPLIR
        
        //Placement et ajout du joueur dans les entites
        this.Walter.X = mouseX;
        this.Walter.Y= mouseY;
        CEntity.EntityList[0] = this.Walter;
    }
    
    mouseButtonPressed() {
        if (mouseIsPressed === true) {
            if (mouseButton === LEFT) {
                //X = MouseX Y = MouseY
            }
            if (mouseButton === RIGHT) {
                //DO SOMETHING
            }
            if (mouseButton === CENTER) {
                //DO SOMETHING
            }
        }
    }

    OnLoop() {
        CFPS.FPSControl.OnLoop();

        if (this.inGame) {
            for (let i = 0; i < 1; i++) {                
                CEntity.EntityList[i].OnLoop();
            }
        }
    
        if (this.inVictory) {
            //VICTORY LOOP
        }
        if (this.inDefeat) {
            //DEFEAT LOOP
        }
    }

    OnRender() {
        if (this.inMenu) {
            //menu.OnRender();
        }
        
        if (this.inGame) {
            for (let i = 0; i < 1; i++) {
                
                CEntity.EntityList[i].OnRender();
                this.Walter.OnRender();
            }
        }
        
        if (this.inVictory) {
            //VICTORY ON RENDER
        }
        else if (this.inDefeat) {
            //DEFEAT ON RENDER
        }
    }
    
};
    