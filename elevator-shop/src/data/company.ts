// Product Type (matching original backend)
export interface Product {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  image: string
  images: string[]
  categoryId: number
  categoryName: string
  price: number
  originalPrice?: number
  stock: number
  moq: number
  unit?: string
  status: string
  salesCount?: number
  rating?: number
}

// Company Data
export const companyInfo = {
  name: 'Crystal Elevator Co., Ltd',
  shortName: 'Crystal Elevator',
  founded: 1992,
  experience: 34,
  email: 'info@crystalelevator.com',
  phone: '+86 21 8888 8888',
  address: 'Shanghai, China'
}

// Categories (from original)
export const productCategories = [
  { id: 1, name: 'Elevator Buttons', nameEn: 'Elevator Buttons', icon: '按钮' },
  { id: 2, name: 'Light Curtain', nameEn: 'Light Curtain', icon: '光幕' },
  { id: 3, name: 'Photoelectric', nameEn: 'Photoelectric Switch', icon: '光电开关' },
  { id: 4, name: 'Display', nameEn: 'Elevator Display', icon: '显示器' },
  { id: 5, name: 'COP LOP', nameEn: 'COP & LOP', icon: '操纵盘' },
  { id: 6, name: 'Door System', nameEn: 'Door Mechanism', icon: '门机' },
  { id: 7, name: 'Traction Machine', nameEn: 'Traction Machine', icon: '主机' },
  { id: 8, name: 'Safety Parts', nameEn: 'Safety Parts', icon: '安全部件' },
]

// Brands (from original)
export const brands = [
  { id: 1, name: 'KONE', logo: 'https://placehold.co/100x40/2563eb/white?text=KONE' },
  { id: 2, name: 'OTIS', logo: 'https://placehold.co/100x40/ea580c/white?text=OTIS' },
  { id: 3, name: 'Schindler', logo: 'https://placehold.co/100x40/16a34a/white?text=Schindler' },
  { id: 4, name: 'Thyssen', logo: 'https://placehold.co/100x40/dc2626/white?text=Thyssen' },
  { id: 5, name: 'Mitsubishi', logo: 'https://placehold.co/100x40/9333ea/white?text=Mitsubishi' },
  { id: 6, name: 'Hitachi', logo: 'https://placehold.co/100x40/dc2626/white?text=Hitachi' },
]

// Mock Products (matching original data structure)
export const products: Product[] = [
  {
    id: '1',
    name: '电梯按钮面板',
    nameEn: 'Elevator Button Panel',
    description: '高品质电梯按钮，带LED指示灯，触摸感应控制',
    descriptionEn: 'High-quality elevator buttons with LED indicators, touch-sensitive controls',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Elevator+Buttons',
    images: [
      'https://placehold.co/600x400/e2e8f0/1e293b?text=Buttons+1',
      'https://placehold.co/600x400/e2e8f0/1e293b?text=Buttons+2',
    ],
    categoryId: 1,
    categoryName: 'Elevator Buttons',
    price: 25.00,
    originalPrice: 30.00,
    stock: 1000,
    moq: 100,
    unit: 'piece',
    status: 'active',
    salesCount: 500,
    rating: 4.8,
  },
  {
    id: '2',
    name: '安全光幕',
    nameEn: 'Safety Light Curtain',
    description: '先进的电梯门保护安全光幕',
    descriptionEn: 'Advanced safety light curtains for elevator door protection',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Light+Curtain',
    images: [],
    categoryId: 2,
    categoryName: 'Light Curtain',
    price: 180.00,
    stock: 500,
    moq: 10,
    unit: 'set',
    status: 'active',
    salesCount: 300,
    rating: 4.9,
  },
  {
    id: '3',
    name: '光电开关',
    nameEn: 'Photoelectric Switch',
    description: '精密光电开关，用于电梯门控制',
    descriptionEn: 'Precision photoelectric switches for elevator door control',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Photoelectric',
    images: [],
    categoryId: 3,
    categoryName: 'Photoelectric',
    price: 45.00,
    stock: 800,
    moq: 50,
    unit: 'piece',
    status: 'active',
    salesCount: 200,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'LCD电梯显示器',
    nameEn: 'LCD Elevator Display',
    description: '数字LCD电梯显示器，带楼层指示',
    descriptionEn: 'Digital LCD elevator displays with floor indicators',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Display',
    images: [],
    categoryId: 4,
    categoryName: 'Display',
    price: 120.00,
    stock: 300,
    moq: 20,
    unit: 'piece',
    status: 'active',
    salesCount: 150,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'COP操纵面板',
    nameEn: 'COP Operating Panel',
    description: '轿厢操作面板，用于电梯控制',
    descriptionEn: 'Car Operating Panel for elevator control',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=COP+Panel',
    images: [],
    categoryId: 5,
    categoryName: 'COP LOP',
    price: 350.00,
    stock: 100,
    moq: 5,
    unit: 'piece',
    status: 'active',
    salesCount: 80,
    rating: 4.9,
  },
  {
    id: '6',
    name: '门机装置',
    nameEn: 'Door Operator Mechanism',
    description: '完整的门操作机构',
    descriptionEn: 'Complete door operating mechanisms',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Door+Mechanism',
    images: [],
    categoryId: 6,
    categoryName: 'Door System',
    price: 580.00,
    stock: 50,
    moq: 2,
    unit: 'set',
    status: 'active',
    salesCount: 45,
    rating: 4.8,
  },
  {
    id: '7',
    name: '电梯主机',
    nameEn: 'Traction Machine',
    description: '高性能电梯牵引主机',
    descriptionEn: 'High-performance traction machine',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Traction+Machine',
    images: [],
    categoryId: 7,
    categoryName: 'Traction Machine',
    price: 2500.00,
    stock: 20,
    moq: 1,
    unit: 'set',
    status: 'active',
    salesCount: 30,
    rating: 5.0,
  },
  {
    id: '8',
    name: '安全钳',
    nameEn: 'Safety Brake',
    description: '电梯安全制动器',
    descriptionEn: 'Elevator safety brake device',
    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Safety+Brake',
    images: [],
    categoryId: 8,
    categoryName: 'Safety Parts',
    price: 420.00,
    stock: 150,
    moq: 5,
    unit: 'piece',
    status: 'active',
    salesCount: 60,
    rating: 4.7,
  },
]
