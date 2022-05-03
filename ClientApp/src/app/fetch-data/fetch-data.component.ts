import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup } from '@angular/forms'

import {  UserService } from '../services/user.service'
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

interface User{
  firstname: string,
  lastname: string,
  age: number,
  id?: number
}

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  public users: Array<any> = [];

  closeResult = '';

  userGroup: FormGroup

  baseUrl: string;

  constructor(
    private http: HttpClient, 
    @Inject('BASE_URL') baseUrl: string, 
    private modalService: NgbModal,
    private fb: FormBuilder,
    private userS: UserService
    ) {

      this.baseUrl = baseUrl;

      // http.get<WeatherForecast[]>(baseUrl + 'api/weatherforecast').subscribe(result => {
      //   this.forecasts = result;
      // }, error => console.error(error));

      // http.get(baseUrl + "api/customer").subscribe((data: any) => {
      //   this.users = data;
      // })
  }


  getUsers(){
    this.http.get(this.baseUrl + "api/customer").subscribe((data: any) => {
      this.users = data;
    })
  }

  ngOnInit(): void {
    this.userGroup = this.fb.group({
      firstname: null,
      lastname: null,
      age: null,
      id: null
    });

    this.getUsers();
  }

  open(content: any) {
    this.userGroup.reset();

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  save(data: any){
    console.log(this.userGroup.value);

    const { id } = this.userGroup.value;

    if(id == null){
      this.userS.postuser(this.userGroup.value).subscribe(data => {
        this.getUsers();
        this.modalService.dismissAll();
      }, (error: any) => {

      })
    } else{
      this.userS.updateuser(this.userGroup.value).subscribe(data => {
        this.getUsers();
        this.modalService.dismissAll();
      }, (error: any) => {

      })
    }
   
  }

  delete(user: any){
    console.log(user)
    this.userS.deleteuser(user.id).subscribe(data => {
      this.getUsers();
      this.modalService.dismissAll();
    })
  }

  edit(content: any, user: any){
    this.userGroup.patchValue(user);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
