import { useCatStore } from "../stores/CatStore";

let ws: WebSocket;

export const initializeWebSocket = () => {
    ws = new WebSocket('ws://localhost:8087');
    ws.onmessage = () => {
        console.log('received msg from ws');
        useCatStore.getState().fetchLastPageAndSortDirection();
        useCatStore.getState().fetchAgeDistribution();
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
