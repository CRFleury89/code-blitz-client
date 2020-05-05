import { GameToken, locations } from '../models/client.game.model';
import { GameService, HandleMoveToken, HandleSubmitCode } from '../services/game.service';
import { GameView } from '../views/game.view';
import { Fetch } from '../utils/Fetch';

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
export class GameController {

  // Use the constructor shortcut 'private' feature instead...
  //  private gameService : HandleMoveToken;

  constructor(
    private session_id: string,
    private challenge_id: string,
    private gameService: GameService,
    private gameView: GameView
    ) {
    // TODO: Study: Are constructor parameters added to 'this' class instance?
    this.gameView.bindSubmitCode(this.handleSubmitCode);

    this.gameService.bindExerciseLoaded((exercise) => {
      this.gameView.initialize(exercise);
    });

    this.gameService.bindRefreshGameplayStats((myStats,opponentStats) => {
      this.gameView.displayGameplayStats(myStats,opponentStats);
      /*
          //test
          if (html) {
            Fetch('/game', {
              method: 'POST',
              body: JSON.stringify({liveFeed: html})
          })
          .then( res => res && res.json() );            
          }
      */
    });

    locations.forEach((location)=>{
      this.gameService.bindTokenLocationChanged(
        location, (tokens: GameToken[]) => (
          this.gameView.display(location,tokens) )
      );
    });

    // NOTE: Cannot directly call this.gameService.moveToken()
    // from here because context is NOT properly conveyed
    // to service method.  We MUST call handleMoveToken below.
    // (REVIEW: THIS PATTERN)
    this.gameView.bindMoveToken(this.handleMoveToken);   
  }

  private handleMoveToken : HandleMoveToken 
      = (tokenID,direction,codeCursorTokenIndex:number) => {
    if (this.gameService.checkBudget(tokenID))
    {
      let budget = this.gameService.changeBudget(tokenID);
      this.gameView.setBudget(budget);
      this.gameService.moveToken(tokenID,direction,codeCursorTokenIndex);

      //debug -- Make sure to disable!!!
      this.handleSubmitCode();
    }
    else
    {
      this.gameView.overBudget();
    }
  }

  private handleSubmitCode = () => {
    this.gameService.checkCode()
    .then(res => {
      if(res['result'])
      {
        this.declareWinner();
      }
      else
      {
        this.gameView.submitResult('');
      }
    });
  }

  private declareWinner()
  {
    this.gameService.checkWinner()
    .then(res => {
      this.gameView.submitResult(res['winner']);
    })
  }
}