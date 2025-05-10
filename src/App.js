import React, { useState, useEffect, useRef } from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SocketHandler from "./socketHandler";
import "./CryptoTable.css";

const initialState = {
	Name: [
		"Bitcoin BTC",
		"Ethereum ETH",
		"Tether USDT",
		"XRP XRP",
		"BNB BNB",
		"Solana SOL",
	],
	Price: ["93759.48", "1802.46", "3.11", "2.22", "606.65", "151.51"],
	"1h %": ["+0.43", "+0.60", "0.00", "+0.46", "+0.09", "+0.53"],
	"24h %": ["+0.93", "+3.21", "0.00", "+0.54", "-1.20", "+1.26"],
	"7d %": ["+11.11", "+13.68", "+0.04", "+6.18", "+3.73", "+14.74"],
	"Market Cap": [
		"1861618902186",
		"217581279327",
		"145320022085",
		"130073814966",
		"85471956947",
		"78381958631",
	],
	"Volume(24h)": [
		["43874950947", "467810"],
		["23547469307", "13050000"],
		["92288882007", "92250000000"],
		["5131481491", "2300000000"],
		["1874281784", "3080000"],
		["4881674486", "32250000"],
	],
	"Circulating Supply": [
		"19850000",
		"120710000",
		"145270000000",
		"58390000000",
		"140890000",
		"517310000",
	],
	"Last 7 Days": [
		"https://example.com/charts/btc.png",
		"https://example.com/charts/eth.png",
		"https://example.com/charts/usdt.png",
		"https://example.com/charts/xrp.png",
		"https://example.com/charts/bnb.png",
		"https://example.com/charts/sol.png",
	],
};

function cryptoReducer(
	state = { ...initialState, previous: { ...initialState } },
	action
) {
	if (!action.type) return state;

	let newState = { ...state };
	let newPrevious = { ...state.previous };

	switch (action.type) {
		case "Name":
			newPrevious.Name = [...state.Name];
			newState.Name = action.value;
			newState.previous = newPrevious;
			return newState;
		case "Price":
			newPrevious.Price = [...state.Price];
			newState.Price = action.value;
			newState.previous = newPrevious;
			return newState;
		case "1h %":
			newPrevious["1h %"] = [...state["1h %"]];
			newState["1h %"] = action.value;
			newState.previous = newPrevious;
			return newState;
		case "24h %":
			newPrevious["24h %"] = [...state["24h %"]];
			newState["24h %"] = action.value;
			newState.previous = newPrevious;
			return newState;
		case "7d %":
			newPrevious["7d %"] = [...state["7d %"]];
			newState["7d %"] = action.value;
			newState.previous = newPrevious;
			return newState;
		case "Market Cap":
			newPrevious["Market Cap"] = [...state["Market Cap"]];
			newState["Market Cap"] = action.value;
			newState.previous = newPrevious;
			return newState;
		case "Volume(24h)":
			newPrevious["Volume(24h)"] = state["Volume(24h)"].map((arr) => [...arr]);
			newState["Volume(24h)"] = action.value;
			newState.previous = newPrevious;
			return newState;
		case "Circulating Supply":
			newPrevious["Circulating Supply"] = [...state["Circulating Supply"]];
			newState["Circulating Supply"] = action.value;
			newState.previous = newPrevious;
			return newState;
		case "Last 7 Days":
			newPrevious["Last 7 Days"] = [...state["Last 7 Days"]];
			newState["Last 7 Days"] = action.value;
			newState.previous = newPrevious;
			return newState;
		default:
			return state;
	}
}

const store = createStore(cryptoReducer);

const formatLargeNumber = (num) => {
	if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
	if (num >= 1e9) return `$${(num / 1e9).toFixed(0)}B`;
	if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`;
	return `$${num}`;
};

const StarIcon = ({ filled }) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill={filled ? "currentColor" : "none"}
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={filled ? "star-icon filled" : "star-icon"}>
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>
);

const ArrowUpIcon = ({ className = "" }) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={`arrow-icon ${className}`}>
		<polyline points="18 15 12 9 6 15" />
	</svg>
);

const ArrowDownIcon = ({ className = "" }) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={`arrow-icon ${className}`}>
		<polyline points="6 9 12 15 18 9" />
	</svg>
);

const ValueCell = ({
	currentValue,
	previousValue,
	formatFn = (val) => val,
	className = "",
}) => {
	const [transitionState, setTransitionState] = useState("none");
	const prevTransitionState = useRef("none");

	useEffect(() => {
		if (!previousValue) return;

		let current = parseFloat(currentValue);
		let previous = parseFloat(previousValue);

		if (current > previous) {
			setTransitionState("increased");

			const timer = setTimeout(() => {
				setTransitionState("none");
			}, 1500);
			return () => clearTimeout(timer);
		} else if (current < previous) {
			setTransitionState("decreased");

			const timer = setTimeout(() => {
				setTransitionState("none");
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [currentValue, previousValue]);

	const valueClass = `value-cell ${transitionState} ${className}`;

	return <div className={valueClass}>{formatFn(currentValue)}</div>;
};

const PercentageCell = ({
	currentValue,
	previousValue,
	formatFn = (val) => val,
	className = "",
}) => {
	const [transitionState, setTransitionState] = useState("none");
	const [baseClass, setBaseClass] = useState(() =>
		currentValue.startsWith("+")
			? "positive"
			: currentValue.startsWith("-")
			? "negative"
			: "neutral"
	);

	useEffect(() => {
		if (!previousValue) return;

		let current = parseFloat(currentValue.replace("+", "").replace("-", ""));
		let previous = parseFloat(previousValue.replace("+", "").replace("-", ""));

		const currentDirection = currentValue.startsWith("+")
			? "positive"
			: currentValue.startsWith("-")
			? "negative"
			: "neutral";
		const previousDirection = previousValue.startsWith("+")
			? "positive"
			: previousValue.startsWith("-")
			? "negative"
			: "neutral";

		setBaseClass(currentDirection);

		if (current !== previous || currentDirection !== previousDirection) {
			if (current > previous) {
				setTransitionState("increased");
			} else if (current < previous) {
				setTransitionState("decreased");
			} else if (currentDirection !== previousDirection) {
				setTransitionState(
					currentDirection === "positive" ? "increased" : "decreased"
				);
			}

			const timer = setTimeout(() => {
				setTransitionState("none");
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [currentValue, previousValue]);

	const percentageClass = `percentage ${baseClass} ${transitionState} ${className}`;

	return (
		<div className={percentageClass}>
			{currentValue.startsWith("+") && (
				<ArrowUpIcon className={transitionState} />
			)}
			{currentValue.startsWith("-") && (
				<ArrowDownIcon className={transitionState} />
			)}
			<span>{currentValue.replace("+", "").replace("-", "")}%</span>
		</div>
	);
};

const CryptoTable = () => {
	const cryptoData = useSelector((state) => state);
	const dispatch = useDispatch();
	const [favorites, setFavorites] = useState({});

	const toggleFavorite = (index) => {
		setFavorites((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	const getSymbol = (name) => {
		const parts = name.split(" ");
		return parts[parts.length - 1];
	};

	const generateTrendChart = (trend) => {
		const chartClass = trend.startsWith("+")
			? "trend-chart positive"
			: trend.startsWith("-")
			? "trend-chart negative"
			: "trend-chart neutral";

		let path;
		if (trend.startsWith("+")) {
			path = "M0,30 C10,28 20,25 30,20 C40,15 50,15 60,10 C70,5 80,2 100,0";
		} else if (trend.startsWith("-")) {
			path = "M0,5 C10,7 20,10 30,15 C40,20 50,20 60,25 C70,28 80,29 100,30";
		} else {
			path = "M0,15 C20,15 40,15 60,15 C80,15 100,15 100,15";
		}

		return (
			<svg viewBox="0 0 100 30" className={chartClass}>
				<path d={path} />
			</svg>
		);
	};

	return (
		<div className="table-container">
			<table className="crypto-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>1h %</th>
						<th>24h %</th>
						<th>7d %</th>
						<th>
							Market Cap{" "}
							<FontAwesomeIcon
								icon={faCircleInfo}
								style={{ color: "#9ca3af" }}
							/>
						</th>
						<th>
							Volume(24h){" "}
							<FontAwesomeIcon
								icon={faCircleInfo}
								style={{ color: "#9ca3af" }}
							/>
						</th>
						<th>
							Circulating Supply{" "}
							<FontAwesomeIcon
								icon={faCircleInfo}
								style={{ color: "#9ca3af" }}
							/>
						</th>
						<th>Last 7 Days</th>
					</tr>
				</thead>
				<tbody>
					{cryptoData.Name.map((name, index) => {
						const symbol = getSymbol(name);
						const isFavorite = favorites[index];
						const price = cryptoData.Price[index];
						const previousPrice = cryptoData.previous?.Price?.[index];
						const oneHourChange = cryptoData["1h %"][index];
						const previousOneHourChange =
							cryptoData.previous?.["1h %"]?.[index];
						const dayChange = cryptoData["24h %"][index];
						const previousDayChange = cryptoData.previous?.["24h %"]?.[index];
						const weekChange = cryptoData["7d %"][index];
						const previousWeekChange = cryptoData.previous?.["7d %"]?.[index];
						const marketCap = cryptoData["Market Cap"][index];
						const previousMarketCap =
							cryptoData.previous?.["Market Cap"]?.[index];
						const volume = cryptoData["Volume(24h)"][index][0];
						const previousVolume =
							cryptoData.previous?.["Volume(24h)"]?.[index]?.[0];
						const supply = cryptoData["Circulating Supply"][index];
						const previousSupply =
							cryptoData.previous?.["Circulating Supply"]?.[index];

						return (
							<tr key={index}>
								<td>
									<div className="index-cell">
										<button
											onClick={() => toggleFavorite(index)}
											className="favorite-button">
											<StarIcon filled={isFavorite} />
										</button>
										{index + 1}
									</div>
								</td>
								<td>
									<div className="coin-cell">
										<div className="coin-icon">{symbol[0]}</div>
										<div className="coin-name">
											<div className="primary">{name.split(" ")[0]}</div>
											<div className="secondary">{symbol}</div>
										</div>
									</div>
								</td>
								<td className="align-right">
									<ValueCell
										currentValue={price}
										previousValue={previousPrice}
										formatFn={(val) => `$${Number(val).toLocaleString()}`}
									/>
								</td>
								<td className="align-right">
									<PercentageCell
										currentValue={oneHourChange}
										previousValue={previousOneHourChange}
									/>
								</td>
								<td className="align-right">
									<PercentageCell
										currentValue={dayChange}
										previousValue={previousDayChange}
									/>
								</td>
								<td className="align-right">
									<PercentageCell
										currentValue={weekChange}
										previousValue={previousWeekChange}
									/>
								</td>
								<td className="align-right">
									<ValueCell
										currentValue={marketCap}
										previousValue={previousMarketCap}
										formatFn={(val) => formatLargeNumber(parseInt(val))}
									/>
								</td>
								<td className="align-right">
									<div>
										<ValueCell
											currentValue={volume}
											previousValue={previousVolume}
											formatFn={(val) => formatLargeNumber(parseInt(val))}
										/>
									</div>
									<div className="secondary">
										{parseInt(
											cryptoData["Volume(24h)"][index][1]
										).toLocaleString()}{" "}
										{symbol}
									</div>
								</td>
								<td className="align-right">
									<div>
										<ValueCell
											currentValue={supply}
											previousValue={previousSupply}
											formatFn={(val) =>
												`${parseFloat(val / 1000000).toFixed(2)}M ${symbol}`
											}
										/>
									</div>
									<div className="progress-bar">
										<div
											className="progress-fill"
											style={{
												width: `${Math.min(100, Math.random() * 100)}%`,
											}}></div>
									</div>
								</td>
								<td className="chart-cell">{generateTrendChart(weekChange)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

// Main App component
function App() {
	SocketHandler.redux_store = store;
	SocketHandler.init();
	setInterval(() => {
		SocketHandler.emitPrice();
	}, 5000);
	setInterval(() => {
		SocketHandler.emit1Hour();
	}, 3200);
	setInterval(() => {
		SocketHandler.emit24Hour();
	}, 3400);
	setInterval(() => {
		SocketHandler.emit7Days();
	}, 3600);
	setInterval(() => {
		SocketHandler.emitMarketCap();
	}, 8000);
	setInterval(() => {
		SocketHandler.emitVolume24h();
	}, 8000);
	setInterval(() => {
		SocketHandler.emitCirculatingSupply();
	}, 8500);
	return (
		<Provider store={store}>
			<div className="app-container">
				<h1>Cryptocurrency Market</h1>
				<CryptoTable />
			</div>
		</Provider>
	);
}

export default App;
