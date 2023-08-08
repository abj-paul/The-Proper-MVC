const eventSource = new EventSource('http://localhost:3000/sse');

eventSource.onmessage = event => {
  const data = event.data;
  // Process data from the server
    console.log("SSE Recived: " + data);
    updateView(data);
};

function postValue(){
    const textInput = document.getElementById("textInput");

    const newValue = textInput.value;
    console.log("Debug: "+newValue);

    fetch("http://localhost:3000/data", {
	method: "PATCH",
	headers: {
	    "Content-Type": "application/json"
	},
	body: JSON.stringify({ data : newValue })
    })
	.then(response => response.json())
	.then(data => {
	    console.log(data);
	})
	.catch(error => {
	    console.error("Error:", error);
	});
    
}



function updateView(data){
    const outputDiv = document.getElementById("output");
    outputDiv.textContent = "Data entered: " + data;
}
