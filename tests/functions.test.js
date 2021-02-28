const functions = require("../functions");

test("Multiply with PI", () => { 
	expect(functions.multiplyPI(10.0)).toBe(10.0 * 3.1415);
})