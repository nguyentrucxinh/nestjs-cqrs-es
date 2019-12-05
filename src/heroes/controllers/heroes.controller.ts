import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeroDto } from '../dtos/hero.dto';
import { Hero } from '../entities/hero.entity';
import { KillDragonDto } from '../interfaces/kill-dragon-dto.interface';
import { HeroesService } from '../services/heros.service';

@Controller('heroes')
@ApiTags('Heroes')
export class HeroesGameController {
  constructor(private readonly heroesService: HeroesService) {}

  @ApiOperation({ summary: 'Get A Hero' })
  @ApiResponse({ status: 200, description: 'Get hero by id' })
  @Get(':id')
  public async findById(@Param('id') id: string): Promise<Hero> {
    return await this.heroesService.findById(id);
  }

  @ApiOperation({ summary: 'Get Heroes' })
  @ApiResponse({ status: 200, description: 'Get heroes' })
  @Get()
  public async findAll(): Promise<Hero[]> {
    return await this.heroesService.findAll();
  }

  @ApiOperation({ summary: 'Create Hero' })
  @ApiResponse({ status: 201, description: 'Create hero' })
  @Post()
  public async create(@Body() dto: HeroDto) {
    await this.heroesService.create(dto);
    return true;
  }

  @ApiOperation({ summary: 'Kill Dragon' })
  @ApiResponse({ status: 200, description: 'Hero kill dragon' })
  @Post(':id/kill')
  public async killDragon(@Param('id') id: string, @Body() dto: KillDragonDto) {
    return await this.heroesService.killDragon(id, dto);
  }
}
