import 'cross-fetch/polyfill';

import { getFlies, createFly } from './utils/operations';
import prisma from '../src/prisma';
import seedDatabase, {
	userOne,
	userTwo,
	fishOne,
	fishTwo
} from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should fetch all flies', async () => {
	const { data } = await client.query({
		query: getFlies
	});

	expect(data.flies.length).toBe(2);
	expect(data.flies[0].name).toBe('Caddis');
	expect(data.flies[1].name).toBe('Wooly Bugger');
});

test('Should fetch flies by type query "string"', async () => {
	const variables = {
		query: 'Dry'
	};

	const { data } = await client.query({
		query: getFlies,
		variables
	});

	expect(data.flies.length).toBe(1);
	expect(data.flies[0].name).toBe('Caddis');
});

test('Should fetch flies by name query "string"', async () => {
	const variables = {
		query: 'Wooly'
	};

	const { data } = await client.query({
		query: getFlies,
		variables
	});

	expect(data.flies.length).toBe(1);
	expect(data.flies[0].name).toBe('Wooly Bugger');
});

test('Should fetch flies by color query "string"', async () => {
	const variables = {
		query: 'Tan'
	};

	const { data } = await client.query({
		query: getFlies,
		variables
	});

	expect(data.flies.length).toBe(1);
	expect(data.flies[0].name).toBe('Caddis');
});

test('Should create a fly', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		type: 'Nymph',
		name: 'Zebra Midge',
		color: 'Red'
	};

	const { data } = await client.mutate({
		mutation: createFly,
		variables
	});

	const flyExists = await prisma.exists.Fly({
		id: data.createFlies.id
	});

	expect(flyExists).toBe(true);
});

test('Should not create a fly if unauthorized', async () => {
	const variables = {
		type: 'Dry',
		name: 'Stimulator',
		color: 'Olive'
	};

	expect(
		client.mutate({
			mutation: createFly,
			variables
		})
	).rejects.toThrow();
});
