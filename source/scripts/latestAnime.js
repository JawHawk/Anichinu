const openSectionBtn = document.createElement('button')
openSectionBtn.className = 'openSection'
openSectionBtn.innerText = '<'
document.body.appendChild(openSectionBtn)

fetch("https://gogoanime.consumet.stream/recent-release")
  .then((response) => response.json())
  .then((animelist) => display(animelist));

function display(animelist){
    const parentDiv = document.createElement('div');
    parentDiv.className = 'parentDiv';

    const heading = document.createElement('h1');
    heading.className = 'parentDivHeading'
    heading.innerText = 'Latest Episodes'
    parentDiv.appendChild(heading)

    for(let i = 0; i < 12; i++){
        const anime = animelist[i]
        const childDiv = document.createElement('div')
        childDiv.className = 'childDiv';

        const {animeImg, animeId, episodeNum, episodeUrl} = anime;

        var img = document.createElement('img');
        img.src = animeImg;
        
        var p1 = document.createElement('p');
        p1.style.padding = '0 5px'
        p1.innerHTML = animeId;

        var p2 = document.createElement('p');
        p2.innerText = 'Episode: ' + episodeNum

        childDiv.appendChild(img)
        childDiv.appendChild(p1);
        childDiv.appendChild(p2);
        
        childDiv.addEventListener('click',()=>{
          chrome.tabs.update({ url: episodeUrl });
        })
        parentDiv.appendChild(childDiv);
    }
    parentDiv.style.display = 'none'
    document.body.appendChild(parentDiv);

    //open and close
    openSectionBtn.addEventListener('click',()=>{
      if ( parentDiv.style.display == 'none'){
        parentDiv.style.display = 'grid'
        openSectionBtn.innerText = '>'
        openSectionBtn.style.right = '480px'
      } else {
        parentDiv.style.display = 'none'
        openSectionBtn.innerText = '<'
        openSectionBtn.style.right = '0'
      }
    }) 
    window.addEventListener('mouseup',function(event){
      if(event.target != parentDiv && event.target.parentNode != parentDiv && event.target != openSectionBtn){
        parentDiv.style.display = 'none'
        openSectionBtn.innerText = '<'
        openSectionBtn.style.right = '0'
      }
    });
}



