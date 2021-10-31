var http = require('http');

var options = {
	host: 'keshav.du.ac.in',
	path: '/stu-attendance',
	method: 'GET'
};

http.request(options,(response)=>{
	console.log(response);
}).end();