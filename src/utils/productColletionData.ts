const baseUrlImage = '../assets/products';

export type ProductType = {
  id: string;
  name: string;
  price: string;
  like: boolean;
  offer: string;
  category: string;
  description: string;
  sizes: string[];
  types: string[];
};

export const productColletionData = [
  {
    id: '1',
    name: 'Suede classic XXI male',
    price: '70.00',
    like: false,
    offer: '',
    category: 'Sneakers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    color: 'black',
    types: [
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/black-type-1.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/black-type-2.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/black-type-3.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/black-type-4.png`),
    ],
  },
  {
    id: '2',
    name: 'Wild rider pickup male',
    price: '109.90',
    like: false,
    offer: '',
    category: 'Sneakers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/blue-type-1.png`),
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/blue-type-2.png`),
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/blue-type-3.png`),
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/blue-type-4.png`),
    ],
  },
  {
    id: '3',
    name: 'Popcat male',
    price: '20.00',
    like: false,
    offer: '',
    category: 'Slippers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/slippers/popcat-male/black-type-1.png`),
      require(`${baseUrlImage}/slippers/popcat-male/black-type-2.png`),
      require(`${baseUrlImage}/slippers/popcat-male/black-type-3.png`),
      require(`${baseUrlImage}/slippers/popcat-male/black-type-4.png`),
    ],
  },
  {
    id: '4',
    name: 'High performace female',
    price: '18.90',
    like: false,
    offer: '',
    category: 'T-shirts',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/t-shirts/high-performance-female/pink-type-1.png`),
    ],
  },
  {
    id: '5',
    name: 'Popcat male',
    price: '20.00',
    like: false,
    offer: '',
    category: 'Slippers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/slippers/popcat-male/white-type-1.png`),
      require(`${baseUrlImage}/slippers/popcat-male/white-type-2.png`),
      require(`${baseUrlImage}/slippers/popcat-male/white-type-3.png`),
      require(`${baseUrlImage}/slippers/popcat-male/white-type-4.png`),
    ],
  },
  {
    id: '6',
    name: 'Suede classic XXI male',
    price: '70.00',
    like: false,
    offer: '',
    category: 'Sneakers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/mustard-type-1.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/mustard-type-2.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/mustard-type-3.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/mustard-type-4.png`),
    ],
  },
  {
    id: '10',
    name: 'High performace female',
    price: '18.90',
    like: false,
    offer: '',
    category: 'T-shirts',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/t-shirts/high-performance-female/gray-type-1.png`),
    ],
  },
  {
    id: '7',
    name: 'Wild rider pickup male',
    price: '109.90',
    like: false,
    offer: '',
    category: 'Sneakers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/red-type-1.png`),
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/red-type-2.png`),
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/red-type-3.png`),
      require(`${baseUrlImage}/sneakers/wild-rider-pickup-male/red-type-4.png`),
    ],
  },
  {
    id: '9',
    name: 'High performace female',
    price: '18.90',
    like: false,
    offer: '',
    category: 'T-shirts',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/t-shirts/high-performance-female/white-type-1.png`),
    ],
  },
  {
    id: '12',
    name: 'High performace female',
    price: '18.90',
    like: false,
    offer: '',
    category: 'T-shirts',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/t-shirts/high-performance-male/green-type-1.png`),
    ],
  },
  {
    id: '8',
    name: 'Suede classic XXI male',
    price: '70.00',
    like: false,
    offer: '',
    category: 'Sneakers',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/red-type-1.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/red-type-2.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/red-type-3.png`),
      require(`${baseUrlImage}/sneakers/suede-classic-xxi-male/red-type-4.png`),
    ],
  },
  {
    id: '11',
    name: 'High performace female',
    price: '18.90',
    like: false,
    offer: '',
    category: 'T-shirts',
    description: '',
    sizes: ['10', '12', '14', '16'],
    types: [
      require(`${baseUrlImage}/t-shirts/high-performance-female/black-type-1.png`),
    ],
  },
];
