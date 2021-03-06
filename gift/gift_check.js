initFirebaseAuth();
// Initiate firebase auth.
function initFirebaseAuth() {
 firebase.auth().onAuthStateChanged(authStateObserver);
}
var signOutButtonElement = document.getElementById('logoutbtn');
function signOut() {
 // Sign out of Firebase.
 firebase.auth().signOut();
}
signOutButtonElement.addEventListener('click', signOut);

// Returns the signed-in user's display name.
function getUserName() {
 return firebase.auth().currentUser.displayName;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   document.getElementById("userID").innerHTML = getUserName();
   document.getElementById("userID2").innerHTML = getUserName();
   document.getElementById("userID3").innerHTML = getUserName();
   document.getElementById("userID4").innerHTML = getUserName();

 } else { // User is signed out!
   location.href="/index.html";
 }
}
// Modal
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
    $(".giftcontent").children('.on').removeClass('on'); // 활성화된 modal content 삭제
  }
}
// modal close
document.getElementById("giftclose").onclick = function() {
  document.getElementById("myModal").style.display = "none";
  $(".giftcontent").children('.on').removeClass('on'); // 활성화된 modal content 삭제
};

// load gifts
function getReceived() {
  var gifts = document.getElementsByClassName("gift");
  for (i=0; i< gifts.length; i++){
    gifts[i].onclick = function() {
      document.getElementById("myModal").style.display = "block";
      var idx = $('.gift').index(this);
    $('.giftdisplay').eq(idx).addClass('on');
     
    };
  }
}
getReceived();


// when receive button is clicked, confirm message shown, then the button become inactive
$('.product_rcbtn').on('click',function(){
 var idx = $('.product_rcbtn').index(this);
 if ( document.getElementsByClassName('userinput')[idx].value != "") {
   var result = confirm("Is the address written correctly?");
   if(result){
     $('#pop').show();
     $(this).addClass(' off');
     $(this).attr('disabled', true);
     $('.modal').hide();
     $(".giftcontent").children('.on').removeClass('on');

     var icon = $('.gift').eq(idx);
     if (icon.hasClass('new')){ //if it is a new letter, update as read
         icon.removeClass(' new');
         icon.addClass(' old');
         icon.html('<i class="fas fa-box-open"></i>');
     }
   }
 }
 else{
  alert("Please type your address.");
  };
});

//pop x button clicked
$('#popclose').on('click',function(){
  $('#pop').hide();
});
