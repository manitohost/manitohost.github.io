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


// Returns true if a user is signed-in.
function isUserSignedIn() {
return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
 if (user) { // User is signed in!
   document.getElementById("userID").innerHTML = getUserName();

 } else { // User is signed out!
   location.href="/index.html";
 }
}
var ad1 = document.getElementsByClassName("ad_content")[0];
ad1.onclick = function() {
  sessionStorage.setItem('Product_no', 10);
  sessionStorage.setItem('Nav_parent', "'<a href='gift_send.html'>AD</a>");
  location.href='gift_detail_sender.html';
}
var ad2 = document.getElementsByClassName("ad_content")[1];
ad2.onclick = function() {
  sessionStorage.setItem('Product_no', 11);
  sessionStorage.setItem('Nav_parent', "'<a href='gift_send.html'>AD</a>");
  location.href='gift_detail_sender.html';
}

var hashtagsDiv = document.getElementsByClassName("hashtag")[0];
var hashtags = $(hashtagsDiv).children();
for (i=0; i< hashtags.length; i++){
  hashtags[i].onclick = function() {
    sessionStorage.setItem("Hashtag", this.id);
    sessionStorage.setItem("Hashtag_name", this.innerHTML);
  }
}

var searchbtn = document.getElementsByClassName("searchbtn")[0];
var keyword = document.getElementsByClassName("search")[0];
searchbtn.onclick = function (){
  var key = keyword.value;
  gedSearchedItem(key);
  keyword.value = ""; //clear
}

function gedSearchedItem(key){
  var found = 0;
  var productName;
  var content = "";
  firebase.database().ref().once('value').then(function(snapshot) {

    var data = snapshot.val();
    for (count= 1, i = 0 ; i < data.length; i++){
      productName = data[i].Name;

      if (productName.includes(key)) {
        content +=
        "<tr class='rank_tr' onclick='sessionStorage.setItem(\"Product_no\", " + data[i].Product_no +
        "); location.href=\"gift_detail_sender.html\"'> \
            <td class='rank_no'>" + count +"</td> \
            <td class='product_img'><img src='" + data[i].Img + "'></td> \
            <td class='product_info'> \
                <table> \
                    <tr class='product_name'><td>" +data[i].Name +"</td></tr> \
                    <tr class='product_detail'><td>" +data[i].Price+" won</td></tr> \
                </table> \
            </td> \
        </tr>";
        found = 1;
        count++;
      }
    }
    if (found == 0) {
      content = "No such item.";
    }
    document.getElementsByClassName("rank")[0].innerHTML = content; //rank div안에 넣기
    $('.wrapper_search').addClass('on');
    $('.wrapper').hide();
    var nav_bar = document.getElementsByClassName('subt')[0];
    nav_bar.innerHTML = "<a href='#' onclick='searchClose();'>Back</a><span> Search: '"+key+"'</span>";
    sessionStorage.setItem("Nav_parent", nav_bar.innerHTML);
  });

}
function searchClose(){
  $('.wrapper_search').removeClass('on');
  $('.wrapper').show();
}

$(document).ready(function(){
  $('.search').keydown(function(key){
    if (key.keyCode == 13){
      var keyword = document.getElementsByClassName("search")[0];
      var keyvalue = keyword.value;
      gedSearchedItem(keyvalue);
      keyword.value = ""; //clear
    }
  })
})
