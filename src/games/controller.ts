import { JsonController, Get, Post, Body,} from 'routing-controllers'
import Games from './entity';

const color = ['red', 'blue', 'green', 'yellow', 'magenta']

@JsonController()
export default class GameController {

  @Get('/games')
  async AllGames() {
    const games = await Games.find()
    return {games}
  }

  @Post('/games')
  createGame(
    @Body() games: Games
  ) {
    games.color = color [Math.floor(Math.random() *5)]
    return games.save()
  }
}