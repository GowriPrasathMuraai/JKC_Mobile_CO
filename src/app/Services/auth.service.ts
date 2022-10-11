import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ChangePassword, EMailModel, ForgotPassword, LoginModel } from "../models/master";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseAddress: string;
    attestrAddress: string;
    attestrToken: string;
    clientId: string;
    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    isLoggedin(change: boolean) {
        this.emitChangeSource.next(change);
    }
    constructor(private _httpClient: HttpClient) {
      this.baseAddress = environment.baseAddress;
      this.attestrAddress = environment.attestrAddress;
      this.attestrToken = environment.attestrToken;
      this.clientId = environment.clientId;
    }
    errorHandler(error: HttpErrorResponse): Observable<string> {
        return throwError(error.error.error_description || error.error || error.message || 'Server Error');
    }
    login(userName: string, password: string): Observable<any> {
        // tslint:disable-next-line:prefer-const
        // let data = `grant_type=password&username=${userName}&password=${password}&client_id=${this.clientId}`;
        const loginModel: LoginModel = {
          UserName: userName,
          Password: password,
          clientId: this.clientId,
        };
        return this._httpClient
          .post<any>(
            `${this.baseAddress}api/Auth/token`,
            loginModel
            // {
            //   headers: new HttpHeaders({
            //     'Content-Type': 'application/json'
            //   })
            // }
          )
          .pipe(catchError(this.errorHandler));
    }
    GetIPAddress(): Observable<any> {
        return this._httpClient
          .get<any>('https://freegeoip.net/json/?callback').pipe(
            map(response => response || {}),
            catchError(this.errorHandler1)
          );
      }
    
    
      SignOut(UserID: string): Observable<any> {
        return this._httpClient.get<any>(`${this.baseAddress}api/Master/SignOut?UserID=${UserID}`,
        ).pipe(catchError(this.errorHandler1));
      }
    
      ChangePassword(changePassword: ChangePassword): Observable<any> {
        return this._httpClient.post<any>(`${this.baseAddress}api/Master/ChangePassword`,
          changePassword,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          })
          .pipe(catchError(this.errorHandler1));
      }
      
      errorHandler1(error: HttpErrorResponse): Observable<string> {
        return throwError(error.error || error.message || 'Server Error');
      }

      ForgotPassword(forgotPassword: ForgotPassword): Observable<any> {
        return this._httpClient.post<any>(`${this.baseAddress}api/Master/ForgotPassword`,
          forgotPassword,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          })
          .pipe(catchError(this.errorHandler1));
      }
    
      SendResetLinkToMail(eMailModelmail: EMailModel): Observable<any> {
        return this._httpClient.post<any>(`${this.baseAddress}api/Master/SendResetLinkToMail`,
          eMailModelmail,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          })
          .pipe(catchError(this.errorHandler1));
    }
}