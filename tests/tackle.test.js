import 'cross-fetch/polyfill';

import {
	getMyTackle,
	createTackle,
	updateTackle,
	deleteTackle
} from './utils/operations';
import prisma from '../src/prisma';
import seedDatabase, {
	userOne,
	userTwo,
	tackleOne,
	tackleTwo
} from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should fetch users tackle', async () => {
	const client = getClient(userOne.jwt);

	const { data } = await client.query({
		query: getMyTackle
	});

	expect(data.myTackle[0].rod).toBe('Redington Path');
});

test('Should create a new tackle', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		rod: 'Redington Path',
		rodWeight: 4,
		rodLengthFeet: 9,
		rodLengthInches: 0,
		overcharged: 'No',
		leaderLengthFeet: 9,
		leaderLengthInches: 0,
		tippetSize: 6
	};

	const { data } = await client.mutate({
		mutation: createTackle,
		variables
	});

	const tackleExists = await prisma.exists.Tackle({
		id: data.createTackle.id
	});

	expect(tackleExists).toBe(true);
});

test('Should not create a new tackle if not authorized', async () => {
	const variables = {
		rod: 'Orvis Clearwater',
		rodWeight: 5,
		rodLengthFeet: 8,
		rodLengthInches: 6,
		overcharged: 'No',
		leaderLengthFeet: 9,
		leaderLengthInches: 0,
		tippetSize: 7
	};

	expect(
		client.mutate({
			mutation: createTackle,
			variables
		})
	).rejects.toThrow();
});

test('Should update users tackle', async () => {
	const client = getClient(userTwo.jwt);

	const variables = {
		id: tackleOne.tackle.id,
		rod: 'Orvis Clearwater'
	};

	await client.mutate({
		mutation: updateTackle,
		variables
	});

	const tackleExists = await prisma.exists.Tackle({
		id: tackleOne.tackle.id,
		rod: 'Orvis Clearwater'
	});

	expect(tackleExists).toBe(true);
});

test('Should not update other users tackle', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		id: tackleOne.tackle.id,
		rod: 'Orvis Clearwater'
	};

	expect(
		client.mutate({
			mutation: updateTackle,
			variables
		})
	).rejects.toThrow();
});

test('Should delete users tackle', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		id: tackleTwo.tackle.id
	};

	await client.mutate({
		mutation: deleteTackle,
		variables
	});

	const tackleExists = await prisma.exists.Tackle({
		id: tackleTwo.tackle.id
	});

	expect(tackleExists).toBe(false);
});

test('Should not delete other users tackle', async () => {
	const client = getClient(userOne.jwt);

	const variables = {
		id: tackleOne.tackle.id
	};

	expect(
		client.mutate({
			mutation: deleteTackle,
			variables
		})
	).rejects.toThrow();
});
