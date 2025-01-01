import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AddRestaurantDto } from './add-restaurant.dto';
import { DbService } from '../../nest/services/db.service';
import { MongoSession, RestaurantModel } from '../../db/models/index.typegoose';
import { TablesService } from '../table/table.service';

@Controller('restaurant')
export class RestaurantsController {
  constructor(private readonly dbService: DbService, private readonly tableService: TablesService) {
  }

  @Post()
  async addRestaurant(
    @Body() addRestaurantDto: AddRestaurantDto,
    @Res() res: Response,
  ) {
    const sessionObj = await MongoSession.createInstance();
    try {
      const newRestaurant = await this.dbService.createDocIfNotExists(
        addRestaurantDto,
        { phone: addRestaurantDto.phone, name: addRestaurantDto.name },
        RestaurantModel,
        sessionObj
      );
      await this.tableService.addTables(newRestaurant.id, addRestaurantDto.tables, sessionObj);
      await sessionObj.commitTransaction()
      res.status(201).json(newRestaurant);
    } catch (error) {
      await sessionObj.abortTransaction()
      console.error('Error caught in controller:', error);
      throw new HttpException(
        'Failed to add restaurant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getRestaurants(@Res() res: Response) {
    try {
      const restaurants = await this.dbService.queryAllDocs(
        {},
        RestaurantModel,
        '-phone',
      );
      res.status(200).json(restaurants);
    } catch (error) {
      console.error('Error caught in controller:', error);
      throw new HttpException(
        'Failed to get restaurants',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':restId')
  async getRestaurant(@Param('restId') restId: string, @Res() res: Response) {
    try {
      const restaurant = await this.dbService.queryById(
        restId,
        RestaurantModel,
        '-phone',
      );
      if (!restaurant) throw new Error(`Couldnt find rest with this Id`)
      res.status(200).json(restaurant);
    } catch (error) {
      console.error('Error caught in controller:', error);
      throw new HttpException(
        'Failed to get restaurant',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
