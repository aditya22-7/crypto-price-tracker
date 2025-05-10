import { io } from "socket.io-client";

export default class SocketHandler {
	static redux_store = null;
	static socket = null;
	static init() {
		this.socket = io("http://localhost:8082");
		this.price();
		this.hour1();
		this.hour24();
		this.day7();
		this.marketCap();
		this.volume24h();
		this.circulatingSupply();
	}

	static price() {
		this.socket.on("price", (newPrices) => {
			this.redux_store.dispatch({ type: "Price", value: newPrices });
		});
	}
	static hour1() {
		this.socket.on("1h%", (newHourChanges) => {
			this.redux_store.dispatch({ type: "1h %", value: newHourChanges });
		});
	}
	static hour24() {
		this.socket.on("24h%", (new24HourChanges) => {
			this.redux_store.dispatch({ type: "24h %", value: new24HourChanges });
		});
	}
	static day7() {
		this.socket.on("7d%", (new7dayChanges) => {
			this.redux_store.dispatch({ type: "7d %", value: new7dayChanges });
		});
	}
	static marketCap() {
		this.socket.on("Market_Cap", (newMarketCap) => {
			this.redux_store.dispatch({ type: "Market Cap", value: newMarketCap });
		});
	}
	static volume24h() {
		this.socket.on("Volume_24h", (newVolume24h) => {
			this.redux_store.dispatch({ type: "Volume(24h)", value: newVolume24h });
		});
	}
	static circulatingSupply() {
		this.socket.on("Circulating_supply", (newCirculatingSupply) => {
			this.redux_store.dispatch({
				type: "Circulating Supply",
				value: newCirculatingSupply,
			});
		});
	}

	static emitPrice() {
		this.socket.emit("price", "Price", [8, 9, 10], 2);
	}
	static emit1Hour() {
		this.socket.emit("1h%", "1h %", [8, 9, 10], 2);
	}
	static emit24Hour() {
		this.socket.emit("24h%", "24h %", [8, 9, 10], 2);
	}
	static emit7Days() {
		this.socket.emit("7d%", "7d %", [8, 9, 10], 2);
	}
	static emitMarketCap() {
		this.socket.emit("Market_Cap", "Market Cap", [8, 9, 10], 2);
	}
	static emitVolume24h() {
		this.socket.emit("Volume_24h", "Volume 24h", [8, 9, 10], 2);
	}
	static emitCirculatingSupply() {
		this.socket.emit("Circulating_supply", "Circulating supply", [8, 9, 10], 2);
	}
}




