import { ref } from "vue";
import axios from "axios";
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export function useChessBoard() {
	async function startNewGame(callback) {
		const endpoint = "//localhost:10000/" + "startGame";
		console.log("sedning request to:", endpoint);
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback("success");
	}

	async function makeSelection(row, column, callback) {
		try {
			const endpoint =
				import.meta.env.VITE_APP_API_ENDPOINT + "handleSelection";
			console.log("sedoning to:", endpoint);
			const response = await axios.post(endpoint, {
				coordinates: [row, column],
			});
			console.log("Server response:", response.data);
			if (response.data.highlight) {
				callback(true, respnce.data.highlight);
			} else if (responce.data.board) {
				callback(false, respnce.data.board);
			}
		} catch (error) {
			console.error(
				"Error making selection:",
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
