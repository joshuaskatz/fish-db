import 'cross-fetch/polyfill';

import {
	getMyDates,
	createDate,
	updateDate,
	deleteDate
} from './utils/operations';
import prisma from '../src/prisma';
import seedDatabase, {
	userOne,
	userTwo,
	dateOne,
	dateTwo
} from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should fetch users dates', async () => {
	const client = getClient(userOne.jwt);

	const { data } = await client.query({
		query: getMyDates
	});

	expect(data.myDates[0].date).toBe('July 26th, 2020');
	expect(data.myDates[1].date).toBe('July 2nd, 2020');
});

test('Should create a new date', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		date: 'July 29th, 2020',
		amountCaught: '1',
		averageSize: '10',
		largestSize: '10',
		fish: [ 'Brook Trout' ],
		flies: [ 'Tan Caddis', 'Yellow Sally' ],
		river: 'Sunburst Falls',
		tackle: 'Moonshine Drifter 3 wt.'
	};

	const { data } = await client.mutate({
		mutation: createDate,
		variables
	});

	const dateExists = await prisma.exists.Dates({
		id: data.createDate.id
	});

	expect(dateExists).toBe(true);
});

test('Should not create date if not logged in', async () => {
	const variables = {
		date: 'June 20th, 2020',
		amountCaught: '2',
		averageSize: '12',
		largestSize: '13',
		fish: [ 'Brown Trout' ],
		flies: [ 'Tan Caddis', 'Yellow Sally' ],
		river: 'Sunburst Falls',
		tackle: 'Moonshine Drifter 3 wt.'
	};

	expect(
		client.mutate({
			mutation: createDate,
			variables
		})
	).rejects.toThrow();
});

test('Should delete own date', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		id: dateOne.date.id
	};

	await client.mutate({
		mutation: deleteDate,
		variables
	});

	const dateExists = await prisma.exists.Dates({
		id: dateOne.date.id
	});

	expect(dateExists).toBe(false);
});

test('Should not delete other users date', async () => {
	const client = getClient(userTwo.jwt);

	const variables = {
		id: dateTwo.date.id
	};

	expect(
		client.mutate({
			mutation: deleteDate,
			variables
		})
	).rejects.toThrow();
});

test('Should update own date', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		id: dateTwo.date.id,
		tackle: 'Redington Path 4 wt.'
	};

	await client.mutate({
		mutation: updateDate,
		variables
	});

	const dateExists = await prisma.exists.Dates({
		id: dateTwo.date.id,
		tackle: 'Redington Path 4 wt.'
	});

	expect(dateExists).toBe(true);
});

test('Should not update other users date', async () => {
	const client = getClient(userTwo.jwt);

	const variables = {
		id: dateTwo.date.id,
		tackle: 'Moonshine Drifter 3 wt.'
	};

	expect(
		client.mutate({
			mutation: updateDate,
			variables
		})
	).rejects.toThrow();
});
