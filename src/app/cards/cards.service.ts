import { Injectable } from '@angular/core';

import { getPrimeNumbersFromRange, shuffleArray } from './cards.utils';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Card {
	id: number;
	primeNumber: number;
	visible: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class CardsService {
	private shuffledPrimeNumbers;
	private maxPrimeNumbersRange = 50;
	readonly visibleCardsQty = 30;

	public cardList$: Observable<Card[]>;
	private _cardList: BehaviorSubject<Card[]>;

	constructor() {
		const primeNumbers = getPrimeNumbersFromRange(
			this.maxPrimeNumbersRange
		);
		let double = primeNumbers.concat(primeNumbers);
		this.shuffledPrimeNumbers = shuffleArray(double);

		this._cardList = <BehaviorSubject<Card[]>>new BehaviorSubject([]);
		this.cardList$ = this._cardList.asObservable();
	}

	getCards(): Observable<Card[]> {
		const cards = this.getCardsFromPrimeNumbers();
		this.setCards(cards);
		return this.cardList$;
	}

	hideAllCards() {
		const cards = this.getCurrentCards().map((cardItem) => {
			return {
				...cardItem,
				visible: false,
			};
		});
		this.setCards(cards);
	}

	toggleCardVisibility(cards: Card[], isVisible: boolean) {
		const cardsValues = [...this.getCurrentCards()];
		cards.forEach((card) => {
			const cardCandidateIndex = cardsValues.findIndex(
				(item) => item.id === card.id
			);
			cardsValues[cardCandidateIndex] = {
				...card,
				visible: isVisible,
			};
		});
		this.setCards(cardsValues);
	}

	private setCards(cards: Card[]) {
		this._cardList.next(cards);
	}

	private getCurrentCards(): Card[] {
		return this._cardList.getValue();
	}

	private getCardsFromPrimeNumbers(): Card[] {
		return Array.from({ length: this.visibleCardsQty }, (x, idx) =>
			this.cardFactory(idx, this.shuffledPrimeNumbers)
		);
	}

	private cardFactory(idx: number, primeNumbers: []): Card {
		return {
			id: idx,
			primeNumber: primeNumbers[idx],
			visible: true,
		};
	}
}
