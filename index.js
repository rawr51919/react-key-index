import Hashids from 'hashids';

export default function generateHashIds(array, label) {
	const hashids = new Hashids();
	const x = Number.parseInt(label, 10);

	return array.map((item, arrayIndex) => {
		const baseDigits = [9, 9, x, arrayIndex]; // ensures uniqueness per array item
		const newItem = (item !== null && typeof item === 'object') ? {...item} : {value: item};

		let keyIndex = 0;
		for (const key of (item !== null && typeof item === 'object' ? Object.keys(item) : ['value'])) {
			const cleanKey = key.replace(/^_+/, '').replace(/Id$/, '');
			const keyId = `_${cleanKey}Id`;
			newItem[keyId] = hashids.encode([...baseDigits, keyIndex]);
			keyIndex++;
		}

		return newItem;
	});
}
