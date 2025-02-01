import { ref } from "vue";

export function useChessBoard() {
	function startNewGame() {}
	function makeSelection(row, column, callback) {}

	return {
		startNewGame,
		makeSelection,
	};
}
