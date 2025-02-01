<template>
	<div class="grid grid-cols-8 w-64 h-64 border-2 border-black">
		<div
			v-for="(row, rowIndex) in pieces"
			:key="rowIndex"
			class="grid grid-cols-8"
		>
			<div
				v-for="(piece, colIndex) in row"
				:key="colIndex"
				:class="[
					'w-8 h-8 flex items-center justify-center',
					getSquareColor(rowIndex, colIndex),
				]"
				@click="squareClicked(rowIndex, colIndex)"
			>
				<img
					v-if="piece"
					:src="`/assets/${piece}.png`"
					class="w-6 h-6"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted } from "vue";
import { useChessBoard } from "../composables/useChessBoard";
const { sendSelection, setupNewGame } = useChessBoard();

onMounted(() => {
	setupNewGame();
});

let pieces = [
	[
		"BRook",
		"BKnight",
		"BBishop",
		"BQueen",
		"BKing",
		"BBishop",
		"BKnight",
		"BRook",
	],
	["BPawn", "BPawn", "BPawn", "BPawn", "BPawn", "BPawn", "BPawn", "BPawn"],
	...Array(4).fill(Array(8).fill(null)),
	["WPawn", "WPawn", "WPawn", "WPawn", "WPawn", "WPawn", "WPawn", "WPawn"],
	[
		"WRook",
		"WKnight",
		"WBishop",
		"WQueen",
		"WKing",
		"WBishop",
		"WKnight",
		"WRook",
	],
];

function getSquareColor(row, col) {
	return (row + col) % 2 === 0 ? "bg-white" : "bg-gray-700";
}

function squareClicked(row, column) {
	sendSelection(row, column, updatePieces);
}

function updatePieces(newPieces) {
	pieces = newPieces;
}
</script>

<style scoped></style>
