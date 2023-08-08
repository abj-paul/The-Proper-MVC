const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/",(req,res)=>{
    console.log("Root hit");
    res.status(200).send({"Message":"Server Running!"});
})

let clients = [];
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Keep the connection alive by sending a "heartbeat" every few seconds
    const heartbeatInterval = setInterval(() => {
	res.write(':heartbeat\n\n');
    }, 10000); // Send a heartbeat every 10 seconds
    
    clients.push({ req, res });
    
    // Listen for client disconnects
    req.on('close', () => {
	// Remove the client from the list
    const index = clients.findIndex(client => client.req === req);
	if (index !== -1) {
	    clients.splice(index, 1);
	}
	console.log("After closing connection, clients left: "+clients.length);
	clearInterval(heartbeatInterval);
    });
    
    // Send initial data to the client
    res.write(`data: Initial data\n\n`);
    console.log("Clients Connected so far: "+clients.length);
});

app.listen(3000, (data)=>{
    console.log("App is running at http://localhost/3000");
})
