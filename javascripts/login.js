$(function(){

  var $password = $('#Password');
  var $username = $('#Username');
  $('#A').on('click', function(e){
    e.preventDefault();
    redirectIfAuthorized();
  })
  var redirectIfAuthorized = function(){
    var token = localStorage.getItem('token');
    if (token){
      location.href='add.html';
    }
  };

$('#submit').on('click', function(e) {
  e.preventDefault()
  var user = {auth:{
    password: $password.val(),
    username: $username.val(),
  }};

  $.ajax({
    type: 'POST',
    url: 'play4free.herokuapp.com/login',
    data: user,
    success: function(response) {
      localStorage.setItem('token', response.token);
      $.ajaxPrefilter(function(options){
        options.headers = {};
        options.headers['AUTHORIZATION'] = "Token token=" + response.token;
      })
      window.location.replace('http://peter-white.github.io/play4free-githubpages/pages/games.html');
    },
    error: function() {
      alert('Invalid');
    }
    });
  });
})
