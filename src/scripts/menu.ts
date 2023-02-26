//Permet de differencier les pages du jeu
enum Page {
    MENU = 0,
    RULES,
    GAMEOVER,
    GOODOVER,
    MIDDLEOVER
};

function DetectButtonToMainMenu(menu){

    // bouton
    let bbox = calculateBBOXES([menu.finalImages[1], menu.finalCoordinates[1]])

    if(mouseX >= bbox[0][0] && mouseX <= bbox[0][1] && mouseY >= bbox[0][2] && mouseY <= bbox[0][3]){
        theApp.restart();
        return Page.MENU
    } else {
        return menu.currentMenuState
    }
}

class Menu {

    //int 
    currentMenuState;

    //image
    backgroundImage;

    // bouton jouer
    playButtonImage;
    playButtonCoordinates : Array<number>;
    
    // bouton regles
    rulesButtonImage;
    rulesButtonCoordinates : Array<number>;
    rulesBackgroundImage;
    backButtonImage;
    backButtonCoordinates : Array<number>;

    // final images
    finalImages
    finalCoordinates;
    
    constructor([xPlayButton, yPlayButton], [xRulesButton, yRulesButton], [xBackButton, yBackButton]) {
        this.currentMenuState = Page.MENU;

        this.backgroundImage = "./src/assets/background_menu.png"
        this.playButtonImage = "./src/assets/play_button.png"
        this.rulesButtonImage = "./src/assets/rules_button.png"
        this.rulesBackgroundImage = "./src/assets/rules.png"
        this.backButtonImage = "./src/assets/back_button.png"

        this.playButtonCoordinates = [xPlayButton, yPlayButton]
        this.rulesButtonCoordinates = [xRulesButton, yRulesButton]
        this.backButtonCoordinates = [xBackButton, yBackButton]

        this.finalImages = [
            "./src/assets/gameover.png",
            "./src/assets/main_menu.png",
            "./src/assets/goodend.png",
            "./src/assets/middleend.png"
        ]

        this.finalCoordinates = [
            [0, 0],
            [0.7, 0.8],
            [0, 0],
            [0, 0]
        ]
    }
    
    //Image
    OnLoad(){
        this.backgroundImage = loadImage(this.backgroundImage)
        this.playButtonImage = loadImage(this.playButtonImage)
        this.rulesButtonImage = loadImage(this.rulesButtonImage)
        this.rulesBackgroundImage = loadImage(this.rulesBackgroundImage)
        this.backButtonImage = loadImage(this.backButtonImage) 
        
        for (let index = 0; index < this.finalImages.length; index++) {
            const element = this.finalImages[index];
            this.finalImages[index] = loadImage(element, () => {
                this.finalImages[index].resize(windowWidth*(this.finalImages[index].width/1920), windowHeight*(this.finalImages[index].height/1080));
            })
        }
    }

    OnDraw(X, Y) {
        if(this.currentMenuState == Page.MENU){
            this.backgroundImage.resize(windowWidth, windowHeight);
            image(this.backgroundImage, X, Y);

            image(this.playButtonImage, this.playButtonCoordinates[0]*windowWidth, this.playButtonCoordinates[1]*windowHeight)
            image(this.rulesButtonImage, this.rulesButtonCoordinates[0]*windowWidth, this.rulesButtonCoordinates[1]*windowHeight)
        } else if(this.currentMenuState == Page.RULES){
            this.rulesBackgroundImage.resize(windowWidth, windowHeight);
            image(this.rulesBackgroundImage, X, Y);

            image(this.backButtonImage, this.backButtonCoordinates[0]*windowWidth, this.backButtonCoordinates[1]*windowHeight)
        } else if (this.currentMenuState == Page.GAMEOVER){
            // background
            image(this.finalImages[0], this.finalCoordinates[0][0]*windowWidth, this.finalCoordinates[0][1]*windowHeight)

            // button
            image(this.finalImages[1], this.finalCoordinates[1][0]*windowWidth, this.finalCoordinates[1][1]*windowHeight)
        } else if (this.currentMenuState == Page.GOODOVER){
            // background
            image(this.finalImages[2], this.finalCoordinates[2][0]*windowWidth, this.finalCoordinates[2][1]*windowHeight)

            // button
            image(this.finalImages[1], this.finalCoordinates[1][0]*windowWidth, this.finalCoordinates[1][1]*windowHeight)
        } else if (this.currentMenuState == Page.MIDDLEOVER){
            // background
            image(this.finalImages[3], this.finalCoordinates[3][0]*windowWidth, this.finalCoordinates[3][1]*windowHeight)

            // button
            image(this.finalImages[1], this.finalCoordinates[1][0]*windowWidth, this.finalCoordinates[1][1]*windowHeight)
        }
    }
};
    