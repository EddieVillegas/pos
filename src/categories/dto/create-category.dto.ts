import {IsNotEmpty, IsString} from 'class-validator'

export class CreateCategoryDto {
    @IsNotEmpty({message: "Category name should not empty"})
    @IsString()
    name: string
}
