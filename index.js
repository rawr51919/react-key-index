import Hashids from 'hashids';

export function generateHashIds(array, label) {
  const hashids = new Hashids();
  const x = Number.parseInt(label, 10);

  return array.map((item, arrayIndex) => {
    const baseDigits = [9, 9, x, arrayIndex]; // ensures uniqueness per array item

    if (item !== null && typeof item === 'object') {
      const newItem = { ...item }; // clone to avoid mutating original
      Object.keys(item).forEach((key, keyIndex) => {
        const cleanKey = key.replace(/^_+/, '').replace(/Id$/, '');
        const keyId = `_${cleanKey}Id`;
        newItem[keyId] = hashids.encode([...baseDigits, keyIndex]);
      });
      return newItem;
    } else {
      return {
        value: item,
        id: hashids.encode([...baseDigits]),
      };
    }
  });
}
