import {
	Component,
	Input,
	Output,
	HostListener,
	ChangeDetectionStrategy,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
	trigger,
	state,
	style,
	transition,
	animate,
} from '@angular/animations';
import { Card } from '../cards.service';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	animations: [
		trigger('fadeInOut', [
			state('true', style({ opacity: 1 })),
			state('false', style({ opacity: 0 })),
			transition('true => false', animate(100)),
			transition('false => true', animate(100)),
		]),
	],
	host: {
		class: 'card',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
	@HostListener('click', ['card'])
	handleClick(card: Card) {
		if (!card.visible) {
			this.cardClick.emit(card);
		}
	}

	get isVisible(): boolean {
		return this.card.visible;
	}

	@Input() card: Card;

	@Output() cardClick = new EventEmitter<any>();
}
