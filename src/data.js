import oats from './assets/oats.jpg'
import chia from './assets/chia.jpg'
import sandwich from './assets/sandwich.jpg'
import ricecake from './assets/ricecake.jpg'

export const BUSINESS = {
  name: 'Aaradhya',
  tagline: 'Fresh Fuel. Everyday.',
  phone: '8882273547',
  whatsapp: '918882273547',
  address: 'New Ashok Nagar, Front of Agarwal Restaurant',
  landmark: 'Near Hanuman Mandir (110096)',
  timing: '6:00 AM to 9:00 AM',
  openHour: 6,
  closeHour: 9,
  instagram: [
    { handle: 'aaradhya_foodscorner', url: 'https://instagram.com/aaradhya_foodscorner' },
    { handle: 'bikesh9511', url: 'https://instagram.com/bikesh9511' },
  ],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Agarwal+Restaurant+New+Ashok+Nagar+Delhi+110096',
  mapsEmbed:
    'https://maps.google.com/maps?q=Agarwal%20Restaurant%20New%20Ashok%20Nagar%20Delhi%20110096&output=embed',
}

export const MENU = [
  {
    id: 'oats',
    name: 'Oats Meal',
    price: 69,
    image: oats,
    badge: 'Bestseller',
    description:
      'A hearty bowl of oats with milk, fresh fruits, crunchy dry fruits and seeds, finished with peanut butter and honey.',
    ingredients: ['Oats', 'Milk', 'Banana', 'Apple', 'Dry Fruits', 'Seeds', 'Peanut Butter', 'Honey', 'Pomegranate'],
  },
  {
    id: 'chia',
    name: 'Chia Seeds Pudding',
    price: 79,
    image: chia,
    badge: 'Light & Creamy',
    description:
      'Creamy chia pudding layered with fresh fruits, dry fruits and seeds, drizzled with honey and pomegranate.',
    ingredients: ['Chia Seeds', 'Fruits', 'Dry Fruits', 'Seeds', 'Honey', 'Pomegranate'],
  },
  {
    id: 'sandwich',
    name: 'Peanut Butter Sandwich',
    price: 59,
    image: sandwich,
    badge: 'Pocket Friendly',
    description:
      'Brown bread loaded with peanut butter, banana and apple slices, topped with dry fruits, seeds and honey.',
    ingredients: ['Brown Bread', 'Peanut Butter', 'Banana', 'Apple', 'Dry Fruits', 'Seeds', 'Honey'],
  },
  {
    id: 'ricecake',
    name: 'Brown Rice Cake',
    price: 80,
    image: ricecake,
    badge: 'Guilt-free',
    description: 'Light, crunchy & guilt-free brown rice cake. A perfect snack anytime, anywhere.',
    ingredients: ['Brown Rice', 'Dry Fruits', 'Seeds', 'Honey', 'Pomegranate'],
  },
]

export const ADDONS = [
  { id: 'pb', name: 'Extra Peanut Butter', price: 15 },
  { id: 'fruits', name: 'Extra Fruits', price: 15 },
  { id: 'dry', name: 'Extra Dry Fruits', price: 20 },
  { id: 'seeds', name: 'Extra Seeds', price: 15 },
  { id: 'honey', name: 'Extra Honey', price: 10 },
]
