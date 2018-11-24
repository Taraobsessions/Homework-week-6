import { JsonController, Get, Post, Body, Param, NotFoundError, Put, MethodNotAllowedError, BadRequestError } from 'routing-controllers'
import Games from './entity';

const color = ['red', 'blue', 'green', 'yellow', 'magenta']
const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length


@JsonController()
export default class GameController {

  @Get('/games')
  async AllGames() {
    const games = await Games.find()
    return { games }
  }

  @Post('/games')
  createGame(
    @Body() games: Games
  ) {
    games.color = color[Math.floor(Math.random() * 5)]
    games.board = defaultBoard
    return games.save()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Games>
  ) {
    const games = await Games.findOne(id)
    if (update.color && !color.includes(update.color))
      throw new MethodNotAllowedError('Pick another color');

    if (!games) throw new NotFoundError('Cannot find game')

    if (update.board && moves(games.board, update.board) >= 2)
      throw new BadRequestError('Hey! no cheating!')


    return Games.merge(games, update).save()
  }
}