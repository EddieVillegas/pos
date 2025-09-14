import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, } from "class-validator"
import { Prisma } from "generated/prisma"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsDecimal()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    inventory: number
    
    @IsString()
    @IsOptional()
    description?: string
    
    @IsOptional()
    @IsArray()
    @IsNumber({}, {each:true})
    categories?: number[]

    @IsString()
    image?:string
}
