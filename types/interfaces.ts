export interface Banner {
  _id: string;
  image: string;
  title: string;
  createdAt: Date;
  link: string;
  updatedAt: Date;
}

export interface PaginatedProducts {
  products: Product[];
  currentPage: number;
  totalPage: number;
}

export interface Product {
  images: string[];
  totalInStock: number;
  _id: string;
  name: string;
  description: string;
  fullPrice: number;
  discountPrice?: number;
  publishedBy: PublishedBy;
  selections: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface PublishedBy {
  pinnedProducts: any[];
  _id: string;
  name: string;
  website: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  account: string;
  banner: string;
  logo: string;
  story: string;
  products: any[];
  id: string;
}

export interface User {
  name: string;
  birthday: string;
  picture: string;
  gender: string;
}
