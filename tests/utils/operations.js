import { gql } from 'apollo-boost';

const createUser = gql`
	mutation($data: CreateUserInput!) {
		createUser(data: $data) {
			token
			user {
				id
				name
				email
			}
		}
	}
`;

const getUsers = gql`
	query {
		users {
			id
			name
			email
		}
	}
`;

const getProfile = gql`
	query {
		me {
			id
			name
			email
		}
	}
`;

const login = gql`
	mutation($data: LoginUserInput!) {
		login(data: $data) {
			token
		}
	}
`;

export const getMyDates = gql`
	query GetMyDates($query: String) {
		myDates(query: $query) {
			id
			date
			amountCaught
			averageSize
			largestSize
			fish
			flies
			tackle
			river
		}
	}
`;

export const getFish = gql`
	query GetFish($query: String) {
		fish(query: $query) {
			id
			species
			subspecies
		}
	}
`;

export const getFlies = gql`
	query GetFlies($query: String) {
		flies(query: $query) {
			id
			type
			name
			color
		}
	}
`;

export const getRiver = gql`
	query GetRiver($query: String) {
		rivers(query: $query) {
			id
			name
			latitude
			longitude
			regulation
			overgrown
			size
		}
	}
`;

export const getMyTackle = gql`
	query GetMyTackle {
		myTackle {
			id
			rod
			rodWeight
			rodLengthFeet
			rodLengthInches
			overcharged
			leaderLengthFeet
			leaderLengthInches
			tippetSize
		}
	}
`;

export const createDate = gql`
	mutation CreateDate(
		$date: String!
		$amountCaught: String!
		$averageSize: String
		$largestSize: String
		$fish: [String]
		$flies: [String!]!
		$river: String!
		$tackle: String!
	) {
		createDate(
			data: {
				date: $date
				amountCaught: $amountCaught
				averageSize: $averageSize
				largestSize: $largestSize
				fish: $fish
				flies: $flies
				river: $river
				tackle: $tackle
			}
		) {
			id
			date
			amountCaught
			averageSize
			largestSize
			fish
			flies
			tackle
			river
		}
	}
`;

export const createFish = gql`
	mutation CreateFish($species: String!, $subspecies: String) {
		createFish(data: { species: $species, subspecies: $subspecies }) {
			id
			species
			subspecies
		}
	}
`;

export const createFly = gql`
	mutation CreateFly($type: String!, $name: String!, $color: String!) {
		createFlies(data: { type: $type, name: $name, color: $color }) {
			id
			type
			name
			color
		}
	}
`;

export const createRiver = gql`
	mutation CreateRiver(
		$latitude: Float!
		$longitude: Float!
		$name: String!
		$overgrown: String
		$size: String
		$regulation: String!
	) {
		createRiver(
			data: {
				latitude: $latitude
				longitude: $longitude
				name: $name
				overgrown: $overgrown
				size: $size
				regulation: $regulation
			}
		) {
			id
			name
			latitude
			longitude
			regulation
			overgrown
			size
		}
	}
`;

export const createTackle = gql`
	mutation CreateTackle(
		$rod: String!
		$rodWeight: Int!
		$rodLengthFeet: Int!
		$rodLengthInches: Int!
		$overcharged: String!
		$leaderLengthFeet: Int!
		$leaderLengthInches: Int!
		$tippetSize: Int!
	) {
		createTackle(
			data: {
				rod: $rod
				rodWeight: $rodWeight
				rodLengthFeet: $rodLengthFeet
				rodLengthInches: $rodLengthInches
				overcharged: $overcharged
				leaderLengthFeet: $leaderLengthFeet
				leaderLengthInches: $leaderLengthInches
				tippetSize: $tippetSize
			}
		) {
			id
			rod
			rodWeight
			rodLengthFeet
			rodLengthInches
			overcharged
			leaderLengthFeet
			leaderLengthInches
			tippetSize
		}
	}
`;

export const deleteDate = gql`
	mutation DeleteDate($id: ID!) {
		deleteDate(id: $id) {
			id
		}
	}
`;

export const deleteTackle = gql`
	mutation DeleteTackle($id: ID!) {
		deleteTackle(id: $id) {
			id
		}
	}
`;

export const updateDate = gql`
	mutation UpdateDate(
		$id: ID!
		$date: String
		$amountCaught: String
		$averageSize: String
		$largestSize: String
		$fish: [String]
		$flies: [String]
		$river: String
		$tackle: String
	) {
		updateDate(
			id: $id
			data: {
				date: $date
				amountCaught: $amountCaught
				averageSize: $averageSize
				largestSize: $largestSize
				fish: $fish
				flies: $flies
				river: $river
				tackle: $tackle
			}
		) {
			id
			date
			amountCaught
			averageSize
			largestSize
			fish
			flies
			tackle
			river
		}
	}
`;

export const updateTackle = gql`
	mutation UpdateTackle(
		$rod: String
		$rodWeight: Int
		$rodLengthFeet: Int
		$rodLengthInches: Int
		$overcharged: String
		$leaderLengthFeet: Int
		$leaderLengthInches: Int
		$tippetSize: Int
		$id: ID!
	) {
		updateTackle(
			id: $id
			data: {
				rod: $rod
				rodWeight: $rodWeight
				rodLengthFeet: $rodLengthFeet
				rodLengthInches: $rodLengthInches
				overcharged: $overcharged
				leaderLengthFeet: $leaderLengthFeet
				leaderLengthInches: $leaderLengthInches
				tippetSize: $tippetSize
			}
		) {
			id
			rod
			rodWeight
			rodLengthFeet
			rodLengthInches
			overcharged
			leaderLengthFeet
			leaderLengthInches
			tippetSize
		}
	}
`;

export { createUser, getUsers, getProfile, login };
