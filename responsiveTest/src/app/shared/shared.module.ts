import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { AuthModule } from 'src/app/auth/auth.module'
import { HttpClientModule }    from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    MainNavComponent, FooterComponent
  ],
  declarations: [MainNavComponent, FooterComponent]
})
export class SharedModule { }
