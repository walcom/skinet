import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;

  constructor() { }
}
