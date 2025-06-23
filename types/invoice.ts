export interface Invoice {
  id: string;
  client: string;
  event?: string;
  amount: number;
  status: string;
  dueDate: string;
  createdDate?: string;
  paidDate?: string;
  type?: string;
}
