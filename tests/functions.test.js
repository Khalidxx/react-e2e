const functions = require("../functions");
const { default: axios } = require("axios");

const initDatabase = () => console.log("Database Initialized");
const closeDatabase = () => console.log("Database closed");

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

test("Multiply with PI", () => {
	expect(functions.multiplyPI(10.0)).toBe(10.0 * 3.1415);
});

test("Multiply with not PI", () => {
	expect(functions.multiplyPI(10.0)).not.toBe(10.0 * (1 + 3.1415));
});

// toEqual instead of ToBe because of object pointer matching
test("User should be Snow", () => {
	expect(functions.createUser()).toEqual({
		firstName: "Jon",
		lastName: "Snow",
	});
});

test("Array must contain", () => {
	const peopleList = ["Jon", "Robb", "Arya"];

	expect(peopleList).toContain("Arya");
});

test("Fetch response has user", () => {
	// expect.assertions(1);
	return functions.fetchUser(1).then((data) => {
		expect(data.name).toBe("Leanne Graham");
	});
});

describe("Fetching the right user", () => {
	let user;
	beforeEach(
		() =>
			axios.patch("https://jsonplaceholder.typicode.com/users/2", {
				data: {
					name: "Ervin Howell",
					username: "Antonette",
				},
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
		.then((response) => response.data)
		.then((json) => {
			user = json
			console.log(json)
		})
	);

	test("Fetch response is user Ervin", () => {
		return functions.fetchUser(2).then((data) => {
			expect(data.name).toBe(user.name);
		});
	});
});
