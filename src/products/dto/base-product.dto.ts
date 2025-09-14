import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Prisma } from "generated/prisma"

export class BaseProductDto {
    @IsNumber()
    id: number

    @IsString({message: "name not valid"})
    @IsNotEmpty({message: "name should be not empty"})
    name: string
    
    @IsString()
    image?: string
    
    @IsNumber({maxDecimalPlaces: 2}, {message: "price should be a number"})
    price: number
    
    @IsNumber()
    inventory: number
    
    @IsString()
    description: string
    
    categories: []
}