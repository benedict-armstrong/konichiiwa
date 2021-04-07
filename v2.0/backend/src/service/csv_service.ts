import { Csv_product } from "@model/csv_product";
import { Product } from "@model/product";
import { downloadResource } from "@util/json2csv";
import { getAll } from "./product_service";

const controller: any = {
  download: async (req: any, res: any) => {
    let products: Product[] = getAll();

    let csv_products: Csv_product[] = products.map(
      (product) => new Csv_product(product)
    );

    return downloadResource(res, "products.csv", csv_products);
  },
};

export default controller;
