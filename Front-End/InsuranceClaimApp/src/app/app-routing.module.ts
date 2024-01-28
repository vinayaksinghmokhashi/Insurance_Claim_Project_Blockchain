import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetComponent } from './components/create-asset/create-asset.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { GovtAgencyComponent } from './components/govt-agency/govt-agency.component';
import { InsurerComponent } from './components/insurer/insurer.component';
import { MainComponent } from './components/login/main.component';

const routes: Routes = [
  {
    path: 'login', component: MainComponent
  },
  {
    path: '', component: MainComponent
  },
  {
    path: 'create', component: CreateAssetComponent
  },
  {
    path: 'insurer', component: InsurerComponent
  },
  {
    path: 'enterprise', component: EnterpriseComponent
  },
  {
    path: 'govtAgency', component: GovtAgencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
