import { ref } from "vue";

export function useChessBoard() {
	async function startNewGame(callback) {
		const endpoint = process.env.API_ENDPOINT + "startGame";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback();
	}

	async function makeSelection(row, column, callback) {
		try {
			const endpoint = process.env.API_ENDPOINT + "handleSelection";
			const response = await axios.post(endpoint, {
				coordinates: [row, column],
			});
			console.log("Server response:", response.data);
			callback(respnce.data);
		} catch (error) {
			console.error(
				"Error setting up game:",
				error.response?.data || error.message,
			);
			alert("Failed to setup game.");
		}
	}

	async function getEngineMove(callback) {
		const endpoint = process.env.API_ENDPOINT + "getEngineMove";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback();
	}

	async function resetBoard(callback) {
		const endpoint = process.env.API_ENDPOINT + "resetBoard";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback();
	}

	async function killEngine(callback) {
		const endpoint = process.env.API_ENDPOINT + "killEngine";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback();
	}

	return {
		startNewGame,
		makeSelection,
		getEngineMove,
		resetBoard,
		killEngine,
	};
}
