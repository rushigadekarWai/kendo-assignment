import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: string; // <-- Add this to match your JSON data
  FirstName: string;
  LastName: string;
  ProductName: string;
  UnitPrice: number;
  Discontinued: boolean;
  UnitsInStock: number;
  AssignedDate: string; // ISO date string
  SalesRep: string;
  Coordinator: string;
  SyncToMobile: boolean;
  CreatedSource: string;
  PrimaryEmail: string;
  PrimaryPhone: string;
  LMPLLeadID: string;
  AppointmentType: string;
  BookingAgency: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get(this.apiUrl)

  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  removeProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
