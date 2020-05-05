import { Request, Response } from 'express';
import { Singleton } from '../utils/singleton';

const singleton = Singleton.getInstance();

var test = 2; // remember to remove
export class GameController
{
  public updateGameStatus (req: Request, res: Response)
  {
    res.json( req.body ); // just reflect stats for now for testing...
  }

  public updateWinner(req: Request, res: Response)
  {

    // Purely for testing purposes.
    //Remember to remove once singleton.games for these users is already instantiated elsewhere.
    if (test > 0)
    {
      singleton.games.push({session_id: req.params['userId'], challenge_id: req.params['challengeId'], tokens_placed: 0, winner: ''})
      test--;
    }

    var result = '';
    singleton.games.forEach((game) => {
      if ((game.session_id === req.params['userId'] && game.challenge_id === req.params['challengeId'])
        || (game.session_id === req.params['challengeId'] && game.challenge_id === req.params['userId']))
        if (game.winner === '')
        {
          game.winner = req.params['userId'];
          result = 'won';
        }
        else
        {
          result = 'lost';
        }
    });
    res.json({winner: result})
  }
}