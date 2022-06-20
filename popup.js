watch = document.getElementById('watch');
anime = document.getElementById('name');
ep = document.getElementById('ep');
sugg = document.querySelector('.suggestion');
lock_nsfw = document.querySelector('.lock_nsfw')
nsfw_key = document.querySelector('#key')
submit_nsfw = document.querySelector('.nsfw_submit')
//================================================================//
nsfw = document.querySelector('.nsfw')
sfw = document.querySelector('.sfw')
gogo = document.querySelector('.gogo')
zoro = document.querySelector('.zoro')
black_bg = document.querySelector('.black')
white_bg = document.querySelector('.white')

function check_status(){
  if(localStorage.choice == "true"){
    nsfw.style.backgroundPosition = "left"
    sfw.style.backgroundPosition = "left"
    nsfw.style.color = "white"
     sfw.style.color = "black"
  } else {
    nsfw.style.backgroundPosition = "right"
    sfw.style.backgroundPosition = "right"
    sfw.style.color = "white"
    nsfw.style.color = "black"
  }
  //-----//
  if (localStorage.site == "gogo") {
    gogo.style.backgroundPosition = "right"
    zoro.style.backgroundPosition = "right"
    gogo.style.color = "white"
     zoro.style.color = "black"
  } else {
    gogo.style.backgroundPosition = "left"
    zoro.style.backgroundPosition = "left"
    zoro.style.color = "white"
    gogo.style.color = "black"
  }
  //----//
  if(localStorage.bg == "black"){
    white_bg.style.backgroundPosition = "left"
    black_bg.style.backgroundPosition = "left"
    black_bg.style.color = "white"
    white_bg.style.color = "black"
  } else {
    white_bg.style.backgroundPosition = "right"
    black_bg.style.backgroundPosition = "right"
    white_bg.style.color = "white"
     black_bg.style.color = "black"


  }
  }

check_status();

if (typeof(Storage) !== "undefined") {
//wallpaper
nsfw.addEventListener('click',()=>{
    alert("Has Adult & Sensitive content. Only for 18+ ")
    lock_nsfw.style.display = "block"
    nsfw_key.value = ""
    
    submit_nsfw.addEventListener('click',()=>{
      lock_nsfw.style.display = "none"
      nsfw_key.innerText = "Enter Key"
      if (nsfw_key.value == "36116158234121"){
        localStorage.choice = true;
        check_status(); 
    chrome.tabs.reload();
      } else {
        localStorage.choice = false;
  localStorage.category = "waifu";
  check_status();
  chrome.tabs.reload();
      }
    })   
})
sfw.addEventListener('click',()=>{
  localStorage.choice = false;
  localStorage.category = "waifu";
  lock_nsfw.style.display = "none"
  check_status();
  chrome.tabs.reload();
 })

//site preference
gogo.addEventListener('click',()=>{
  localStorage.site = "gogo";
  check_status();
  chrome.tabs.reload();
 })
zoro.addEventListener('click',()=>{
  localStorage.site = "zoro";
  check_status();
  chrome.tabs.reload();
 })

 black_bg.addEventListener('click',()=>{
  localStorage.bg = "black";
  check_status();
  chrome.tabs.reload();
 })
 white_bg.addEventListener('click',()=>{
  localStorage.bg = "white";
  check_status();
  chrome.tabs.reload();
 })
} else {
 document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
}

//========================================================================================//


