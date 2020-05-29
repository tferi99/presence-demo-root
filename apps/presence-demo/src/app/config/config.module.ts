import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config/config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigResolver } from './ConfigResolver';



@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigResolver
  ]
})
export class ConfigModule { }
