export interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoleRequest {
  name: string;
  description: string;
}