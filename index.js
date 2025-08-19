import Hashids from 'hashids';

const generateHashIds = (array, label) => {
	const hashids = new Hashids();
	const x = Number.parseInt(label, 10);
	const digits = [9, 9, x];
	const result = array.map((arrayItem) => {
		if (typeof arrayItem === 'object') {
			let i = 0;
			for (const key of Object.keys(arrayItem)) {
				digits.push(i);

				// sanitize key: remove leading _ and trailing Id
				const cleanKey = key.replace(/^_+/, '').replace(/Id$/, '');

				// first key: just `${key}Id`, rest: `_${key}Id`
				const keyId = i === 0 ? `${cleanKey}Id` : `_${cleanKey}Id`;

				arrayItem[keyId] = hashids.encode(digits);
				digits.splice(6); // Keep first 6
				i++;
			}
			return arrayItem;
		} else {
			// primitive values
			const object = {
				value: arrayItem,
				id: hashids.encode(digits),
			};
			digits.splice(5); // Keep first 5
			return object;
		}
	});
	return result;
};

export default generateHashIds;
