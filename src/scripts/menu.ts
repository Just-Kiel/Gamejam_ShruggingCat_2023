//Permet de differencier les pages du jeu
enum Page {
    MENU = 0,
    RULES
};

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
    
    constructor([xPlayButton, yPlayButton], [xRulesButton, yRulesButton], [xBackButton, yBackButton]) {
        this.currentMenuState = Page.MENU;

        this.backgroundImage = "./src/assets/background_menu.png"
        this.playButtonImage = "./src/assets/play_button.png"
        this.rulesButtonImage = "./src/assets/rules_button.png"
        this.rulesBackgroundImage = "./src/assets/rules.png"
        this.backButtonImage = "./src/assets/cursor.png"

        this.playButtonCoordinates = [xPlayButton, yPlayButton]
        this.rulesButtonCoordinates = [xRulesButton, yRulesButton]
        this.backButtonCoordinates = [xBackButton, yBackButton]
    }
    
    //Image
    OnLoad(){
        this.backgroundImage = loadImage(this.backgroundImage)
        this.playButtonImage = loadImage(this.playButtonImage)
        this.rulesButtonImage = loadImage(this.rulesButtonImage)
        this.rulesBackgroundImage = loadImage(this.rulesBackgroundImage)
        this.backButtonImage = loadImage(this.backButtonImage) 
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
        }
    }
};
    