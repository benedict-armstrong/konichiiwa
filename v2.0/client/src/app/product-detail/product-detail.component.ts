import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/DTO/product';
import { Shipping_option } from 'src/DTO/shipping_option';
import { ProductService } from 'src/service/product.service';
import { StripeService } from 'src/service/stripe.service';
import { loadStripe } from '@stripe/stripe-js';
import { Order } from 'src/DTO/order';
import { environment } from 'src/environments/environment';

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
  checkout_clicked: boolean = false;
  tc: boolean = false;
  selected_image: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private stripeService: StripeService
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
      this.selected_image = data.images[0];
      this.calculatePrice();
    });
  }

  calculatePrice() {
    this.price = this.product.price.value + this.selected_shipping_option.price;
  }

  createNewCheckoutSession() {
    if (!this.tc) {
      alert('Please accept out Terms & Conditions.');
    } else {
      this.checkout_clicked = true;
      let order: Order = {
        items: [{ id: this.product.id, size: this.selected_size }],
        shipping_option: this.selected_shipping_option.type,
      };
      this.stripeService
        .createNewCheckoutSession(order)
        .subscribe((session) => {
          loadStripe(environment.stripeKey).then((stripe) => {
            if (stripe) {
              return stripe.redirectToCheckout({
                sessionId: session.id,
              });
            } else {
              throw new Error('Failed to initialize Stripe.');
            }
          });
        });
    }
  }
}
