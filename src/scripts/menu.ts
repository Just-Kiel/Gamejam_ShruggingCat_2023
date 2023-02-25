//Permet de differencier les pages du jeu
enum Page {
    MENU = 0,
    RULES,
    GAME
};

class Menu {

    //int 
    currentMenuState;

    //image
    backgroundImage;

    // bouton jouer
    playButtonImage;
    playButtonCoordinates;
    
    // bouton regles
    rulesButtonImage;
    rulesButtonCoordinates;
    
    constructor([xPlayButton, yPlayButton], [xRulesButton, yRulesButton]) {
        this.currentMenuState = Page.MENU;

        this.backgroundImage = "./src/assets/background_menu.png"
        this.playButtonImage = "./src/assets/play_button.png"
        this.rulesButtonImage = "./src/assets/rules_button.png"

        this.playButtonCoordinates = [xPlayButton, yPlayButton]
        this.rulesButtonCoordinates = [xRulesButton, yRulesButton]
    }
    
    //Image
    OnLoad(){
        this.backgroundImage = loadImage(this.backgroundImage)
        this.playButtonImage = loadImage(this.playButtonImage)
        this.rulesButtonImage = loadImage(this.rulesButtonImage)
    }

    OnDraw(X, Y) {
        this.backgroundImage.resize(windowWidth, windowHeight);
        image(this.backgroundImage, X, Y);

        image(this.playButtonImage, this.playButtonCoordinates[0]*windowWidth, this.playButtonCoordinates[1]*windowHeight)
        image(this.rulesButtonImage, this.rulesButtonCoordinates[0]*windowWidth, this.rulesButtonCoordinates[1]*windowHeight)
    }
};
    