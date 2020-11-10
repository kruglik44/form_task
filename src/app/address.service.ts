import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) { }
  getAddress(altitude, longitude){
    return this.http.get("https://geocode-maps.yandex.ru/1.x/?apikey=7eb3e9e2-e56e-487b-84bf-5d8710ff164d&format=json&geocode=" + altitude + "," + longitude);
  }

}
