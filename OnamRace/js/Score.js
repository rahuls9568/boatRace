
class Score
{
	/* VARIABLES

	this.playScore;
	this.highScore;
	
	*/

	constructor()
	{
        this.playScore = 0;
        this.highScore = 0;
		//this.localStorageName = storageName;
		this.GetHighScore();
	}

    GetHighScore()
    {
        //this.highScore = localStorage.getItem(this.localStorageName) == null ? 0 : localStorage.getItem(this.localStorageName);
        return this.highScore;
    }
    
    SetHighScore()
    {
        if(this.playScore > this.highScore)
        {
            //console.log("NEW HIGHSCORE : " + this.playScore);
            //localStorage.setItem(this.localStorageName, this.playScore);
            this.highScore = this.playScore;
        }
    }

    GetScore()
    {
    	return this.playScore;
    }

    AddScore(addScore)
    {
    	this.playScore += addScore;
    }

    ResetScore()
    {
    	this.playScore = 0;
    }
}