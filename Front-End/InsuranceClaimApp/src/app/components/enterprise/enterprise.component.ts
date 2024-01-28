import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Services/all.service';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent {

  
  claimsData: any;
  form !: FormGroup;
  selectedClaim: any;
  selectedClaimId: any;
  claimId: any;
  previousClaims: any[] = [];

  constructor(
    private fb: FormBuilder,
    private allServ: AllService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      claimId: [''],
      value: [''],
      status: ['']
    });

    this.getAllClaims();
  }


  // ALL FROM REAL APIS
  getAllClaims(){
    this.allServ.getAllClaim().subscribe((res: any) => {
      console.log(res);
      this.previousClaims = res.data;
    })
  }


  openDialogue(data: any) {
    // Open the modal and set the form data
    this.selectedClaimId = data.claimId;
    this.form.setValue({
      claimId: data.claimId,
      value: data.value,
      status: data.status
    });
  }

  requestForVerification(claimId: any){
    const body = {
      "claimId" : claimId
    }
    this.allServ.requestForVerification(body).subscribe((res: any) => {
      alert(res.message);
    })
  }



}
