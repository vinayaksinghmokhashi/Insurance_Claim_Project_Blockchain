import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private http: HttpClient) { }

  createClaim(data: any){
    return this.http.post<any>("http://localhost:3000/createClaim",data);
  }

  readClaim(claimId: any){
    return this.http.get<any>(`http://localhost:3000/readClaim/${claimId}`);
  }

  getAllClaim(){
    return this.http.get<any>(`http://localhost:3000/queryAllClaims`);
  }

  requestForVerification(data: any){
    return this.http.post<any>("http://localhost:3000/requestVerification",data);
  }

  verifyClaim(data: any){
    return this.http.post<any>("http://localhost:3000/verifyClaim",data);
  }

  rejectClaim(data: any){
    return this.http.post<any>("http://localhost:3000/rejectClaim",data);
  }
  
  rejectVerification(data: any){
    return this.http.post<any>("http://localhost:3000/rejectVerification",data);
  }

  approveClaim(data: any){
    return this.http.post<any>("http://localhost:3000/approveClaim",data);
  }

  

 

}
