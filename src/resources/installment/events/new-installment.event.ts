import { Installment } from '../entity/installment.entity';

export class NewInstallmentEvent {
  constructor(public installments: Installment | Installment[]) {}
}
