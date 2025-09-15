import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService){}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto
    })
  }

  findAll(
    name?: string
  ) {
      return this.prisma.category.findMany({
        select: { id: true, name: true },
        where: name ? { name }: undefined
      })
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id }});
    if(!category) throw new NotFoundException(`Category ${id} doesn't exists`)
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id)
    const newCategory = this.prisma.category.update({
      data: updateCategoryDto, 
      where: { id: category?.id },
      select: { name : true}
    });
    return newCategory
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({where: {id}});
    return category
  }

  productsByCategory(id: number){
    return this.prisma.category.findUnique({
      where: {
        id
      },
      include: {
        products: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }
}
