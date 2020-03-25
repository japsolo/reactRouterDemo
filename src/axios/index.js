import axios from 'axios';

class Axios {
	constructor() {
		this.axios = axios.create({
			baseURL: 'http://localhost:3001',
		})
	}

	sendData = (data) => (
		this.axios.post('/', data)
	);
}

export default Axios;