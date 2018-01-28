var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(5000, function(){
  console.log('listening on *:5000');
});
   


app.get('/', function(req, res){
  
});

var users = {};
io.on('connection', function(socket){


     console.log('a user connected');
   socket.on('login', function(data){
      console.log("hi shivam");
      //console.log('a user ' + data.user_email + ' connected');
      //saving userId to array with socket ID
      users[data.user_email] = socket;
    });
    socket.on('disconnect', function(){
      
      
    });
 
    socket.on('checkOnline',function(data){
      var email=data.user_email
      console.log(users,email);
      var soc = users[email];
      
      if(soc!=undefined){
      if(soc.connected)
      { 
        socket.emit('status',{'status':'online'});
      }
      else{

        socket.emit('status',{'status':'offline'});
      }
    }
    else{
      socket.emit('status',{'status':'offline'});
    }
    
    });
 

  socket.on('forceDisconnect', function(){
      socket.disconnect();
  });

  socket.on('make_room',function(data){
  	var sortAlphabets = function(text) {
	    return text.split('').sort().join('');
	};
	
	console.log(sortAlphabets(data.sender_email+data.receiver_email));
  	socket.join(sortAlphabets(data.sender_email+data.receiver_email));
  });

  
  socket.on("sendMessage",function(data){
  	
  	var sortAlphabets = function(text) {
	    return text.split('').sort().join('');
	};
	console.log(sortAlphabets(data.sender_email+data.receiver_email));
	
  	io.sockets.in(sortAlphabets(data.sender_email+data.receiver_email)).emit('receiveMessage', data);
  	

  });

});





 
