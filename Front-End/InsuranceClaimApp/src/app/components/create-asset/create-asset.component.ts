import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Services/all.service';
import { DataSharingService } from 'src/app/Services/data-sharing.service';

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent {
  form!: FormGroup;
  allClaims: any; 
  claimId: any;
  enteredClaimId: any;

  previousClaims: any;

  readClaimData: any[] = [];

  constructor(private fb: FormBuilder, private allServ: AllService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      claimId: [''],
      value: ['']
    });
  }

  onSubmit() {
    const formData = this.form.value;
    formData.status = "Pending";
    formData.isApproved = "False";

    localStorage.setItem("claim", JSON.stringify(formData));


    this.allServ.createClaim(this.form.value).subscribe((res: any) => {
      alert(res.message);
    })
  }

  getAllClaims(){
    this.allServ.getAllClaim().subscribe((res: any) => {
      console.log(res);
      this.previousClaims = res.data;
    })
  }

  readClaim(claimId: any){
    console.log(claimId,"----------->");

    this.allServ.readClaim(claimId).subscribe((res: any) => {
      this.readClaimData.push(res);
      console.log(res);
    })

  }


  logOut(){
    alert("Log Out Successfull");
    this.router.navigate(['/login'])
  }

}
