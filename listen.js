const app = require('./app.js')

app.listen(9090, (error) => {
	if (error) console.log("An error has occurred");
	else console.log("Server is listening on port 9090");
});