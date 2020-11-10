import { Component,  } from '@angular/core';
import { AddressService } from './address.service';
import { IEvent } from 'angular8-yandex-maps';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

interface User {
  firstName: string,
  secondName: string,
  email: string,
  phone: string,
  address: string,
  date: Date,
  DataProcessingAgreed: boolean,
  NotifyAgreed: boolean,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{  
  constructor(private addrService: AddressService){ 
  }
  title = 'teleform';


  user: User = {
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    address: "",
    date: new Date,
    DataProcessingAgreed: false,
    NotifyAgreed: false
  };

  userContacts = new FormGroup({
    userEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    userPhone: new FormControl('', [
      Validators.required, 
      Validators.pattern("[0-9 ]{11}")]),
  });

  showContactPart = false;
  showMap = false;
  checkBoxContainer = false;
  response;
  coords = [];

  get primEmail(){
    return this.userContacts.get('userEmail');
    }
  get primPhone(){
	return this.userContacts.get('userPhone');
  }
  openMapModal(){
    this.showMap = true;
  }
  showContacts(){
    this.showContactPart = true;
  }

  showCheckBox(){
    this.checkBoxContainer = true;
    console.log(this.user.date);
  }

  findAddress(event: IEvent) {
    if (event.type === 'click') 
       this.coords = event.event.get("coords");
    this.addrService.getAddress(this.coords[1], this.coords[0]).subscribe(data =>{
    this.response = data;
    this.user.address = this.response.response
      .GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
    console.log(this.user.address);
   })
    this.showMap = false;
  }  
  updateDOB(dateObject) {
    this.user.date = dateObject.value;
  }
  sendData(){
    this.user.email = this.userContacts.value.userEmail;
    this.user.phone = this.userContacts.value.userPhone;
    console.log(this.user);
  }
}
