import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  claims: any[] = [];

  setClaim(data: any){
    this.claims.push(data);
    console.log("From Serive", data);
  }

  getClaim(){
    console.log(this.claims);
    return this.claims;
  }

  updateClaim(updatedClaim: any) {
    const index = this.claims.findIndex(claim => claim.ClaimId === updatedClaim.ClaimId);

    if (index !== -1) {
      this.claims[index] = updatedClaim;
      console.log("Claim updated:", updatedClaim);
    } else {
      console.error("Claim not found for updating:", updatedClaim);
    }
  }
  
}
