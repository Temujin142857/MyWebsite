<template>
	<div class="chessboard">
		<div v-for="(row, rowIndex) in pieces" :key="rowIndex" class="chess-row">
			<div v-for="(piece, colIndex) in row" :key="colIndex"
				:class="['chess-square', getSquareColor(rowIndex, colIndex)]"
				@onClick="makeSelection(rowIndex, colIndex)">
				<img v-if="piece" :src="`/assets/${piece}.png`" class="piece" :alt=piece />
			</div>
		</div>
	</div>
</template>

<script setup>

import { ref, onMounted } from "vue"
import { useChessBoard } from "../composables/useChessBoard";
const { makeSelection, setupNewGame } = useChessBoard();

onMounted(() => {
	setupNewGame(updateBoard);
})


const pieces = ref([
	["BRook", "BKnight", "BBishop", "BQueen", "BKing", "BBishop", "BKnight", "BRook"],
	["BPawn", "BPawn", "BPawn", "BPawn", "BPawn", "BPawn", "BPawn", "BPawn"],
	...Array(4).fill(Array(8).fill(null)),
	["WPawn", "WPawn", "WPawn", "WPawn", "WPawn", "WPawn", "WPawn", "WPawn"],
	["WRook", "WKnight", "WBishop", "WQueen", "WKing", "WBishop", "WKnight", "WRook"]
]);

function getSquareColor(row, col) {
	return (row + col) % 2 === 0 ? 'light-square' : 'dark-square';
}

function handleSquareClick(row, column) {
	makeSelection(row, column, updateBoard);
}

function updateBoard(newPieces) {
	pieces.value = newPieces
}

</script>

<style scoped>
.chessboard {
	display: grid;
	grid-template-rows: repeat(8, 1fr);
	width: 100%;
	aspect-ratio: 1 / 1;
	border: 2px solid black;
}

.chess-row {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
}

.chess-square {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.light-square {
	background-color: white;
}

.dark-square {
	background-color: gray;
}

.piece {
	width: 80%;
	height: 80%;
}
</style>
