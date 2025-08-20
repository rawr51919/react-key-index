import Hashids from 'hashids';

export default function generateHashIds(array, label) {
	const hashids = new Hashids();
	const x = Number.parseInt(label, 10);

	return array.map((item, arrayIndex) => {
		const baseDigits = [9, 9, x, arrayIndex]; // Ensures uniqueness per array item
		let newItem;

		if (item !== null && typeof item === 'object') {
			newItem = {...item};
			let keyIndex = 0;
			for (const key of Object.keys(item)) {
				const cleanKey = key.replace(/^_+/, '').replace(/Id$/, '');
				const keyId = `_${cleanKey}Id`;
				newItem[keyId] = hashids.encode([...baseDigits, keyIndex]);
				keyIndex++;
			}
		} else {
			// Treat primitives as a single-key object with index-based key to avoid collisions
			newItem = {[`_item${arrayIndex}Id`]: hashids.encode([...baseDigits]), value: item};
		}

		return newItem;
	});
}
