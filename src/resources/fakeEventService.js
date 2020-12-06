import * as categoriesAPI from './fakeCategoryService';

const events = [
	{
		_id: '5b21ca3eeb7f6fbccd471815',
		title: 'Hybrid Kids Zumba',
		category: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Fitness' },
		numberOfTicketsAvailable: 6,
		Price: 10,
	},
	{
		_id: '5b21ca3eeb7f6fbccd471816',
		title: 'Virtual Kids Zumba',
		category: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Fitness' },
		numberOfTicketsAvailable: 10,
		Price: 20,
	},
	{
		_id: '5b21ca3eeb7f6fbccd471817',
		title: 'Virtual Exploring Great Artists',
		category: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Arts' },
		numberOfTicketsAvailable: 10,
		Price: 20,
	},
	{
		_id: '5b21ca3eeb7f6fbccd471818',
		title: 'Oil Painting',
		category: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Arts' },
		numberOfTicketsAvailable: 10,
		Price: 20,
	},
	{
		_id: '5b21ca3eeb7f6fbccd471819',
		title: 'Crafts',
		category: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Arts' },
		numberOfTicketsAvailable: 10,
		Price: 20,
	},
	{
		_id: '5b21ca3eeb7f6fbccd47181b',
		title: 'Soccer Camp',
		category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Sports' },
		numberOfTicketsAvailable: 11,
		Price: 20,
	},
	{
		_id: '5b21ca3eeb7f6fbccd47181e',
		title: 'Tennis',
		category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Sports' },
		numberOfTicketsAvailable: 15,
		Price: 200,
	},
	{
		_id: '5b21ca3eeb7f6fbccd47181f',
		title: 'Baseball',
		category: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Sports' },
		numberOfTicketsAvailable: 5,
		Price: 400,
	},
	{
		_id: '5b21ca3eeb7f6fbccd471821',
		title: 'Yoga',
		category: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Fitness' },
		numberOfTicketsAvailable: 20,
		Price: 80,
	},
];

export function getEvents() {
	return events;
}

export function getEvent(id) {
	return events.find((m) => m._id === id);
}

export function saveEvent(event) {
	let eventInDb = events.find((m) => m._id === event._id) || {};
	eventInDb.name = event.name;
	eventInDb.category = categoriesAPI.categories.find(
		(g) => g._id === event.categoryId,
	);
	eventInDb.numberInStock = event.numberInStock;
	eventInDb.dailyRentalRate = event.dailyRentalRate;

	if (!eventInDb._id) {
		eventInDb._id = Date.now();
		events.push(eventInDb);
	}

	return eventInDb;
}

export function deleteEvent(id) {
	let eventInDb = events.find((m) => m._id === id);
	events.splice(events.indexOf(eventInDb), 1);
	return eventInDb;
}
