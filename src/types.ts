export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
  verified: boolean;
}

export interface QuantityOption {
  id: string;
  label: string;
  weight: string;
  price: number;
  originalPrice: number;
  savings: string;
  popular?: boolean;
  gift?: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  addressDetail: string;
  quantityOptionId: string;
  note?: string;
  paymentMethod: 'cod' | 'transfer';
}

export interface SubmittedOrder extends OrderFormData {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
}

export interface Province {
  code: string;
  name: string;
  districts: District[];
}

export interface District {
  code: string;
  name: string;
  wards: string[];
}


export interface SyncStatus {
  success: boolean;
  message: string;
  sheetUrl?: string;
}
