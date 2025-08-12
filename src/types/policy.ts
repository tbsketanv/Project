export interface Policy {
  id: number;
  policynumber: string;
  transactionid: string;
  transactiontype: string;
  endorseeffectivedate: string;
  product: string;
  program: string;
  accountnumber: string;
  insuredname: string;
  premium: number;
  policystatus: 'Booked' | 'Posted' | 'Rejected' | 'Pending' | 'Approved' | 'InProcess' | 'Hold';
  source: string;
  issueddate: string;
  lob: string;
}