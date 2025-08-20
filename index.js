import Hashids from 'hashids';

export default function generateHashIds(array, label) {
	const hashids = new Hashids();
	const x = Number.parseInt(label, 10);

	return array.map((item, arrayIndex) => {
		const baseDigits = [9, 9, x, arrayIndex]; // Ensures uniqueness per array item

		if (item !== null && typeof item === 'object') {
			const newItem = {...item}; // Clone to avoid mutating original
			let keyIndex = 0;
			for (const key of Object.keys(item)) {
				const cleanKey = key.replace(/^_+/, '').replace(/Id$/, '');
				const keyId = `_${cleanKey}Id`;
				newItem[keyId] = hashids.encode([...baseDigits, keyIndex]);
				keyIndex++;
			}

			return newItem;
		}

		// Primitive values
		return {
			value: item,
			id: hashids.encode([...baseDigits]),
		};
	});
}
