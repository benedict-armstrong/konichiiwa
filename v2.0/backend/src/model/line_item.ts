const DOMAIN = process.env.DOMAIN;

export interface Line_item {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images?: string[];
      metadata?: {
        size: string;
        color: string;
      };
    };
  };
  quantity: number;
}

export class Line_item implements Line_item {
  constructor(
    name: string,
    description: string,
    price: number,
    images?: string[],
    metadata?: { size: string; color: string }
  ) {
    this.price_data = {
      currency: "eur",
      product_data: {
        name: name,
        description: description,
        metadata: metadata,
      },
      unit_amount: price,
    };
    this.quantity = 1;
    if (images) {
      this.price_data.product_data.images = images.map(
        (img) => DOMAIN + "/assets/" + img
      );
    }
  }
}
