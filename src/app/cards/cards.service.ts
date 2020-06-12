import { Injectable } from '@angular/core';

import { getPrimeNumbersFromRange, shuffleArray } from './cards.utils';

export interface Card {
	primeNumber: number;
	visible: boolean;
}

const cardFactory = (idx: number, primeNumbers: []): Card => {
	return {
		primeNumber: primeNumbers[idx],
		visible: true,
	};
};

@Injectable({
	providedIn: 'root',
})
export class CardsService {
	private shuffledPrimeNumbers;
	private maxPrimeNumbersRange = 50;
	readonly visibleCardsQty = 30;

	constructor() {
		const primeNumbers = getPrimeNumbersFromRange(
			this.maxPrimeNumbersRange
		);
		let double = primeNumbers.concat(primeNumbers);
		this.shuffledPrimeNumbers = shuffleArray(double);
	}

	getCards(): Card[] {
		return this.getCardsFromPrimeNumbers();
	}

	private getCardsFromPrimeNumbers(): Card[] {
		return Array.from({ length: this.visibleCardsQty }, (x, i) =>
			cardFactory(i, this.shuffledPrimeNumbers)
		);
	}
}
