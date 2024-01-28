import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  enteredValue: any;
  userDetail !: FormGroup;
  enteredClaimId: any;

  constructor(private fb:FormBuilder, private router: Router){
  }

  ngOnInit(){
    this.userDetail = this.fb.group({
      user_email: [''],
      user_password: [''],
    });
  }

  onSubmit(){
    console.log(this.userDetail.value);
    if(this.userDetail.value.user_email == "policyHolder@gmail.com"){
      if(this.userDetail.value.user_password == "123"){
        this.router.navigate(['/create']);
      } else {
        alert('Wrong Password');
      }
    } else if(this.userDetail.value.user_email == "insurer@gmail.com"){
      if(this.userDetail.value.user_password == "123"){
        this.router.navigate(['/insurer']);
      } else {
        alert('Wrong Password');
      }
    } else if(this.userDetail.value.user_email == "enterprise@gmail.com"){
      if(this.userDetail.value.user_password == "123"){
        this.router.navigate(['/enterprise']);
      } else {
        alert('Wrong Password');
      }
    }else if(this.userDetail.value.user_email == "govt@gmail.com"){
      if(this.userDetail.value.user_password == "123"){
        this.router.navigate(['/govtAgency']);
      } else {
        alert('Wrong Password');
      }
    }
     else{
      alert('Check Email');
    }
  }

}
