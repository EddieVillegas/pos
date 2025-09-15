import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException, 
  ParseIntPipe,
  Query
} from '@nestjs/common';
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
  findAll(
    @Query('name') name?: string
  ) {
    return this.categoriesService.findAll(name);
  }

  @Get(':id')
  async findOne(
    @Param('id', IdValidationPipe) id: number
  ) {
    const category = await this.categoriesService.findOne(id);
    if(!category) throw new NotFoundException(`category ${id} doesn't exists`)
    return category
  }

  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const {id: categoryId} = await this.findOne(id)
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', IdValidationPipe) id: number
  ) {
    const {id: categoryId} = await this.findOne(id)
    return this.categoriesService.remove(categoryId);
  }

  @Get(':id/products')
  async productsByCategory(
    @Param('id', IdValidationPipe) id: number
  ){
    return this.categoriesService.productsByCategory(id)
  }
}
