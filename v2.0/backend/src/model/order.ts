export interface Order {
  items: [
    {
      id: number;
      size: string;
    }
  ];
  shipping_option: string;
}
