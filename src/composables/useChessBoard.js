import { ref } from "vue";

export function useChessBoard() {
	function startNewGame() {}
	async function makeSelection(row, column, callback) {
		try {
			const response = await axios.post("http://localhost:3000/", {
				coordinates: [row, column],
			});
			console.log("Server response:", response.data);
			callback();
		} catch (error) {
			console.error(
				"Error setting up game:",
				error.response?.data || error.message,
			);
			alert("Failed to setup game.");
		}
	}

	return {
		startNewGame,
		makeSelection,
	};
}
