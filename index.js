import Hashids from 'hashids';

const generateHashIds = (array, label) => {
	const hashids = new Hashids();
	const x = Number.parseInt(label, 10);
	const digits = [9, 9, x];
	let object = {};
	const result = array.map((arrayItem, index) => {
		digits.push(index);
		if (typeof arrayItem === 'object') {
			let i = 0;

			for (const key of Object.keys(arrayItem)) {
				let keyId = '';
				digits.push(i);
				keyId = `_${key}Id`;
				arrayItem[keyId] = hashids.encode(digits);
				digits.splice(6); // Keep first 6
				i++;
			}

			return arrayItem;
		}

		object = {
			value: arrayItem,
			id: hashids.encode(digits),
		};
		digits.splice(5); // Keep first 5
		return object;
	});
	return result;
};

export default generateHashIds;
