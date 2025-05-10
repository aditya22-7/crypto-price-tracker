# crypto-price-tracker
Real time crypto-currency table. Frontend is built using React.js and Redux. Web sockets are used for real time updations. 

This guide will walk you through setting up the cryptocurrency table application using React, Redux, and plain CSS (no Tailwind required).

Prerequisites : 
Node.js (version 14.0.0 or later)
npm (Node Package Manager)

Step 1: Create a New React Application
npx create-react-app crypto-table-app
cd crypto-table-app

Step 2: Install Dependencies
npm install redux react-redux
npm install socket.io-client
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/react-fontawesome

Step 3: Server side code
mkdir server
cd server
npm init
npm install socket.io

Step 4: Client side code
Understanding the Project Structure
1. React Component Structure
The application consists of:

App.js: Main component that includes the Redux Provider and CryptoTable component
CryptoTable.css: Styling for the entire application

2. Redux Implementation
The Redux store is configured with:

Initial State: JSON data for the cryptocurrency table
Reducer Function: Handles updates to each column using switch cases
Action Dispatchers: Functions to update specific columns

Step 5: Run Server (when in root project folder)
cd server
node index.js

Step 6: Run react app (when in root project folder)
npm start

