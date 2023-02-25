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

function calculateBBOXES(elements){
    let bboxes = []
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if (index % 2 == 0) {
            const followElement = elements[index+1];
            bboxes.push([followElement[0]*windowWidth, (followElement[0]*windowWidth) + element.width, 
                        followElement[1]*windowHeight, (followElement[1]*windowHeight) + element.height])
        }
    }
    return bboxes
}

function mouseClicked(){
    if(theApp.inMenu){
        let elements = [theApp.menu.playButtonImage, theApp.menu.playButtonCoordinates, theApp.menu.rulesButtonImage, theApp.menu.rulesButtonCoordinates, theApp.menu.backButtonImage, theApp.menu.backButtonCoordinates]

        let bboxes = calculateBBOXES(elements)

        if (theApp.menu.currentMenuState == Page.MENU){
            //play button
            if(mouseX >= bboxes[0][0] && mouseX <= bboxes[0][1] && mouseY >= bboxes[0][2] && mouseY <= bboxes[0][3]){
                theApp.inGame = true;
                theApp.inMenu = false;
            }

            //rules button
            if(mouseX >= bboxes[1][0] && mouseX <= bboxes[1][1] && mouseY >= bboxes[1][2] && mouseY <= bboxes[1][3]){
                theApp.menu.currentMenuState = Page.RULES
            }
        } else if (theApp.menu.currentMenuState == Page.RULES){
            //back button
            if(mouseX >= bboxes[2][0] && mouseX <= bboxes[2][1] && mouseY >= bboxes[2][2] && mouseY <= bboxes[2][3]){
                theApp.menu.currentMenuState = Page.MENU
            }
        }
    } else if (theApp.inGame) {
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
        this.menu = new Menu([0.55, 0.65], [0.56, 0.78],[0, 0]);
        this.menu.OnLoad();
        
        //Placement et ajout du joueur dans les entites
        this.Walter.X = mouseX;
        this.Walter.Y= mouseY;
        CEntity.EntityList[0] = this.Walter;
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
            this.menu.OnDraw(0, 0)
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
    