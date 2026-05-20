<template>
	<div class="container">
		<div class="chessboard">
			<div
				v-for="(row, rowIndex) in pieces"
				:key="rowIndex"
				class="chess-row"
			>
				<div
					v-for="(piece, colIndex) in row"
					:key="colIndex"
					:class="[
						'chess-square',
						getSquareColor(rowIndex, colIndex),
						getHighlightedSquare(rowIndex, colIndex),
					]"
					@click="handleSquareClick(rowIndex, colIndex)"
				>
					<img						
						v-if="piece && piece != 'EMPTY'"
						:src="`/assets/${piece}.png`"
						class="piece"
						:alt="piece"
					/>
				</div>
			</div>
		</div>
		<div v-if="isCheckmate" class="overlay">
			<h1 style="background-color: lightgrey; padding: 10px">
				Checkmate!
			</h1>
			<h1
				style="
					margin-top: 10px;
					background-color: lightgrey;
					padding: 10px;
					cursor: pointer;
				"
				@click="resetGame()"
			>
				Play again?
			</h1>
		</div>
		<div
			v-if="isWPromoting"
			class="overlay"
			style="display: flex; background-color: lightgrey"
		>
			<img
				:src="`/assets/WQueen.png`"
				class="piece"
				:alt="WQueen"
				@click="selectPiece('WQueen')"
			/>
			<img
				:src="`/assets/WBishop.png`"
				class="piece"
				:alt="WBishop"
				@click="selectPiece('WBishop')"
			/>
			<img
				:src="`/assets/WKnight.png`"
				class="piece"
				:alt="WKnight"
				@click="selectPiece('WKnight')"
			/>
			<img
				:src="`/assets/WRook.png`"
				class="piece"
				:alt="WRook"
				@click="selectPiece('WRook')"
			/>
		</div>
		<div
			v-if="isBPromoting"
			class="overlay"
			style="display: flex; background-color: lightgrey"
		>
			<img
				:src="`/assets/BQueen.png`"
				class="piece"
				:alt="BQueen"
				@click="selectPiece('BQueen')"
			/>
			<img
				:src="`/assets/BBishop.png`"
				class="piece"
				:alt="BBishop"
				@click="selectPiece('BBishop')"
			/>
			<img
				:src="`/assets/BKnight.png`"
				class="piece"
				:alt="BKnight"
				@click="selectPiece('BKnight')"
			/>
			<img
				:src="`/assets/BRook.png`"
				class="piece"
				:alt="BRook"
				@click="selectPiece('BRook')"
			/>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useChessBoard } from "../composables/useChessBoard";
const { makeSelection, setupNewGame, resetBoard, selectedPromotionPiece } = useChessBoard();

onMounted(() => {
	setupNewGame(updateBoard);
});

const playingVSEngine = ref(true);
const whiteOnTop = ref(false);
const highlightedSquare = ref([-1, -1]);
const isCheckmate = ref(false);
const isWPromoting = ref(false);
const isBPromoting = ref(false);

const pieces = ref([
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
]);

function getSquareColor(row, col) {
	return (row + col) % 2 === 0 ? "light-square" : "dark-square";
}

function handleSquareClick(row, column) {
	makeSelection(row, column, playingVSEngine.value);
}

function selectPiece(pieceName) {
	isBPromoting.value = false;
	isWPromoting.value = false;
	selectedPromotionPiece(pieceName);
}

function resetGame() {
	resetBoard();
	isCheckmate.value = false;
	pieces.value = [
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
		[
			"BPawn",
			"BPawn",
			"BPawn",
			"BPawn",
			"BPawn",
			"BPawn",
			"BPawn",
			"BPawn",
		],
		...Array(4).fill(Array(8).fill(null)),
		[
			"WPawn",
			"WPawn",
			"WPawn",
			"WPawn",
			"WPawn",
			"WPawn",
			"WPawn",
			"WPawn",
		],
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
	resetHighlightedSquare();
}

function updateBoard(instructions, newData) {
	if (instructions === "success") {
		console.log("board is setup");
	}
	if (instructions === "highlight square") {
		highlightedSquare.value = newData;
	} else if (instructions === "update board") {
		pieces.value = newData;
		resetHighlightedSquare();
	} else if (instructions === "reset highlight") {
		resetHighlightedSquare();
	} else if (instructions === "checkmate") {
		isCheckmate.value = true;
	} else if (instructions === "promote") {
		//this should just be W or B
		promote(newData);
	}
}

function promote(colour) {
	if (colour == "W") {
		isWPromoting.value = true;
	} else if (colour == "B") {
		isBPromoting.value = true;
	}
}

function getHighlightedSquare(row, column) {
	if (
		row === highlightedSquare.value[0] &&
		column === highlightedSquare.value[1]
	) {
		return "highlight";
	}
}

function resetHighlightedSquare() {
	highlightedSquare.value = [-1, -1];
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
	cursor: pointer;
	width: 80%;
	height: 80%;
}

.highlight {
	border-style: inset;
	border-width: 3px;
	border-color: yellow;
}

.container {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.overlay {
	position: absolute;
	color: black;
	padding: 10px;
}
</style>
