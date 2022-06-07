import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Board } from '../boards/board.entity';

@Entity()
export class CategoryBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category)
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  categroy: Category[];

  @ManyToOne(() => Board)
  @JoinColumn([{ name: 'boardId', referencedColumnName: 'id' }])
  board: Board[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
