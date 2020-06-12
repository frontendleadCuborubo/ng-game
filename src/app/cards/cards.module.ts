import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardFeatureComponent } from './container/card-feature.component';
import { CardComponent } from './component/card.component';

@NgModule({
	declarations: [CardFeatureComponent, CardComponent],
	imports: [CommonModule, BrowserAnimationsModule],
	exports: [CardFeatureComponent, CardComponent],
})
export class CardsModule {}
