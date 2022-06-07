import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  parentId: number;

  @IsNotEmpty()
  text: string;
}
