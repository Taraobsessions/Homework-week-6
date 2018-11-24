import { JsonController, Get,} from 'routing-controllers'
import Games from './entity';

@JsonController()
export default class GameController {

  @Get('/games')
  async AllGames() {
    const games = await Games.find()
    return {games}
  }
}