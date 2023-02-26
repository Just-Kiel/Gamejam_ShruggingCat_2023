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

                theApp.clock = new Timer()
                theApp.clock.Start()
                theApp.clock.OnLoad()
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
    
    clock : Timer; //Timer example
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
    
    staticElements
    staticElementsCoordinates

    bboxesInteractablesElements;

    constructor(){
        this.inMenu = true;
        this.inGame = false;
        this.inVictory = false;
        this.inDefeat = false;
        this.staticElements = [];
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

        // Load des images du jeu
        this.staticElements = [
            "./src/assets/game_background.png",
            "./src/assets/desk.png",
            "./src/assets/window_day.png",
            "./src/assets/computer.png",
            "./src/assets/phone.png",
            "./src/assets/plant_grown.png",
            "./src/assets/yarn_completed.png"
        ]

        this.staticElementsCoordinates = [
            [0, 0],
            [0, 0],
            [0, 0.15],
            [0.1, 0.18], // computer
            [0.6, 0.78], // phone
            [0.56, 0.43], // plant
            [0., 0.52] // yarn
        ]

        for (let index = 0; index < this.staticElements.length; index++) {
            const element = this.staticElements[index];
            this.staticElements[index] = loadImage(element, () => {
                this.staticElements[index].resize(windowWidth*this.staticElements[index].width/1920, windowHeight*this.staticElements[index].height/1080);
            })
        }

        //Calculate bboxes for interactable objects
        let elements = [this.staticElements[3], this.staticElementsCoordinates[3], this.staticElements[4], this.staticElementsCoordinates[4], this.staticElements[5], this.staticElementsCoordinates[5]]
        this.bboxesInteractablesElements = calculateBBOXES(elements)
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
            if (this.clock.Get_ticks() > 1000*120){
                this.inGame = false;

                // temp go to menu
                this.inMenu = true
            }

            this.GameStaticElements()
            this.clock.ShowClock();
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

    GameStaticElements(){
        image(this.staticElements[0], 0, 0);
        
        // desk
        image(this.staticElements[1], 0, windowHeight-this.staticElements[1].height);

        // window
        CSurface.OnDraw(this.staticElements[2], windowWidth-this.staticElements[2].width, 0.15*windowHeight, 0, this.staticElements[2].height/3 * Math.floor((this.clock.Get_ticks()*3) / (120 *1000)), this.staticElements[2].width, this.staticElements[2].height/3)
        
        // computer
        image(this.staticElements[3], windowWidth*this.staticElementsCoordinates[3][0], this.staticElementsCoordinates[3][1]*windowHeight);

        // phone
        image(this.staticElements[4], windowWidth*this.staticElementsCoordinates[4][0], this.staticElementsCoordinates[4][1]*windowHeight);

        // plant
        image(this.staticElements[5], windowWidth*this.staticElementsCoordinates[5][0], this.staticElementsCoordinates[5][1]*windowHeight);

        // yarn
        image(this.staticElements[6], windowWidth*this.staticElementsCoordinates[6][0], this.staticElementsCoordinates[6][1]*windowHeight);
    }   

    // TODO resize
};
    