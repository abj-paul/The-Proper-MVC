const eventSource = new EventSource('http://localhost:3000/sse');

eventSource.onmessage = event => {
  const data = event.data;
  // Process data from the server
    console.log(data);
};
