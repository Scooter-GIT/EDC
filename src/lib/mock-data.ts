export const mockProducts = [
  {
    id: "1",
    slug: "amd-ryzen-7-7800x3d",
    name: "AMD Ryzen 7 7800X3D 4.2 GHz 8-Core Processor",
    brand: "AMD",
    description: "High-performance gaming processor with 3D V-Cache technology",
    currentPrice: 449.99,
    listPrice: 499.99,
    category: { name: "Processors" },
    images: [{
      url: "/placeholder.svg",
      alt: "AMD Ryzen 7 7800X3D Processor"
    }],
    specifications: {
      "Base Clock": "4.2 GHz",
      "Boost Clock": "5.0 GHz",
      "Cores": "8",
      "Threads": "16",
      "TDP": "120W",
      "Socket": "AM5",
    },
    reviewCount: 128
  },
  // Add more mock products as needed
] 