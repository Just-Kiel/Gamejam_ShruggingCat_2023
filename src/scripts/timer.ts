//Le Timer
class Timer {
    
        //Le temps quand le tomer est lance
        //int 
        startTicks;
        //Le temps enregistre quand le Timer a ete mis en pause
        //int 
        pausedTicks;
        
        //Le statut du timer
        //bool 
        paused;
        //bool 
        started;
        
        //Initialise les variables
        constructor() {
            this.startTicks = 0;
            this.pausedTicks = 0;
            this.paused = false;
            this.started = false;
        }
        
        //Les différentes actions du Timer
        Start() {
            //On demarre le Timer
            this.started = true;
            
            //On enleve la pause du Timer
            this.paused = false;
            
            //On récupère le temps courant
            this.startTicks = millis();
        }

        Stop() {
            //On stoppe le Timer
            this.started = false;
            
            //On enleve la pause
            this.paused = false;
        }

        Pause() {
            //Si le timer est en marche et pas encore en pause
            if (this.started && !this.paused) {
                //On met en pause le Timer
                this.paused = true;
                
                //On calcule le temps qu'on a deja chronometre
                this.pausedTicks = millis() - this.startTicks;
            }
        }

        Unpause() {
            //Si le Timer est en pause
            if (this.paused) {
                //On enleve la pause
                this.paused = false;
                
                //On remet a zero le startTicks
                this.startTicks = millis() - this.pausedTicks;
                
                //On enleve le temps enregistre precedemment
                this.pausedTicks = 0;
            }
        }
        
        //Récupère le nombre de millisecondes depuis le debut du timer ou
        //le temps enregistre depuis sa mise en pause
        //int 
        Get_ticks() {
            //si le Timer est en marche
            if (this.started) {
                //si le Timer est en pause
                if (this.paused) {
                    //On retourne le dernier temps enregistre
                    return this.pausedTicks;
                }
                else {
                    //On retourne le temps courant moins le temps quand il a demarre
                    return millis() - this.startTicks;
                }
            }
            
            //Si le Timer n'a pas demarre
            return 0;
        }
        
        //Fonctions de verifications du statut du Timer
        //bool 
        Is_started() {
            return this.started;
        }

        //bool 
        Is_paused() {
            return this.paused;
        }
    };
    