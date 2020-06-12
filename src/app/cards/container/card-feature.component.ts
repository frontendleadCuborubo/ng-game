import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardsService, Card } from '../cards.service';

const HIDE_TIME = 5000;
const TOOGLE_TIME = 400;
const MARTCHING_CARDS_QTY = 2;

@Component({
	selector: 'app-card-feature',
	templateUrl: './card-feature.component.html',
})
export class CardFeatureComponent implements OnInit, AfterViewInit, OnDestroy {
	private destroy$ = new Subject<void>();
	cards$: Observable<Card[]>;
	currentCard$ = new Subject();
	persistentVisibleCards = [];
	selectedCards = [];
	isReady = false;

	constructor(private cardsService: CardsService) {}

	ngOnInit() {
		this.cards$ = this.cardsService.getCards();

		setTimeout(() => {
			this.cardsService.hideAllCards();
			this.isReady = true;
		}, HIDE_TIME);
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
		return this.selectedCards.length === MARTCHING_CARDS_QTY;
	}

	doMatchingCards() {
		let card1 = this.selectedCards[0];
		let card2 = this.selectedCards[1];

		this.selectedCards = [];

		if (this.cardsIsEqual(card1.primeNumber, card2.primeNumber)) {
			this.addToPersistentVisibleCards([card1, card2]);
			this.toggleCards(card1, card2, true);
		} else {
			this.toggleCards(card1, card2, false);
		}
	}

	cardsIsEqual(card1Nmuber, card2Nmuber): boolean {
		return card1Nmuber === card2Nmuber;
	}

	toggleCards(card1, card2, isVisible) {
		setTimeout(() => {
			this.cardsService.toggleCardVisibility([card1, card2], isVisible);
		}, TOOGLE_TIME);
	}

	addToPersistentVisibleCards(cards) {
		cards.forEach((card) => this.persistentVisibleCards.push(card.id));
	}

	trackByIndex(index): number {
		return index;
	}

	getCardIsPersistentVisible(id): boolean {
		return this.persistentVisibleCards.indexOf(id) !== -1;
	}

	onCardClick(card) {
		if (this.isReady) {
			this.currentCard$.next(card);
		}
	}
}
