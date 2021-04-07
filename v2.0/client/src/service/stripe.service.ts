import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from 'src/DTO/order';

const stripe_url = environment.backendUrl + 'stripe/create-session';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private httpClient: HttpClient) {}

  createNewCheckoutSession(order: Order): Observable<{ id: string }> {
    console.log('Creating new checkout session');
    return this.httpClient.post<{ id: string }>(stripe_url, order);
  }
}
