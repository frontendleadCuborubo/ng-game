import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { CardsModule } from './cards/cards.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, CommonModule, CardsModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
