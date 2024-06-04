import { useCatStore } from "../stores/CatStore";

let ws: WebSocket;

export const initializeWebSocket = () => {
    // ws = new WebSocket('wss://localhost:8087');
    ws = new WebSocket('wss://ec2-13-49-120-237.eu-north-1.compute.amazonaws.com:8087');
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
