import { ref } from "vue";
import axios from "axios";
const apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;

let callbackFunction;
let gameVSEngine;
let engineMoveRequestTimestamp;
let connectFailCount=0;
const maxFails=3;


export function useChessBoard() {
	async function setupNewGame(callback) {
		callbackFunction=callback;
		console.log("sedning request to:", apiEndpoint);
		connectWebSocket();		
	}

	async function makeSelection(row, column, gameVSEngineT) {
		try {
			gameVSEngine=gameVSEngineT;
			console.log(
				"coordinates:",
				transformSingleCoordinateFromClientToAPI([row, column]),
			);
			sendMessage(
				{
					type: "handleSelection",
					coordinates: transformSingleCoordinateFromClientToAPI([
						row,
						column,
					])
				}				
			);			
		} catch (error) {
			console.error(
				"Error making selection:",
				error.response?.data || error.message,
			);
			alert("Failed to setup game.");
		}
	}

	async function resetBoard() {
		sendMessage({type: "resetBoard"});
	}

	async function killEngine() {
		const endpoint = apiEndpoint + "killEngine";
		const response = await axios.get(endpoint);
		console.log("Server response:", response.data);
	}

	async function selectedPromotionPiece(pieceName){
		sendMessage({type: "selectedPromotionPiece", piece: pieceName});
	}


	return {
		setupNewGame,
		makeSelection,
		resetBoard,
		killEngine,
		selectedPromotionPiece,
	};
}


let ws = null

const connectWebSocket = () => {
  ws = new WebSocket(apiEndpoint);

  ws.onopen = () => {
	sendMessage({type: "setupGame"});
	connectFailCount=0;
  }

  ws.onmessage = (event) => {
	connectFailCount=0;
    const message = JSON.parse(event.data)
	console.log("recieved from server", message)
	switch(message.type){
		case "setupGame": callbackFunction(message.payload);
			break;
		case "getEngineMove": {
			const time=new Date();
			if(time-engineMoveRequestTimestamp<700){
				setTimeout(callbackFunction, 700-(time-engineMoveRequestTimestamp),"update board", transformBoardFromAPIToClient(message.board) )
			} else{
				callbackFunction("update board", transformBoardFromAPIToClient(message.board));
			}
		}
			break;
		case "handleSelection": recieveInstructions(message);	
			break;	
		case "checkmate": callbackFunction("checkmate")	;
			break;	
		case "selectedPromotionPiece": callbackFunction("update board", transformBoardFromAPIToClient(message.board));
			break;
		case "promote": callbackFunction("promote", message.payload);			
	}
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
	connectFailCount++;
  }

  ws.onclose = () => {
    console.log('WebSocket disconnected')

    if(connectFailCount<maxFails) setTimeout(connectWebSocket, 3000);
  }
}

function recieveInstructions(data){
	console.log("Server response:", data);
			if (data.highlightTarget) {
				let coordinates = [
					Number(data.highlightTarget[0]),
					Number(data.highlightTarget[2]),
				];
				callbackFunction(
					"highlight square",
					transformSingleCoordinateFromAPIToClient(coordinates),
				);
			} else if (data.board) {
				callbackFunction(
					"update board",
					transformBoardFromAPIToClient(data.board),
				);
				if (gameVSEngine) {					
					getEngineMove();
				}
			} else if (data.result === "illegal move") {
				callbackFunction("reset highlight");
			}
}

function sendMessage(message) {
  if (ws && ws.readyState === WebSocket.OPEN && message) {
	console.log("sending to server: ", message);
    ws.send(JSON.stringify(message));
  }
}

function getEngineMove() {
	engineMoveRequestTimestamp=new Date();
	sendMessage({type:"getEngineMove"});
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