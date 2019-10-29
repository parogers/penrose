import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PenroseComponent } from './penrose/penrose.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatSelectModule } from '@angular/material/select'; 

@NgModule({
    declarations: [
        AppComponent,
        PenroseComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSliderModule,
        MatCheckboxModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
