import { useCatStore } from "../stores/CatStore";

let ws: WebSocket;

export const initializeWebSocket = () => {
    ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = () => {
        useCatStore.getState().fetchLastPageAndSortDirection();
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };
};

export const closeWebSocket = () => {
    if (ws) {
        ws.close();
    }
}
