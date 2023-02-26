function UpdatePercentage(currentPercentage){
    let newPercentage = currentPercentage
    if (theApp.inMiniGame == StateOfGame.CATFLIX) {
        newPercentage += 0.2
    }
    
    if (theApp.inMiniGame == StateOfGame.TINDER) {
        newPercentage += 0.08
    }

    return newPercentage
}

function UpdateBossApparition(currentPercentage) {
    if (tempoBoss == 0) {
        tempoBoss = random(1, 5 - (currentPercentage*4/100));
    }
    else if (countBoss.Get_ticks() > tempoBoss*1000 && !theApp.bossVisible){
        tempoBoss = 3;
        countBoss.Start()
        return true
    }

    return false
}