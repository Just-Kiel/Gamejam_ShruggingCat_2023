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
    if (random(0, 100) < currentPercentage*2/100){
        countBoss.Start()
        return true
    }

    return false
}