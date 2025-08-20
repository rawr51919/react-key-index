import Hashids from 'hashids';

export default function generateHashIds(array, label) {
	const hashids = new Hashids();
	const x = Number.parseInt(label, 10);
	let globalCounter = 0; // Ensures absolute uniqueness

	return array.map((item, arrayIndex) => {
		const baseDigits = [9, 9, x, arrayIndex]; // Per-item uniqueness
		let newItem;

		if (item !== null && typeof item === 'object') {
			newItem = {...item};
			let keyIndex = 0;
			for (const key of Object.keys(item)) {
				const cleanKey = key.replace(/^_+/, '').replace(/Id$/, '');
				const keyId = `_${cleanKey}Id`;
				// Include global counter for guaranteed uniqueness
				newItem[keyId] = hashids.encode([...baseDigits, keyIndex, globalCounter]);
				keyIndex++;
				globalCounter++;
			}
		} else {
			// Primitive: include global counter for guaranteed uniqueness
			newItem = {
				[`_item${arrayIndex}Id`]: hashids.encode([...baseDigits, globalCounter]),
				value: item,
			};
			globalCounter++;
		}

		return newItem;
	});
}
