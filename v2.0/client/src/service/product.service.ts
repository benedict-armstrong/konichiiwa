import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/DTO/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUri = environment.backendUrl + 'product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    console.log('getting all Products');
    return this.httpClient.get<Product[]>(baseUri);
  }

  getOneById(id: number): Observable<Product> {
    console.log('Getting product');
    return this.httpClient.get<Product>(baseUri + '/' + id);
  }
}
