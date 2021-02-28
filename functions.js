const { default: axios } = require("axios");

const functions = {
	multiplyPI: num => {
		return num * 3.1415;
	},
    createUser: () => {
        const user = {
            firstName: "Jon",
            lastName: "Snow"
        }
        return user;
    },
    fetchUser: id => {
        return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.data)
        .catch(err => err);
    }
}

module.exports = functions;
