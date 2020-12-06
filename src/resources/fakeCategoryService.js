import axios from 'axios';
export const categories = [
	{ _id: '5b21ca3eeb7f6fbccd471818', name: 'Sports' },
	{ _id: '5b21ca3eeb7f6fbccd471814', name: 'Arts' },
	{ _id: '5b21ca3eeb7f6fbccd471820', name: 'Fitness' },
];

export const getCategories = async () => {
	const result = await axios.get('http://localhost:8000/api/catagory');
	return result;
};
