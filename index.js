import Hashids from "hashids";
export default (arr, label) => {
	let hashids = new Hashids();
	let x = parseInt(label);
	let digits = [9, 9, x];
	let obj = {};
	let result = arr.map(function(arr, index) {
		digits.push(index);
		obj = {
			value: arr,
			id: hashids.encode(digits)
		};
		digits = digits.slice(0, 5);
		return obj;
	});
	return result;
};
