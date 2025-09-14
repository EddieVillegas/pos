import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Product } from 'generated/prisma';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService){}

  async create({ 
    categories, 
    ...data
  } : CreateProductDto
  ) : Promise<Product | null> {
    return this.prisma.product.create({
      data: {
          ...data,
          categories: { 
            connect: categories?.map(id => ({ id })) 
          }
      }
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        categories: true
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(
    id: number, 
    { categories, ...data }: UpdateProductDto
  ) {
    return this.prisma.product.update({
      data: {
        ...data,
        categories: {
          connect: categories?.map(id => ({id}))
        }
      },
      where: { id }
    })
  }

  async remove(id: number) {
    const removedCategory = await this.prisma.product.delete({
      where: {
        id
      }
    })
    return removedCategory
  }
}
