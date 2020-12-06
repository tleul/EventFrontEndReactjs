export const namefix = (name) => {
	let temp = '';
	const n = name.split('_');
	n.forEach((item) =>
		item !== 'number' ? (temp += ' ' + item.toUpperCase()) : '',
	);
	return temp;
};
export const typefix = (type) => {
	let temp = '';
	const n = type.split('_');
	n.forEach((item) => (item === 'number' ? (temp = item) : ''));
	return temp;
};
