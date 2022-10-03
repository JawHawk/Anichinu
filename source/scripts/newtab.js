//document elements
let watch = document.querySelector('.watch');
let anime = document.getElementById('name');
let ep = document.getElementById('ep');
let nsfw = document.querySelector('.nsfw')
let sfw = document.querySelector('.sfw')
let anime_name = document.querySelector('.anime-name')
let add = document.querySelectorAll('.add')
let add_Item = document.querySelector('.add-item')
let item_Name = document.querySelector('.item-name')
let item_Link = document.querySelector('.item-link')
let done = document.querySelector('.done')
let minus1 = document.querySelector('.minus1')
let minus2 = document.querySelector('.minus2')
let minus3 = document.querySelector('.minus3')
let add1 = document.querySelector('#add1')
let add2 = document.querySelector('#add2')
let add3 = document.querySelector('#add3')
let dropdown = document.querySelector('#dropdown')

let animeList, zoroList;
fetch("../anime_data/AnimeList.json").then(res => res.json()).then(data => animeList = data)
fetch("../anime_data/zoroList.json").then(res => res.json()).then(data => zoroList = data.zoroList)



// theme
if (localStorage.bg == "black") {
  document.body.style.background = "black"
  document.querySelector('.suggestion').style.color = "white"
  document.querySelector('.input').style.border = "none"
  document.querySelector('.watch').style.marginTop = "6px"
  document.querySelector('.personal').style.color = "rgb(255, 199, 193)"
  document.querySelector('.txtyou').style.color = "rgb(255, 199, 193)"
  document.querySelector('.txtgmail').style.color = "rgb(255, 199, 193)"
  document.querySelector('.txtdrive').style.color = "rgb(255, 199, 193)"
} else {
  document.body.style.background = "white"
  document.querySelector('.credits').style.color = "black"
  for (let i = 1; i < 5; i++) { document.querySelector(`.per_links${i}`).style.color = "black" }

  // anime_name.classList.add('.dark-theme')
  // anime_name.classList.remove('.dark-theme')
}

//========//
function category_changer() {
  sfw_categories = ["uniform", "maid", "waifu", "oppai", "marin-kitagawa", "mori-calliope", "raiden-shogun", "selfies"]
  nsfw_categories = ["uniform", "maid", "waifu", "oppai", "selfies", "ass", "hentai", "milf", "oral", "paizuri", "ero", "ecchi"]
  if (localStorage.choice == "true") {
    for (let i = 1; i < 13; i++) {
      document.querySelector(`#option${i}`).innerHTML = nsfw_categories[i - 1]
    }
  } else {
    for (let i = 1; i < 13; i++) {
      document.querySelector(`#option${i}`).innerHTML = sfw_categories[i - 1]
      if (sfw_categories[i - 1] == null) {
        document.querySelector(`#option${i}`).style.display = "none"
      }
    }
  }
}
category_changer();

document.querySelector('#option0').innerHTML = localStorage.category;
dropdown.addEventListener('change', () => {
  let s;
  s = dropdown.options[dropdown.selectedIndex].text;
  localStorage.category = s
  chrome.tabs.reload()
})

// nsfw / sfw

if (localStorage.bgimg == "off") {
  document.querySelector('.off-bg').style.border = "2px solid blue"
  document.querySelector(".bg").display = "none"
  anime_name.style.left = "50%"
  anime_name.style.transform = "translateX(" + (-50) + "%)" + " translateY(" + (-50) + "%)"
} else {
  document.querySelector('.on-bg').style.border = "2px solid blue"
  document.getElementById('bg').style.display = "block"
  if (localStorage.choice == "true") {
    const getUrl = async () => {
      const res = await fetch(`https://api.waifu.im/random/?selected_tags=${localStorage.category}&is_nsfw=true`)
      const json = await res.json();

      document.querySelector("#bg").src = json.images[0].url;
    };
    getUrl();
  }
  else {
    const getUrl = async () => {
      if (localStorage.choice == undefined) {
        localStorage.choice = "waifu"
        chrome.tabs.reload()
      }
      //   const response = await fetch("https://api.waifu.pics/sfw/waifu");
      //   const json = await response.json();
      //  document.querySelector("#bg").src = json.url;
      const res = await fetch(`https://api.waifu.im/random/?selected_tags=${localStorage.category}&is_nsfw=false`)
      const json = await res.json();
      document.querySelector("#bg").src = json.images[0].url;
    };
    getUrl();
  }
}

// Input Suggestions , site preference : zoro / gogo

anime.addEventListener('keyup', () => {
  // let final_list = []
  // document.querySelector('.suggestion').style.display = "block"
  if (localStorage.site == "gogo") {
    let filteredList = animeList.AnimeList.filter(item =>
      item.includes(anime.value))
    var i = 0
    const suggs = document.querySelectorAll('.sugg')
    suggs.forEach(element => {
      element.innerHTML = filteredList[i]
      if (element.innerHTML == "undefined") {
        element.style.display = "none"
      } else { element.style.display = "block" }
      i++;
    })

  } else {
    let filteredList = zoroList.filter(item => item.name.includes(anime.value))
    var i = 0
    const suggs = document.querySelectorAll('.sugg')
    suggs.forEach(element => {
      element.innerHTML = filteredList[i].name
      if (element.innerHTML == "undefined") {
        element.style.display = "none"
      } else { element.style.display = "block" }
      i++;
    })
  }
})

//keyboard suggestions and bg
var i = 0;

anime.addEventListener('keydown', (event) => {

  const suggs = document.querySelectorAll('.sugg')
  suggs.forEach(element => {
    element.addEventListener('click', (e) => {
      anime.value = element.innerHTML
      click()
    })
    element.addEventListener('mouseover', () => {
      element.style.background = "rgb(150, 150, 255)"
    })
    element.addEventListener('mouseout', () => {
      element.style.background = "none"
    })
  })

  //down
  if (event.which == "40") {
    if (i == 4) { i = 0 }
    i++;
    for (x = 1; x < 5; x++) { document.querySelector(`#sugg${x}`).style.background = "none"; }
    document.querySelector(`#sugg${i}`).style.background = "rgb(150, 150, 255)";
    // document.querySelector(`#sugg${i}`).style.background = "rgb(12, 69, 107)";
  }

  //up
  if (event.which == "38") {
    if (i == 1) { i = 5 }
    i--;
    for (x = 1; x < 5; x++) { document.querySelector(`#sugg${x}`).style.background = "none"; }
    document.querySelector(`#sugg${i}`).style.background = "rgb(150, 150, 255)";
  }

  //enter
  if (event.which == "13") {
    sel_sugg = document.querySelector(`#sugg${i}`)
    anime.value = sel_sugg.innerHTML;
    click();
  }
})

//==========================================================// watch
watch.addEventListener('click', click)

function click() {
  let anime_name = String(anime.value);
  if (anime_name == "") {
    if (localStorage.site == "gogo") {
      chrome.tabs.update({ url: `https://gogoanime.gg` })
    }
    else {
      chrome.tabs.update({ url: `https://zoro.to` })
    }
  }
  else {
    if (localStorage.site == "gogo") {
      anime_name = anime_name.replaceAll(' ', '-')
      anime_name = anime_name.replaceAll('.', '')
      anime_name = anime_name.replaceAll(':', '')
      anime_name = anime_name.replaceAll('(', '-')
      anime_name = anime_name.replaceAll(')', '')
      anime_name = anime_name.replaceAll('/', '')
      anime_name = anime_name.replaceAll('---', '-')
      anime_name = anime_name.replaceAll('--', '-')

      episode = String(ep.value)
      if (ep.value) {
        chrome.tabs.update({ url: `https://gogoanime.wiki/${anime_name}-episode-${episode}` })
      } else {
        chrome.tabs.update({ url: `https://gogoanime.wiki/category/${anime_name}` })
      }
    }
    else {
      for (let i = 0; i < zoroList.length; i++) {
        if (zoroList[i].name == anime.value) {
          index = i;
          break;
        }
      }
    }
  }
  console.log(index)
  let link = zoroList[index].link
  console.log(link.slice(0, 16) + "watch/" + link.slice(16))
  chrome.tabs.update({ url: `${link.slice(0, 16)}watch/${link.slice(16)}` })

}

//===========================================================//

//personal icons functionality section

//add1 element
if (localStorage.id1 == "changed") {
  document.querySelector('.addimg1').src = `./assets/images/letter-${(localStorage.item_Name1.slice(0, 1)).toLowerCase()}.png`
  document.querySelector('.txtnew1').innerHTML = `${localStorage.item_Name1}`
  document.querySelector('#parent-add1').style.marginTop = "-25px"

  minus1.style.display = "block"
  minus1.addEventListener('click', () => {
    localStorage.id1 = "unchanged"
    chrome.tabs.reload()
  })
  document.querySelector('#add1').addEventListener('click', () => {
    if (localStorage.item_Link1.slice(0, 5) == "https") {
      chrome.tabs.update({ url: `${localStorage.item_Link1}` })
    } else if (localStorage.item_Link1.slice(0, 3) == "www") {
      chrome.tabs.update({ url: `https://${localStorage.item_Link1}` })
    } else {
      chrome.tabs.update({ url: `https://www.${localStorage.item_Link1}` })
    }
  })
} else {
  document.querySelector(`#add1`).addEventListener('click', () => {
    add_Item.style.display = "flex"
    anime_name.style.opacity = "0.2"
    bg.style.opacity = "0.2"
    done.addEventListener('click', () => {
      if (/^[a-zA-Z()]+$/.test((item_Name.value)[0])) {
        anime_name.style.opacity = "1"
        bg.style.opacity = "1"
        localStorage.item_Name1 = item_Name.value
        localStorage.item_Link1 = item_Link.value
        localStorage.id1 = "changed"
        add_Item.style.display = "none"
        chrome.tabs.reload()
      }
      else {
        alert("Enter Link name starting with an Alphabet.")
        chrome.tabs.reload()
      }
    })
  })

}

//add2 element
if (localStorage.id2 == "changed") {
  document.querySelector('.addimg2').src = `./assets/images/letter-${(localStorage.item_Name2.slice(0, 1)).toLowerCase()}.png`
  document.querySelector('.txtnew2').innerHTML = `${localStorage.item_Name2}`
  document.querySelector('#parent-add2').style.marginTop = "-25px"

  minus2.style.display = "block"
  minus2.addEventListener('click', () => {
    localStorage.id2 = "unchanged"
    chrome.tabs.reload()
  })

  document.querySelector('#add2').addEventListener('click', () => {
    if (localStorage.item_Link2.slice(0, 5) == "https") {
      chrome.tabs.update({ url: `${localStorage.item_Link2}` })
    } else if (localStorage.item_Link2.slice(0, 3) == "www") {
      chrome.tabs.update({ url: `https://${localStorage.item_Link2}` })
    } else {
      chrome.tabs.update({ url: `https://www.${localStorage.item_Link2}` })
    }
  })
} else {
  document.querySelector(`#add2`).addEventListener('click', () => {
    add_Item.style.display = "flex"
    anime_name.style.opacity = "0.2"
    bg.style.opacity = "0.2"
    done.addEventListener('click', () => {
      if (/^[a-zA-Z()]+$/.test((item_Name.value)[0])) {
        anime_name.style.opacity = "1"
        bg.style.opacity = "1"
        localStorage.item_Name2 = item_Name.value
        localStorage.item_Link2 = item_Link.value
        localStorage.id2 = "changed"
        add_Item.style.display = "none"
        chrome.tabs.reload()
      } else {
        alert("Enter Link name starting with an Alphabet.")
        chrome.tabs.reload()
      }

    })
  })

}

//add3 element
if (localStorage.id3 == "changed") {
  document.querySelector('.addimg3').src = `./assets/images/letter-${(localStorage.item_Name3.slice(0, 1)).toLowerCase()}.png`
  document.querySelector('.txtnew3').innerHTML = `${localStorage.item_Name3}`
  document.querySelector('#parent-add3').style.marginTop = "-25px"

  minus3.style.display = "block"
  minus3.addEventListener('click', () => {
    localStorage.id3 = "unchanged"
    chrome.tabs.reload()
  })

  document.querySelector('#add3').addEventListener('click', () => {
    if (localStorage.item_Link3.slice(0, 5) == "https") {
      chrome.tabs.update({ url: `${localStorage.item_Link3}` })
    } else if (localStorage.item_Link3.slice(0, 3) == "www") {
      chrome.tabs.update({ url: `https://${localStorage.item_Link3}` })
    } else {
      chrome.tabs.update({ url: `https://www.${localStorage.item_Link3}` })
    }
  })
} else {
  document.querySelector(`#add3`).addEventListener('click', () => {
    add_Item.style.display = "flex"
    anime_name.style.opacity = "0.2"
    bg.style.opacity = "0.2"
    done.addEventListener('click', () => {
      if (/^[a-zA-Z()]+$/.test((item_Name.value)[0])) {
        anime_name.style.opacity = "1"
        bg.style.opacity = "1"
        localStorage.item_Name3 = item_Name.value
        localStorage.item_Link3 = item_Link.value
        localStorage.id3 = "changed"
        add_Item.style.display = "none"
        chrome.tabs.reload()
      } else {
        alert("Enter Link name starting with an Alphabet.")
        chrome.tabs.reload()
      }

    })
  })
}
//=====================================================//
document.querySelector('.on-bg').addEventListener('click', () => {
  localStorage.bgimg = "on"
  chrome.tabs.reload()
})
console.log(localStorage.bgimg)
document.querySelector('.off-bg').addEventListener('click', () => {
  localStorage.bgimg = "off"
  chrome.tabs.reload()
})


//============================
if (localStorage.firstTime != "false") {
  localStorage.bgimg = "on";
  localStorage.choice = "false"
  localStorage.category = "waifu";
  localStorage.firstTime = "false";
}
