export const getPrimeNumbersFromRange = (num) => {
	const prime_coll1 = [];
	const prime_coll2 = [];

	for (var i = 0; i <= num; i++) {
		prime_coll2.push(true);
	}

	for (var i = 2; i <= num; i++) {
		if (prime_coll2[i]) {
			prime_coll1.push(i);
			for (let j = 1; i * j <= num; j++) {
				prime_coll2[i * j] = false;
			}
		}
	}

	return prime_coll1;
};

export const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
