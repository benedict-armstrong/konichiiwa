import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/DTO/product';
import { Shipping_option } from 'src/DTO/shipping_option';
import { ProductService } from 'src/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: Observable<string>;
  selected_size: string;
  selected_shipping_option: Shipping_option;
  price: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.params.pipe(map((p) => p.id));
    this.id.subscribe((id) => this.getProduct(parseInt(id)));
  }

  getProduct(id: number) {
    this.productService.getOneById(id).subscribe((data: Product) => {
      this.product = data;
      this.selected_size = data.size[0];
      this.selected_shipping_option = data.shipping_options[0];
      this.calculatePrice();
    });
  }

  calculatePrice() {
    this.price = this.product.price.value + this.selected_shipping_option.price;
  }
}
