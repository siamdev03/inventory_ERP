export interface IAuditLog {
  userId: string;

  action: string;

  module: string;

  description: string;

  createdAt?: Date;
}