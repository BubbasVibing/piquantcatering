import { faBirthdayCake, faDrumstickBite, faUtensils } from '@fortawesome/free-solid-svg-icons';
import type { MenuCategory, MenuItem } from '@/types/content';

export const menuCategories: MenuCategory[] = [
  { id: 'breakfast', name: 'Breakfast', icon: faUtensils },
  { id: 'lunch', name: 'Lunch', icon: faDrumstickBite },
  { id: 'dinner', name: 'Dinner', icon: faUtensils },
  { id: 'desserts', name: 'Desserts', icon: faBirthdayCake },
];

export const menuItems: MenuItem[] = [
  {
    id: 'fruit-platter',
    name: 'Signature Sliced Fruit Platter',
    description: 'Handpicked selection of seasonal and exotic fruits and berries',
    price: '',
    image: '/assets/images/menu/fruit-platter.jpg',
    category: 'breakfast',
    popular: true,
  },
  {
    id: 'granola-yogurt',
    name: 'Organic Oat Granola & Yogurt',
    description:
      'Cranberry pecan granola or sunflower wheat germ muesli, low fat yogurt or low-fat honey yogurt, bananas, berries',
    price: '',
    image: '/assets/images/menu/granola-yogurt.jpg',
    category: 'breakfast',
  },
  {
    id: 'mini-bagels',
    name: 'Assorted Mini Bagels',
    description: 'Imported French butter, fruit preserves, assorted cream cheeses',
    price: '',
    image: '/assets/images/menu/mini-bagels.jpg',
    category: 'breakfast',
  },
  {
    id: 'pastries-bagels',
    name: 'House Baked Mini Pastries and Bagels',
    description:
      'Miniature muffins, scones, danish, croissants, mini bagels, imported French butter, assorted cream cheeses, fruit preserves',
    price: '',
    image: '/assets/images/menu/pastries-bagels.jpg',
    category: 'breakfast',
    popular: true,
  },
  {
    id: 'smoked-salmon',
    name: 'Smoked Salmon and Mini Bagels',
    description:
      'Double smoked Atlantic salmon, assorted cream cheeses, Italian mascarpone cheese, shaved red onions, tomatoes, calamata olives, Persian cucumbers, capers',
    price: '',
    image: '/assets/images/menu/smoked-salmon.jpg',
    category: 'breakfast',
  },
  {
    id: 'british-scones',
    name: 'British Tradition',
    description:
      'Mini currant tea scones, mascarpone cheese, strawberry preserves, fresh strawberries',
    price: '',
    image: '/assets/images/menu/british-scones.jpg',
    category: 'breakfast',
  },
  {
    id: 'salmon-torta',
    name: 'Smoked Salmon Torta',
    description:
      'Layers of double smoked Atlantic salmon, goat cheese, cream cheese, fresh herbs, scallions, capers, served with whole grain bread, mini bagels or extra virgin olive oil crostini',
    price: '',
    image: '/assets/images/menu/salmon-torta.jpg',
    category: 'lunch',
  },
  {
    id: 'breakfast-sandwiches',
    name: 'Grilled Pressed Whole Wheat English Muffins',
    description:
      'Assortment including: organic scrambled eggs with spinach & smoked gouda; organic scrambled eggs with cured turkey ham, spinach & smoked gouda; organic scrambled eggs with turkey, apple and sage sausage, harissa aioli & white cheddar; organic scrambled eggs with fresh mozzarella, basil pesto & sun dried tomato pesto',
    price: '',
    image: '/assets/images/menu/breakfast-sandwiches.jpg',
    category: 'breakfast',
  },
  {
    id: 'egg-white-wraps',
    name: 'Grilled Pressed Baked Egg White Wraps',
    description:
      'Assortment including: baked egg white omelette with jack cheese, organic pinto beans, avocado & hot sauce; cured turkey ham with baked egg white omelette, jack cheese, avocado & hot sauce; baked egg white omelette with sautéed onions, peppers, turkey, apple and sage sausage, cheddar & harissa sauce',
    price: '',
    image: '/assets/images/menu/egg-white-wraps.jpg',
    category: 'breakfast',
    popular: true,
  },
  {
    id: 'vegan-sandwich',
    name: 'Vegan Coconut "Bacon" Sandwich',
    description: 'Smoked coconut, avocado, vegan aioli on seven grains bread',
    price: '',
    image: '/assets/images/menu/vegan-sandwich.jpg',
    category: 'lunch',
  },
  {
    id: 'fresh-mozzarella',
    name: 'Fresh Mozzarella Sandwich',
    description: 'Basil pesto, balsamic, tomatoes on focaccia',
    price: '',
    image: '/assets/images/menu/fresh-mozzarella.jpg',
    category: 'lunch',
  },
  {
    id: 'albacore-tuna',
    name: 'Albacore Tuna Sandwich',
    description: 'With spinach and tomato on seven grains bread',
    price: '',
    image: '/assets/images/menu/albacore-tuna.jpg',
    category: 'lunch',
  },
  {
    id: 'pecan-blt',
    name: 'Pecan BLT',
    description: 'Brown sugar beef bacon, lettuce, tomato, honey dijon, chipotle aioli on ciabatta',
    price: '',
    image: '/assets/images/menu/pecan-blt.jpg',
    category: 'lunch',
    popular: true,
  },
  {
    id: 'chicken-cobb',
    name: 'Chicken Cobb Club Wrap',
    description: 'Avocado, brown sugar beef bacon, lettuce, tomato, blue cheese',
    price: '',
    image: '/assets/images/menu/chicken-cobb.jpg',
    category: 'lunch',
  },
  {
    id: 'organic-greens',
    name: 'Organic Mesclun Greens',
    description:
      'Assorted baby lettuce, cherry tomatoes, Persian cucumbers, sesame-soy vinaigrette',
    price: '',
    image: '/assets/images/menu/organic-greens.jpg',
    category: 'dinner',
  },
  {
    id: 'chopped-salad',
    name: 'Chopped Salad',
    description:
      'Tomatoes, Persian cucumbers, red onions, fresh lemon juice, extra virgin olive oil dressing',
    price: '',
    image: '/assets/images/menu/chopped-salad.jpg',
    category: 'dinner',
  },
  {
    id: 'garden-vegetables',
    name: 'Garden Vegetables',
    description:
      'Cherry tomatoes, green beans, radish, Persian cucumber, carrots, asparagus, fennel, romaine hearts, organic mesclun, miso dressing',
    price: '',
    image: '/assets/images/menu/garden-vegetables.jpg',
    category: 'dinner',
    popular: true,
  },
  {
    id: 'greek-salad',
    name: 'Classic Greek Salad',
    description:
      'Imported Greek feta, plum tomatoes, red peppers, Persian cucumbers, calamata olives, red onions, oregano, romaine hearts, balsamic herb dressing',
    price: '',
    image: '/assets/images/menu/greek-salad.jpg',
    category: 'dinner',
  },
  {
    id: 'moroccan-chicken',
    name: 'Moroccan Chicken',
    description:
      'Bone-in chicken marinated with preserved lemon, green olives, and traditional Moroccan spices, slow roasted to perfection',
    price: '',
    image: '/assets/images/menu/moroccan-chicken.jpg',
    category: 'dinner',
    popular: true,
  },
  {
    id: 'merguez-lamb',
    name: 'Merguez Lamb and Organic Cracked Wheat',
    description:
      'Traditional lamb preparation with aromatic Moroccan spices, served with organic cracked wheat and a side of yogurt mint sauce',
    price: '',
    image: '/assets/images/menu/merguez-lamb.jpg',
    category: 'dinner',
  },
  {
    id: 'strawberries',
    name: 'Brownies and Strawberries',
    description: 'A luscious display of our signature fudge-brownies and strawberries',
    price: '',
    image: '/assets/images/menu/brownies-strawberries.jpg',
    category: 'desserts',
  },
  {
    id: 'seasonal-berries',
    name: 'Seasonal Berries and Cream',
    description:
      'A luscious presentation of assorted seasonal berries served with lightly sweetened whipped cream',
    price: '',
    image: '/assets/images/menu/berries-cream.jpg',
    category: 'desserts',
    popular: true,
  },
  {
    id: 'chocolate-cookies',
    name: 'Chewy Dark Chocolate Walnut Cookies',
    description: 'Our signature flourless cookies, no fat added',
    price: '',
    image: '/assets/images/menu/chocolate-cookies.jpg',
    category: 'desserts',
  },
  {
    id: 'chocolate-strawberries',
    name: 'Chocolate Covered Strawberries',
    description: 'Long-stem California strawberries covered with semi-sweet Belgian chocolate',
    price: '',
    image: '/assets/images/menu/chocolate-strawberries.jpg',
    category: 'desserts',
  },
];
