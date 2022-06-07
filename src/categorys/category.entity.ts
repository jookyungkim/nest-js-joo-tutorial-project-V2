import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryBoard } from './category-board.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @OneToMany(() => CategoryBoard, (categroyBoard) => categroyBoard.categroy)
  categoryBoard: CategoryBoard;

  @ManyToOne(() => Category, (category) => category.childCategories)
  parentCategory: Category; // Category는 여러개지만 부모는 하나

  @OneToMany(() => Category, (category) => category.parentCategory)
  childCategories: Category[]; // 내가 부모일때 자식이 여러개

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
