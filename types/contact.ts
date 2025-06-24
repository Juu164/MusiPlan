export interface Contact {
  id: string;
  name: string;
  type: string;
  role?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  status?: string;
  joinDate?: string;
  services?: string[];
  hourlyRate?: string;
  dailyRate?: string;
  capacity?: string;
}
