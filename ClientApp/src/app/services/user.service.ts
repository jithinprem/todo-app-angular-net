import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { Router } from '@angular/router';

const apiendpoint = 'api/customer'

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient
    ){
        
    }

    postuser(data: any): Observable<any>{
        return this.http.post(apiendpoint, data).pipe();
    }

    deleteuser(id: number): Observable<any>{
        return this.http.delete(apiendpoint + `?id=${id}`).pipe();
    }

    updateuser(data: any):  Observable<any>{
        return this.http.put(apiendpoint, data).pipe();
    }

}