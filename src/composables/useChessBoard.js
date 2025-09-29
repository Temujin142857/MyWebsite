import { ref } from "vue";
import axios from "axios";
const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;

export function useChessBoard() {
	async function startNewGame(callback) {
		const endpoint = apiEndpoint + "startGame";
		console.log("sedning request to:", endpoint);
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback("success");
	}

	async function makeSelection(row, column, callback, gameVSEngine) {
		try {
			const endpoint = apiEndpoint + "handleSelection";
			console.log(
				"coordinates:",
				transformSingleCoordinateFromClientToAPI([row, column]),
			);
			const response = await axios.post(endpoint, {
				coordinates: transformSingleCoordinateFromClientToAPI([
					row,
					column,
				]),
			});
			console.log("Server response:", response.data);
			if (response.data.highlight) {
				let coordinates = [
					Number(response.data.highlight[0]),
					Number(response.data.highlight[2]),
				];
				callback(
					"highlight square",
					transformSingleCoordinateFromAPIToClient(coordinates),
				);
			} else if (response.data.board) {
				callback(
					"update board",
					transformBoardFromAPIToClient(response.data.board),
				);
				if (gameVSEngine) {
					getEngineMove(callback);
				}
			} else if (response.data.result === "illegal move") {
				callback("reset highlight");
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
		const endpoint = apiEndpoint + "getEngineMove";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback("update board", transformBoardFromAPIToClient(response.data.board));
	}

	async function resetBoard(callback) {
		const endpoint = apiEndpoint + "resetBoard";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback();
	}

	async function killEngine(callback) {
		const endpoint = apiEndpoint + "killEngine";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
		callback();
	}

	/**
	 * It's more natural to generate the board row by row from top to bottom in html
	 * so I'll use this to translate from the coordinate system here to the api's system
	 */
	function transformBoardFromClientToAPI(board, isWhiteTop = false) {
		let newBoard = [[], [], [], [], [], [], [], []];
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (isWhiteTop) {
					newBoard[j][i] = board[i][j];
				} else {
					newBoard[7 - j][i] = board[i][j];
				}
			}
		}
		return newBoard;
	}

	function transformBoardFromAPIToClient(board, isWhiteTop = false) {
		let newBoard = [[], [], [], [], [], [], [], []];
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[i].length; j++) {
				if (isWhiteTop) {
					newBoard[j][i] = board[i][j];
				} else {
					newBoard[7 - j][i] = board[i][j];
				}
			}
		}
		return newBoard;
	}

	function transformSingleCoordinateFromClientToAPI(
		coordinates,
		isWhiteTop = false,
	) {
		let newCoordinates = [];
		if (isWhiteTop) {
			newCoordinates[0] = coordinates[1];
			newCoordinates[1] = coordinates[0];
		} else {
			newCoordinates[0] = coordinates[1];
			newCoordinates[1] = 7 - coordinates[0];
		}
		return newCoordinates;
	}

	function transformSingleCoordinateFromAPIToClient(
		coordinates,
		isWhiteTop = false,
	) {
		let newCoordinates = [];
		if (isWhiteTop) {
			newCoordinates[0] = coordinates[1];
			newCoordinates[1] = coordinates[0];
		} else {
			newCoordinates[0] = 7 - coordinates[1];
			newCoordinates[1] = coordinates[0];
		}
		return newCoordinates;
	}

	return {
		startNewGame,
		makeSelection,
		getEngineMove,
		resetBoard,
		killEngine,
	};
}
