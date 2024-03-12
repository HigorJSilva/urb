import { Rent } from '../entities/rent.entity';

export class DueRentEvent {
  constructor(public dueRentList: Rent[]) {}
}
