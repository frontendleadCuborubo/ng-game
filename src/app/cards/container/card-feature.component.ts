import {
	Component,
	OnInit,
	AfterViewInit,
	OnDestroy,
	ElementRef,
	Renderer,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CardsService, Card } from '../cards.service';

@Component({
	selector: 'app-card-feature',
	templateUrl: './card-feature.component.html',
})
export class CardFeatureComponent implements OnInit, AfterViewInit, OnDestroy {
	private destroy$ = new Subject<void>();
	readonly hideCardsTime: number = 5000;
	readonly cardTogggleTime: number = 400;
	readonly matchihngCardsQty: number = 2;
	cards$: Observable<Card[]>;
	currentCard$ = new Subject();
	selectedCards = [];
	isReady = false;

	constructor(
		private renderer: Renderer,
		private element: ElementRef,
		private cardsService: CardsService
	) {}

	ngOnInit() {
		this.cards$ = this.cardsService.getCards();

		setTimeout(() => {
			this.cardsService.hideAllCards();
			this.isReady = true;
		}, this.hideCardsTime);
	}

	ngAfterViewInit() {
		this.currentCard$
			.pipe(takeUntil(this.destroy$))
			.subscribe((card: Card) => {
				this.cardsService.toggleCardVisibility([card], true);
				this.selectedCards.push(card);

				if (this.canMatchingCards()) {
					this.doMatchingCards();
				}
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	canMatchingCards(): boolean {
		return this.selectedCards.length === this.matchihngCardsQty;
	}

	doMatchingCards() {
		const [card1, card2] = this.selectedCards;

		this.selectedCards = [];

		if (this.cardsIsEqual(card1.primeNumber, card2.primeNumber)) {
			this.addVisibilityClass([card1, card2]);
		} else {
			this.toggleCards(card1, card2, false);
		}
	}

	cardsIsEqual(card1Nmuber: number, card2Nmuber: number): boolean {
		return card1Nmuber === card2Nmuber;
	}

	toggleCards(card1: Card, card2: Card, isVisible: boolean) {
		setTimeout(() => {
			this.cardsService.toggleCardVisibility([card1, card2], isVisible);
		}, this.cardTogggleTime);
	}

	addVisibilityClass(cards: Card[]) {
		cards.forEach((card) => {
			let cardElem = this.element.nativeElement.querySelector(
				'#card-' + card.id
			);

			this.renderer.setElementClass(cardElem, 'visible', true);
		});
	}

	trackByIndex(index): number {
		return index;
	}

	onCardClick(card: Card) {
		if (this.isReady) {
			this.currentCard$.next(card);
		}
	}
}
