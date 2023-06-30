const app = require('./app.js')
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`listening on ${PORT}...`))

app.listen(9090, (error) => {
	if (error) console.log("An error has occurred");
	else console.log("Server is listening on port 9090");
});