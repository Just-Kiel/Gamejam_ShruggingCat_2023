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
    if ((Math.random()*100)<currentPercentage/80){
        countBoss.Start()
        return true
    }

    return false
}