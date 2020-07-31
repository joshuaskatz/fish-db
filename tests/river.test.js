import 'cross-fetch/polyfill';

import { getRiver, createRiver } from './utils/operations';
import prisma from '../src/prisma';
import seedDatabase, {
	userOne,
	userTwo,
	riverOne,
	riverTwo
} from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should fetch all rivers', async () => {
	const { data } = await client.query({
		query: getRiver
	});

	expect(data.rivers.length).toBe(2);
});

test('Should fetch river by query "string"', async () => {
	const variables = {
		query: 'North'
	};

	const { data } = await client.query({
		query: getRiver,
		variables
	});

	expect(data.rivers.length).toBe(1);
	expect(data.rivers[0].name).toBe('North Mills');
});

test('Should create a river', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		latitude: 33.0,
		longitude: -83.0,
		name: 'Yellowstone Prong',
		overgrown: 'Slightly Overgrown',
		size: 'Small Stream',
		regulation: 'Catch and Release'
	};

	const { data } = await client.mutate({
		mutation: createRiver,
		variables
	});

	const riverExists = await prisma.exists.River({
		id: data.createRiver.id
	});

	expect(riverExists).toBe(true);
});

test('Should not create river if not authorized', () => {
	const variables = {
		latitude: 31.0,
		longitude: -83.0,
		name: 'Middle Prong',
		overgrown: 'Slightly Overgrown',
		size: 'Small Stream',
		regulation: 'Catch and Release'
	};

	expect(
		client.mutate({
			mutation: createRiver,
			variables
		})
	).rejects.toThrow();
});
