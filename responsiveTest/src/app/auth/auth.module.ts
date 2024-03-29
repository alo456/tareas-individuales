import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { SharedRoutingModule } from 'src/app/shared/shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import {MatCardModule, MatCard} from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDk07aGoXNk2JpxvarPSgN1hIGA5JwZpMU'
    })
  ],
  exports:[
    AuthRoutingModule
  ],
  providers: [],
  declarations: [HomeComponent, ServicesComponent, ContactComponent]
})
export class AuthModule { }
