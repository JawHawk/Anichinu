if (localStorage.firstTime != "false") {
  localStorage.bgimg = "on";
  localStorage.choice = "false";
  localStorage.category = "waifu";
  localStorage.firstTime = "false";
}

//document elements
let watch = document.querySelector(".watch");
let anime = document.getElementById("name");
let ep = document.getElementById("ep");
let anime_name = document.querySelector(".anime-name");
let add = document.querySelectorAll(".add");
let add_Item = document.querySelector(".add-item");
let item_Name = document.querySelector(".item-name");
let item_Link = document.querySelector(".item-link");
let done = document.querySelector(".done");;
let dropdown = document.querySelector("#dropdown");

const suggs = document.querySelectorAll(".sugg");
const black_theme = "rgb(255, 199, 193)";

let zoroList, gogoList;
fetch("../anime_data/gogoList.json")
  .then((res) => res.json())
  .then((data) => (gogoList = data.gogoList));
fetch("../anime_data/zoroList.json")
  .then((res) => res.json())
  .then((data) => (zoroList = data.zoroList));

//============================================================================================================================================
// theme
if (localStorage.bg == "black") {
  document.body.style.background = "black";
  document.querySelector(".suggestion").style.color = "white";
  document.querySelector(".input").style.border = "none";
  document.querySelector(".watch").style.marginTop = "6px";
  const selec = [".personal",".txtyou",'.txtgmail','.txtdrive']
  for(let i = 0;i < selec.length; i++){ document.querySelector(selec[i]).style.color = black_theme; }

} else {
  document.body.style.background = "white";
  document.querySelector(".credits").style.color = "black";
  document.querySelectorAll('.per_links').forEach((item)=>item.style.color = "black")
}

//============================================================================================================================//
//background tags
function category_changer() {
  sfw_categories = [
    "uniform", "maid", "waifu", "oppai",
    "marin-kitagawa", "mori-calliope","raiden-shogun", "selfies",
  ];
  nsfw_categories = [
    "uniform", "maid","waifu", "oppai","selfies", "ass",
    "hentai", "milf", "oral", "paizuri","ero", "ecchi",
  ];
  if (localStorage.choice == "true") {
    for (let i = 0; i < nsfw_categories.length ; i++) {
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(nsfw_categories[i]));
      dropdown.appendChild(option);
    }
  } else {
    for (let i = 0; i < sfw_categories.length; i++) {
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(sfw_categories[i]));
      dropdown.appendChild(option);
    }
  }
}
category_changer();

document.querySelector("#option0").innerHTML = localStorage.category;
dropdown.addEventListener("change", () => {
  localStorage.choice == "true" ? localStorage.category = nsfw_categories[dropdown.selectedIndex - 1] 
  : localStorage.category = sfw_categories[dropdown.selectedIndex - 1];
  chrome.tabs.reload();
});

//=====================================================================================================================
// nsfw / sfw
if (localStorage.bgimg == "off") {
  document.querySelector(".off-bg").style.border = "2px solid blue";
  document.getElementById("bg").style.display = "none";
  anime_name.style.left = "50%";
  anime_name.style.transform =
    "translateX(" + -50 + "%)" + " translateY(" + -50 + "%)";
} else {
  document.querySelector(".on-bg").style.border = "2px solid blue";
  document.getElementById("bg").style.display = "block";
  const getUrl = async() => {
    var choice1;
    localStorage.choice == "true" ? choice1 = 'true' : choice1 = 'false'
    try {
      var res = await fetch(
        `https://api.waifu.im/search/?included_tags=${localStorage.category}&is_nsfw=${choice1}`
      );
      const json = await res.json();
      document.querySelector("#bg").src = json.images[0].url;
    } catch (error) {
      alert('The Image API is currently down. Kindly turn off background till we fix it.')
    }
  }
  getUrl();
}
//==============================================================================================================================================
// Input Suggestions , site preference : zoro / gogo

anime.addEventListener("keyup", () => {
  var filteredList;
  if (localStorage.site == "gogo") {
    filteredList = gogoList.reduce((total,item)=>{
      if (item.name.includes((anime.value).toLowerCase())) { total.push(item.name) }    
      return total
    },[])
  } else {
    filteredList = zoroList.reduce((total,item)=>{
      if (item.name.includes((anime.value).toLowerCase())) { total.push(item.name) }    
      return total
    },[]) }
  
  var i = 0;
  suggs.forEach((element) => {
    if (filteredList[i] == undefined) {
      element.style.display = "none";
    } else {
      element.innerHTML = filteredList[i];
      element.style.display = "block";
    }
    i++;
  });
});

//=================================================================================================================================================
//keyboard suggestions
var i = 0;
anime.addEventListener("keydown", (event) => {
  suggs.forEach((element) => {
    element.addEventListener("click", () => {
      anime.value = element.innerHTML;
      click();
    });
    element.addEventListener("mouseover", () => element.style.background = "rgb(150, 150, 255)");
    element.addEventListener("mouseout", () => element.style.background = "none");
  });

  //down
  if (event.which == "40") {
    if (i == 4) { i = 0 }
    i++;
    document.querySelectorAll('.sugg').forEach((el)=> el.style.background = 'none' )
    document.querySelector(`#sugg${i}`).style.background = "rgb(150, 150, 255)";
  }

  //up
  if (event.which == "38") {
    if (i == 1) { i = 5 }
    i--;
    document.querySelectorAll('.sugg').forEach((el)=> el.style.background = 'none')
    document.querySelector(`#sugg${i}`).style.background = "rgb(150, 150, 255)";
  }

  //enter
  if (event.which == "13") {
    anime.value = document.querySelector(`#sugg${i}`).innerHTML;
    click(); 
  }
});
//==============================================================================================================================================================
//watch anime
watch.addEventListener("click", click);

function click() {
  if (anime.value == "") {
    localStorage.site == "gogo" 
    ? chrome.tabs.update({ url: `https://gogoanime.gg` }) 
    : chrome.tabs.update({ url: `https://zoro.to/home` });
  } else {
    //gogoanime
    if (localStorage.site == "gogo") {
      let anime_obj = gogoList.find((el)=>el.name === anime.value)
      if (anime_obj != undefined) {
          let link = anime_obj.link;
          chrome.tabs.update({url: `${link}`});
      }
      else{ alert("Choose from the options below or write correct anime name"); }

    } else { 
      //zoro 
      let anime_obj = zoroList.find((el)=>el.name === anime.value)
      if (anime_obj != undefined) {
          let link = anime_obj.link;
          chrome.tabs.update({
            url: `${link.slice(0, 16)}watch/${link.slice(16)}`,
          });
      }
      else{ alert("Choose from the options below or write correct anime name"); }
    }
  }
}

//===============================================================================================================================================================================================

//personal icons functionality section

add.forEach((element)=>{
  let id_no = (element.id).slice(10)
  if ( localStorage.getItem(`id${id_no}`) == "changed") {
    document.querySelector(`.addimg${id_no}`).src = `./assets/images/letter-${localStorage.getItem(`item_Name${id_no}`).slice(0, 1).toLowerCase()}.png`;
    document.querySelector(`.txtnew${id_no}`).innerHTML = `${localStorage.getItem(`item_Name${id_no}`)}`;
    document.querySelector(`#parent-add${id_no}`).style.marginTop = "-25px";
    document.querySelector(`.minus${id_no}`).style.display = "block"
    document.querySelector(`.minus${id_no}`).addEventListener("click", () => {
      localStorage.setItem(`id${id_no}`,"unchanged");
      chrome.tabs.reload();
    })
    document.querySelector(`#add${id_no}`).addEventListener("click", () => {
      update_link = localStorage.getItem(`item_Link${id_no}`)
      if (update_link.slice(0, 5) == "https") {
        chrome.tabs.update({ url: `${update_link}` });
      } else if (update_link.slice(0, 3) == "www") {
        chrome.tabs.update({ url: `https://${update_link}` });
      } else {
        chrome.tabs.update({ url: `https://www.${update_link}` });
      }
    });
  }
  else { 
    document.querySelector(`#add${id_no}`).addEventListener("click", () => {
      add_Item.style.display = "flex";
      anime_name.style.opacity = "0.2";
      bg.style.opacity = "0.2";
      done.addEventListener("click", () => {
        if((item_Name.value).length == 0){
          alert("Enter Link Name ")
        }
        else if (/^[a-zA-Z()]+$/.test(item_Name.value[0])) {
          anime_name.style.opacity = "1";
          bg.style.opacity = "1";
          localStorage.setItem(`item_Name${id_no}`,item_Name.value);
          localStorage.setItem(`item_Link${id_no}`,item_Link.value);
          localStorage.setItem(`id${id_no}`,"changed");
          add_Item.style.display = "none";
          chrome.tabs.reload()
        } else {
          alert("Enter Link name starting with an Alphabet.");
        }
      });
    });
   }
})

//===================================================================================================================================================================
document.querySelector(".on-bg").addEventListener("click", () => {
  localStorage.bgimg = "on";
  chrome.tabs.reload();
});
document.querySelector(".off-bg").addEventListener("click", () => {
  localStorage.bgimg = "off";
  chrome.tabs.reload();
});
//============================

