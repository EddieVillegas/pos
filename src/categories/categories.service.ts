import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.prisma.category.findMany({
      select: {id: true, name: true}
    })
  }

  findOne(id: number) {
    return this.prisma.category.findFirst({
      where: {id},
      select: {id: true, name: true}
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      data: updateCategoryDto, 
      where: { id },
      select: { name : true}
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
