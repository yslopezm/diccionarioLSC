import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from "../material/material.module"
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ], 
  exports:[
    HeaderComponent, 
    FooterComponent,
    ContentComponent
  ]
})
export class WebsiteModule { }
