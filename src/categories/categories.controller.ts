import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id ', IdValidationPipe) id: number
  ) {
    const category = await this.categoriesService.findOne(id);
    if(!category) throw new HttpException(`category ${id} doesn't exists`, HttpStatus.NOT_FOUND)
    return category
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: number, 
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(
    @Param('id', IdValidationPipe) id: string
  ) {
    return this.categoriesService.remove(+id);
  }
}
