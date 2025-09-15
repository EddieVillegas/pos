import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({where:{id}})
    if(!product) {
      const notFoundMessage = `${id} product doesn't exist`
      throw new NotFoundException(notFoundMessage)
    }
    return product
  }

  async update(
    id: number, 
    { categories, ...data }: UpdateProductDto
  ) {
    const product = await this.findOne(id)
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
    const product = await this.findOne(id)
    const removedProduct = await this.prisma.product.delete({
      where: {
        id
      }
    })
    return removedProduct
  }
}
