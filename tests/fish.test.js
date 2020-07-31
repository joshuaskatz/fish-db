import 'cross-fetch/polyfill';

import { getFish, createFish } from './utils/operations';
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

test('Should fetch all fish', async () => {
	const { data } = await client.query({
		query: getFish
	});

	expect(data.fish.length).toBe(2);
	expect(data.fish[0].species).toBe('Rainbow Trout');
	expect(data.fish[1].species).toBe('Brook Trout');
});

test('Should fetch fish by subspecies query "string"', async () => {
	const variables = {
		query: 'Palimino'
	};

	const { data } = await client.query({
		query: getFish,
		variables
	});

	expect(data.fish.length).toBe(1);
	expect(data.fish[0].species).toBe('Rainbow Trout');
});

test('Should fetch fish by species query "string"', async () => {
	const variables = {
		query: 'Brook'
	};

	const { data } = await client.query({
		query: getFish,
		variables
	});

	expect(data.fish.length).toBe(1);
	expect(data.fish[0].species).toBe('Brook Trout');
});

test('Should create a fish with species and subspecies', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		species: 'Brook Trout',
		subspecies: 'Aurora Trout'
	};

	const { data } = await client.mutate({
		mutation: createFish,
		variables
	});

	const fishExists = await prisma.exists.Fish({
		id: data.createFish.id
	});

	expect(fishExists).toBe(true);
});

test('Should create a fish with only species', async () => {
	const client = getClient(userTwo.jwt);

	const variables = {
		species: 'Brown Trout'
	};

	const { data } = await client.mutate({
		mutation: createFish,
		variables
	});

	const fishExists = await prisma.exists.Fish({
		id: data.createFish.id
	});

	expect(fishExists).toBe(true);
});

test('Should not create a fish if unauthorized', async () => {
	const variables = {
		species: 'Cutthroat Trout',
		subspecies: 'Yellowstone Cutthroat trout'
	};

	expect(
		client.mutate({
			mutation: createFish,
			variables
		})
	).rejects.toThrow();
});
