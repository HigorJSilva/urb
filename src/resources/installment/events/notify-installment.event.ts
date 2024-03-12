export interface ITenantContact {
  email?: string;
  fone?: string;
}

export interface IInvoiceInfo {
  tenantName: string;
  month: string;
  amount: string;
}
export class NotifyInstallmentEvent {
  constructor(
    public readonly tenantContact: ITenantContact,
    public readonly invoiceInfo: IInvoiceInfo,
  ) {}
}
