import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { SharedRoutingModule } from 'src/app/shared/shared-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedRoutingModule
  ],
  exports:[
    AuthRoutingModule
  ],
  declarations: [HomeComponent, ServicesComponent, ContactComponent]
})
export class AuthModule { }
