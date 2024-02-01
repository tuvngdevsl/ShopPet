export interface Blog {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  images: Array<{ url: string }>;
}

// mocks/blogData.ts
const blogData: Blog[] = [
  {
    _id: "1",
    title: "Exploring the Wonderful World of Pets",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et eleifend dui. Proin pharetra libero nec libero venenatis, et rhoncus est facilisis. Vivamus rhoncus vel augue eu tincidunt.",
    createdAt: "2024-02-01T12:30:00",
    images: [{ url: "images/blog1.jpg" }]
  },
  {
    _id: "2",
    title: "Choosing the Right Pet Food for Your Furry Friend",
    description:
      "Integer consequat, odio vel aliquet scelerisque, elit metus fringilla nunc, eu fringilla tortor purus eu justo. Proin bibendum dapibus libero, ac varius odio malesuada vel.",
    createdAt: "2024-01-15T09:45:00",
    images: [{ url: "images/blog2.png" }]
  },
  {
    _id: "3",
    title: "Tips for Training Your New Puppy",
    description:
      "Phasellus hendrerit sapien eu enim vehicula, ut congue justo tristique. Nam feugiat, leo vel fermentum vehicula, augue metus varius est, at pharetra tortor leo nec nunc.",
    createdAt: "2024-01-05T15:20:00",
    images: [{ url: "images/blog3.jpg" }]
  },
  {
    _id: "4",
    title: "The Benefits of Regular Vet Check-ups for Your Pets",
    description:
      "Suspendisse ut bibendum nisl, eget scelerisque justo. Sed at justo vitae mauris interdum vestibulum. Etiam finibus vel elit eu malesuada. Fusce ut metus vitae mauris interdum vestibulum.",
    createdAt: "2023-12-20T11:10:00",
    images: [{ url: "images/blog4.jpg" }]
  }
  // Add more blog entries as needed
];

export default blogData;
