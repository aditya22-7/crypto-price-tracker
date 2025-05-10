const TableState = require("./cryptotable-state");

class Manager{
    static socket = null;



    static init(socket){
        this.socket = socket;
        this.price();
        this.hour1();
        this.hour24();
        this.day7();
        this.marketCap();
        this.volume24h();
        this.circulatingSupply();
    }
    
    static price(){
        this.socket.on("price",(key,value,ind)=>{
            let currentState = TableState.table_state;
            const newPrices = currentState.Price.map((price, index) => {
                const currentPrice = parseFloat(price);
                const adjustment = currentPrice * (Math.random() * 0.1 - 0.05);
                return (currentPrice + adjustment).toFixed(2);
            });
            TableState.table_state.Price = newPrices;
            this.socket.emit("price", newPrices);
        });
        
    }
    static hour1(){
        this.socket.on("1h%", (key,value,ind) => {
            let currentState = TableState.table_state;

            const new1hChanges = currentState["1h %"].map((change) => {
                const currentChange = parseFloat(
                    change.replace("+", "").replace("-", "")
                );
                const adjustment = (Math.random() * 1 - 0.5).toFixed(2);
                const newChange = (
                    currentChange + parseFloat(adjustment)
                ).toFixed(2);
                if (Math.random() > 0.8) {
                    return change.startsWith("+")
                        ? `-${newChange}`
                        : `+${newChange}`;
                }
                return change.startsWith("+") ? `+${newChange}` : `-${newChange}`;
            });
            TableState.table_state["1h %"] = new1hChanges;
            this.socket.emit("1h%", new1hChanges);
        });
        
    }
    static hour24(){
        this.socket.on("24h%", (key,value,ind) => {
            let currentState = TableState.table_state;
            const new24hChanges = currentState["24h %"].map((change) => {
                const currentChange = parseFloat(
                    change.replace("+", "").replace("-", "")
                );
                const adjustment = (Math.random() * 2 - 1).toFixed(2);
                const newChange = (
                    currentChange + parseFloat(adjustment)
                ).toFixed(2);
                if (Math.random() > 0.8) {
                    return change.startsWith("+")
                        ? `-${newChange}`
                        : `+${newChange}`;
                }
                return change.startsWith("+") ? `+${newChange}` : `-${newChange}`;
            });
            TableState.table_state["24h %"] = new24hChanges;
            this.socket.emit("24h%", new24hChanges);
        });
        
    }
    static day7(){
        this.socket.on("7d%", (key,value,ind) => {
            let currentState = TableState.table_state;
            const new7dChanges = currentState["7d %"].map((change) => {
                const currentChange = parseFloat(
                    change.replace("+", "").replace("-", "")
                );
                const adjustment = (Math.random() * 4 - 2).toFixed(2);
                const newChange = (
                    currentChange + parseFloat(adjustment)
                ).toFixed(2);   
                if (Math.random() > 0.9) {
                    return change.startsWith("+")
                        ? `-${newChange}`
                        : `+${newChange}`;
                }
                return change.startsWith("+") ? `+${newChange}` : `-${newChange}`;
            });
            TableState.table_state["24h %"] = new7dChanges;
            this.socket.emit("7d%", new7dChanges);
        });
    }
    static marketCap(){
        this.socket.on("Market_Cap", (key,value,ind) => {
            let currentState = TableState.table_state;

            const newMarketCap = currentState["Market Cap"].map(
                (cap, index) => {
                    const currentCap = parseFloat(cap);
                    const adjustment = currentCap * (Math.random() * 0.1 - 0.03);
                    return (currentCap + adjustment).toFixed(2);
                }
            );
            TableState.table_state["Market Cap"] = newMarketCap;
            this.socket.emit("Market_Cap", newMarketCap);
        });
        
    }
    static volume24h(){
        this.socket.on("Volume_24h", (key,value,ind) => {
            let currentState = TableState.table_state;

            const volume_row = currentState["Volume(24h)"].map(
                (vol_row, index) => {
                    return vol_row.map((vol) => {
                        const currentVolume = parseFloat(vol);
                        const adjustment =
                        currentVolume * (Math.random() * 0.01 - 0.001);
                        return (currentVolume + adjustment).toFixed(2);
                    });
                }
            );
            TableState.table_state["Volume(24h)"] = volume_row;
            this.socket.emit("Volume_24h", volume_row);
        });
        
    }
    static circulatingSupply(){
        this.socket.on("Circulating_supply", (key,value,ind) => {
            let currentState = TableState.table_state;

						const newCs = currentState["Circulating Supply"].map(
							(cs, index) => {
								const currentCs = parseFloat(cs);
								const adjustment = currentCs * (Math.random() * 0.001 - 0.001);
								return (currentCs + adjustment).toFixed(2);
							}
						);
						TableState.table_state["Circulating Supply"] = newCs;
						this.socket.emit("Circulating_supply", newCs);
        });
    }
}

module.exports = Manager;
