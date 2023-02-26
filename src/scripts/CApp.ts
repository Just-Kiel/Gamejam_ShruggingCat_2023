//Permet de differencier les moments du jeu
enum StateOfGame {
    WORKING = 0,
    TINDER,
    PLANT,
    CATFLIX,
    YARN
};

let countYarn;
let countWater;
let countTinder;

function keyPressed() {
    if (theApp.inMiniGame == StateOfGame.TINDER) {
        if (countTinder == undefined) {
            countTinder = 0
        }

        if (countTinder % 2 == 0 && keyCode == LEFT_ARROW) {
            print("You swipped left")
            countTinder++
            theApp.points +=2
        } else if (countTinder % 2 == 1 && keyCode == RIGHT_ARROW) {
            print("You swipped right")
            countTinder++
            theApp.points +=2
        }

        if (countTinder > 10) {
            print("Go back to work before boss sees you !")
            theApp.inMiniGame = StateOfGame.WORKING
            countTinder = 0
        }
    }

    if (theApp.inMiniGame == StateOfGame.PLANT && key == "w") {
        if (countWater == undefined) {
            countWater = new Timer()
        }
        countWater.Start()
        theApp.Plant.currentFrameRow = 1;
    }

    if (theApp.inMiniGame == StateOfGame.YARN) {
        if (countYarn == undefined) {
            countYarn = 0
        }
        
        theApp.Yarn.currentFrameRow = 8 - countYarn;

        // left : 3, 7
        if ((countYarn == 3 || countYarn == 7) && keyCode === LEFT_ARROW) countYarn++;

        // down : 2, 6
        if ((countYarn == 2 || countYarn == 6) && keyCode === DOWN_ARROW) countYarn++;

        // right: 1, 5
        if ((countYarn == 1 || countYarn == 5) && keyCode === RIGHT_ARROW) countYarn++;
    
        // up   : 0, 4
        if ((countYarn == 0 || countYarn == 4) && keyCode === UP_ARROW) countYarn++;

        if (countYarn == 8) {
            print("Yarn now ready !")
            theApp.yarnState = 1
            theApp.Yarn.currentFrameRow = 9;

            print("Go back to work before boss sees you !")
            theApp.inMiniGame = StateOfGame.WORKING
            countYarn = 0
            theApp.Yarn.currentFrameRow = 0;
        }
        else {
            theApp.Yarn.currentFrameRow = 8-countYarn;
        }

        print("Yarn count :" + countYarn)
    }

    if (keyCode === LEFT_ARROW) {
      //DO SOMETHING
    } else if (keyCode === RIGHT_ARROW) {
      //DO SOMETHING
    } else if (theApp.inMiniGame != StateOfGame.WORKING && key == ' ') {
        print("Back to work")
        theApp.inMiniGame = StateOfGame.WORKING
        if (theApp.yarnState != 1) {
            countYarn = 0;
            theApp.Yarn.currentFrameRow = 9;
        }
        theApp.Computer.currentFrameCol = 0;
        theApp.Computer.currentFrameRow = 0;
        if (theApp.plantState != 1) {
            theApp.Plant.currentFrameRow = 0;
            theApp.inMiniGame == StateOfGame.PLANT
        }

        print("Your points are :" + theApp.points)
    }
}

function keyReleased() {
    if (theApp.inMiniGame == StateOfGame.PLANT && key == "w") {
        countWater.Stop()
        if (countWater.Get_ticks() > 1000 * 3) {
            print("Plant now ready")
            theApp.plantState = 1
            theApp.Plant.currentFrameRow = 2;
        } else {
            theApp.Plant.currentFrameRow = 0;
            print("Too fast")
        }
        
        print("Go back to work before boss sees you !")
        theApp.inMiniGame = StateOfGame.WORKING
    }
    if (keyCode === LEFT_ARROW) {
        //DO SOMETHING
      } else if (keyCode === RIGHT_ARROW) {
        //DO SOMETHING
      } else if (theApp.inMiniGame != StateOfGame.WORKING && key == ' ') {
        print("Back to work")
        theApp.inMiniGame = StateOfGame.WORKING
        countYarn = 0;
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
        //Calculate bboxes for interactable objects
        let elements = [theApp.Computer, theApp.staticElementsCoordinates[3], theApp.staticElements[4], theApp.staticElementsCoordinates[4], theApp.Plant, theApp.staticElementsCoordinates[5], theApp.staticElements[6], theApp.staticElementsCoordinates[6]]
        theApp.bboxesInteractablesElements = calculateBBOXES(elements)

        if (theApp.inMiniGame == StateOfGame.WORKING) {
            //computer
            if(mouseX >= theApp.bboxesInteractablesElements[0][0] && mouseX <= theApp.bboxesInteractablesElements[0][1] && mouseY >= theApp.bboxesInteractablesElements[0][2] && mouseY <= theApp.bboxesInteractablesElements[0][3]){
                print("Launch CatFlix")
                theApp.inMiniGame = StateOfGame.CATFLIX
            }

            // phone
            if(mouseX >= theApp.bboxesInteractablesElements[1][0] && mouseX <= theApp.bboxesInteractablesElements[1][1] && mouseY >= theApp.bboxesInteractablesElements[1][2] && mouseY <= theApp.bboxesInteractablesElements[1][3]){
                print("Launch Tinder")
                theApp.inMiniGame = StateOfGame.TINDER
            }
            
            // plant
            if(mouseX >= theApp.bboxesInteractablesElements[2][0] && mouseX <= theApp.bboxesInteractablesElements[2][1] && mouseY >= theApp.bboxesInteractablesElements[2][2] && mouseY <= theApp.bboxesInteractablesElements[2][3]){
                print("Launch Plant Action")
                theApp.inMiniGame = StateOfGame.PLANT
                theApp.Plant.currentFrameRow = 1;
            }
            
            // yarn
            if(mouseX >= theApp.bboxesInteractablesElements[3][0] && mouseX <= theApp.bboxesInteractablesElements[3][1] && mouseY >= theApp.bboxesInteractablesElements[3][2] && mouseY <= theApp.bboxesInteractablesElements[3][3]){
                print("Launch Yarn Action")
                theApp.inMiniGame = StateOfGame.YARN
            }
        }
        
        if (theApp.inMiniGame == StateOfGame.YARN && theApp.yarnState == 1) {
            print("Throw Yarn ! Distract the boss")
            theApp.Yarn.currentFrameRow = 9;
            theApp.yarnState = 0

            print("Go back before boss sees you")
            theApp.inMiniGame = StateOfGame.WORKING
        
        }

        if (theApp.inMiniGame == StateOfGame.YARN && theApp.yarnState == 0 && (countYarn == 0 || countYarn == undefined)) {
            theApp.Yarn.currentFrameRow = 8;
        }

        if (theApp.inMiniGame == StateOfGame.PLANT) {
            if (theApp.plantState == 1) {
                print("You relax now !")
                theApp.Plant.currentFrameRow = 0;
                theApp.plantState = 0

                print("Go back before boss sees you")
                theApp.inMiniGame = StateOfGame.WORKING
            }
        }

        if (theApp.inMiniGame == StateOfGame.CATFLIX && mouseButton === LEFT) {
            print("You see a movie, it's loud !")

            theApp.Computer.currentFrameCol = 1;
            theApp.Computer.currentFrameRow = (theApp.Computer.currentFrameRow+1) %2;

            theApp.points += 30
        }

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
    Computer : CObject;
    Plant : CObject;
    Yarn : CObject;
    menu : Menu;
    ENTITY;
    
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
    ratioStaticElements;

    bboxesInteractablesElements;
    inMiniGame;

    yarnState; // full :1 and empty :0

    plantState; // watered :1 and not :0

    // int
    points;

    constructor(){
        this.inMenu = true;
        this.inGame = false;
        this.inVictory = false;
        this.inDefeat = false;
        this.staticElements = [];
        this.inMiniGame = StateOfGame.WORKING;

        this.yarnState = 1;
        this.points = 0;
        this.plantState = 1;
    } 
    
    OnInit() {

        // Load des images du jeu
        this.staticElements = [
            "./src/assets/game_background.png",
            "./src/assets/desk.png",
            "./src/assets/window_day.png",
            "./src/assets/computer.png",
            "./src/assets/phone.png",
            "./src/assets/plant.png",
            "./src/assets/yarn.png",
            "./src/assets/hands.png",
            "./src/assets/tinder.png",
            "./src/assets/boss.png",
            "./src/assets/space.png"
        ]

        //Initialisation du joueur
        this.Walter = new CPlayer();
        this.Walter.OnLoad("./src/assets/PKM_1.png", 32, 32, 0);

        this.Computer = new CObject();
        this.Computer.OnLoad(this.staticElements[3], 814, 767, 1);
        
        this.Plant = new CObject();
        this.Plant.OnLoad(this.staticElements[5], 171, 316, 1);

        this.Yarn = new CObject();
        this.Yarn.OnLoad(this.staticElements[6], 199, 254, 1);
        
        //Initialisation du menu
        this.menu = new Menu([0.55, 0.65], [0.56, 0.78],[0, 0]);
        this.menu.OnLoad();

        this.staticElementsCoordinates = [
            [0, 0],
            [0, 0],
            [0, 0.15],
            [0.1, 0.18], // computer
            [0.6, 0.78], // phone
            [0.56, 0.43], // plant
            [0., 0.52], // yarn
            [0.1, 0.65], // hands
            [0.1, 0.45], // tinder
            [0.43, 0.3], // boss
            [0.26, 0.02] // space
        ]

        for (let index = 0; index < this.staticElements.length; index++) {
            const element = this.staticElements[index];
            this.staticElements[index] = loadImage(element, () => {
                this.staticElements[index].resize(windowWidth*(this.staticElements[index].width/1920), windowHeight*(this.staticElements[index].height/1080));
            })
        }

        
        //Placement et ajout du joueur et des objets dans les entites
        this.Computer.X = windowWidth*this.staticElementsCoordinates[3][0];
        this.Computer.Y = windowHeight*this.staticElementsCoordinates[3][1];
        this.Computer.Owidth = 1628;
        this.Computer.Oheight = 1534;
        this.Computer.width *= windowWidth/1920.0;
        this.Computer.height *= windowHeight/1080.0;
        CEntity.EntityList[0] = this.Computer;
        
        this.Plant.X = windowWidth*this.staticElementsCoordinates[5][0];
        this.Plant.Y = windowHeight*this.staticElementsCoordinates[5][1];
        this.Plant.Owidth = 171;
        this.Plant.Oheight = 948;
        this.Plant.width *= windowWidth/1920.0;
        this.Plant.height *= windowHeight/1080.0;
        this.Plant.currentFrameRow = 2;
        CEntity.EntityList[1] = this.Plant;
        this.Yarn.X = windowWidth*this.staticElementsCoordinates[6][0];
        this.Yarn.Y = windowHeight*this.staticElementsCoordinates[6][1];
        this.Yarn.Owidth = 199;
        this.Yarn.Oheight = 2540;
        this.Yarn.width *= windowWidth/1920.0;
        this.Yarn.height *= windowHeight/1080.0;
        CEntity.EntityList[2] = this.Yarn;
        this.Walter.X = windowWidth*0.1;
        this.Walter.Y = windowHeight*0.18;
        this.Walter.Owidth = 128;
        this.Walter.Oheight = 256;
        this.Walter.width *= windowWidth/1920.0;
        this.Walter.height *= windowHeight/1080.0;
        CEntity.EntityList[3] = this.Walter;
        this.ENTITY = 4;
    }

    OnLoop() {
        CFPS.FPSControl.OnLoop();
        

        if (this.inGame) {
            for (let i = 0; i < this.ENTITY; i++) {                
                CEntity.EntityList[i].OnLoop();
                CEntity.EntityList[i].Surf_Entity.resize(windowWidth*(CEntity.EntityList[i].Owidth/1920.0), windowHeight*(CEntity.EntityList[i].Oheight/1080.0));
            }

            if (this.inMiniGame == StateOfGame.PLANT && keyIsDown(87)) {
                if (countWater.Get_ticks() > 1000 * 3) {
                    print("Plant now ready")
                    theApp.plantState = 1
                    theApp.Plant.currentFrameRow = 2;
        
                    print("Back to work")
                    theApp.inMiniGame = StateOfGame.WORKING
                    countWater.Stop()
                }
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
            for (let i = 0; i < this.ENTITY; i++) {
                CEntity.EntityList[i].OnRender();
            }

            if (this.inMiniGame != StateOfGame.WORKING) {
                // space
                image(this.staticElements[10], windowWidth*this.staticElementsCoordinates[10][0], this.staticElementsCoordinates[10][1]*windowHeight);
            }

            if (this.inMiniGame == StateOfGame.TINDER) {
                image(theApp.staticElements[8], windowWidth*theApp.staticElementsCoordinates[8][0], theApp.staticElementsCoordinates[8][1]*windowHeight);
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
        // image(this.staticElements[3], windowWidth*this.staticElementsCoordinates[3][0], this.staticElementsCoordinates[3][1]*windowHeight);

        // phone
        image(this.staticElements[4], windowWidth*this.staticElementsCoordinates[4][0], this.staticElementsCoordinates[4][1]*windowHeight);

        // plant
        //image(this.staticElements[5], windowWidth*this.staticElementsCoordinates[5][0], this.staticElementsCoordinates[5][1]*windowHeight);

        // yarn
        //image(this.staticElements[6], windowWidth*this.staticElementsCoordinates[6][0], this.staticElementsCoordinates[6][1]*windowHeight);

        // hands
        image(this.staticElements[7], windowWidth*this.staticElementsCoordinates[7][0], this.staticElementsCoordinates[7][1]*windowHeight);
    
        // boss
        image(this.staticElements[9], windowWidth*this.staticElementsCoordinates[9][0], this.staticElementsCoordinates[9][1]*windowHeight);
    }
};

// faire les interactions de chaque mini jeu (starting by la pelote)
// Pelote : if pelote plein (clic gauche pour distraire) and then vide and back to work --> DONE
//          if vide (8 fleches : suivre la sprite if wrong no problem) and then pleine and back to work --> DONE

// Catflix : clic sur ordi, activation du jeu --> DONE
//           while playing : watchout boss arrive because of sound : spam clic pour gagner des points --> DONE

// Plant   : if watered : relax progress bar --> DONE
//           if not : hold w : cut auto when released (2 et 3s) --> DONE

// Tinder  : swap 10 fois avec les fleches --> DONE


// position du boss --> DONE
// progress bar : rectangle (x et y à définir et couleurs à définir)
// position barre espace --> DONE