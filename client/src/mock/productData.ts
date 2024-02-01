interface Product {
  _id: string;
  title: string;
  brand: string;
  category: string;
  color: string;
  price: number;
  quantity: number;
  sold: number;
  totalrating: any;
  tags: string;
  description: string;
  images: any;
  ratings: any;
}

const petShopProducts: Product[] = [
  {
    _id: "1",
    title: "Dog Food - Premium Blend",
    brand: "PetDelight",
    category: "Dog Food",
    color: "Brown",
    price: 25.99,
    quantity: 100,
    sold: 50,
    totalrating: 4.5,
    tags: "premium, nutrition, dog food",
    description: "A premium blend of nutrition-rich ingredients for your dog's health and vitality",
    images: [
      {
        url: "/images/product.jpg"
      },
      {
        url: "/images/product1.jpg"
      }
    ],
    ratings: [
      { user: "user123", rating: 5 },
      { user: "user456", rating: 4 }
      // Additional ratings can be added
    ]
  },
  {
    _id: "2",
    title: "Catnip Toy - Fish Design",
    brand: "KittyJoy",
    category: "Cat Toys",
    color: "Multi-color",
    price: 8.99,
    quantity: 200,
    sold: 120,
    totalrating: 4.2,
    tags: "catnip, toy, fish",
    description:
      "Entertain your cat with this catnip-infused fish-shaped toy. Provides hours of fun!",
    images: [
      {
        url: "/images/product2.jpg"
      },
      {
        url: "/images/product3.jpg"
      }
    ],
    ratings: [
      { user: "user789", rating: 4 },
      { user: "user101", rating: 4.5 }
      // Additional ratings can be added
    ]
  },
  {
    _id: "3",
    title: "Dog",
    brand: "Monge",
    category: "Dog Toys",
    color: "Multi-color",
    price: 28.99,
    quantity: 200,
    sold: 120,
    totalrating: 4.2,
    tags: "dognip, toy, fish",
    description: "Entertain your dog with this catnip-infused toy. Provides hours of fun!",
    images: [
      {
        url: "/images/product4.jpg"
      },
      {
        url: "/images/product5.jpg"
      }
    ],
    ratings: [
      { user: "user789", rating: 4 },
      { user: "user101", rating: 4.5 }
      // Additional ratings can be added
    ]
  },
  {
    _id: "4",
    title: "Catnip",
    brand: "Tropiclean",
    category: "Cat",
    color: "Multi-color",
    price: 65.99,
    quantity: 200,
    sold: 120,
    totalrating: 4.2,
    tags: "catnip, toy, fish",
    description:
      "Entertain your cat with this catnip-infused fish-shaped toy. Provides hours of fun!",
    images: [
      {
        url: "/images/product6.jpg"
      },
      {
        url: "/images/product7.jpg"
      }
    ],
    ratings: [
      { user: "user789", rating: 4 },
      { user: "user101", rating: 4.5 }
      // Additional ratings can be added
    ]
  }
  // Add more products as needed
];

export default petShopProducts;
