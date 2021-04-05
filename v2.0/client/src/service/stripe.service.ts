import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/DTO/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const stripe_url = environment.backendUrl + '/api/stripe/create-session';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private httpClient: HttpClient) {}

  createNewCheckoutSession(id: number, size: string) {}
}
