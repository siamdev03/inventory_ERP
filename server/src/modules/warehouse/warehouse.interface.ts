export interface IWarehouse {
  name: string;

  code: string;

  address: string;

  city: string;

  managerName: string;

  phone: string;

  status: "active" | "inactive";
}