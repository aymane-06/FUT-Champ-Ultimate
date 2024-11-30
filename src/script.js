const FildPlayersCard=document.querySelectorAll('.player_card');
function hovercard(){
FildPlayersCard.forEach(playerCard=>{
    const bgImg=playerCard.querySelector('img');
    const type=playerCard.querySelector('.typ');
    playerCard.addEventListener('mouseenter',()=>{
        playerCard.style.zIndex = '2';
        playerCard.style.cursor = 'pointer';
        bgImg.style.filter = 'drop-shadow(0px 0px 40px #417560)';
        type.style.filter='drop-shadow(0px 10px #458ea9)';
        

    })
    playerCard.addEventListener('mouseleave',()=>{
        playerCard.style.zIndex = '0';
        bgImg.style.filter = 'none';
        type.style.filter='none';
       
    })

})
// console.log('g');

}
hovercard();

new TomSelect('#select-league',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
        fetch("./leauges.json")
            .then(response => response.json())
            .then(json => {
                callback(json);
                // console.log(json);
            }).catch(()=>{
                callback();
            });

    },
    // custom rendering functions for options and items
    render: {
        option: function(item, escape) {
            return `<div class="flex w-full clicked">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
                    <h1>${item.name}</h1>
                    </div>`;
        },
        item: function(item, escape) {
            return `<div class="flex " style="display: flex;align-items: center;">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px] leaugeImg" >
                    <span>${item.name}</span>
                    </div>`;
        }
    },
});
new TomSelect('#select-nation',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
        fetch("./nation.json")
            .then(response => response.json())
            .then(json => {
                callback(json);
                // console.log(json);
            }).catch(()=>{
                callback();
            });

    },
    // custom rendering functions for options and items
    render: {
        option: function(item, escape) {
            return `<div class="flex w-full">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
                    <h1>${item.name}</h1>
                    </div>`;
        },
        item: function(item, escape) {
            return `<div class="flex" style="display: flex;align-items: center;">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px] NationImg" >
                    <span>${item.name}</span>
                    </div>`;
        }
    },
});

new TomSelect('#select-version',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
        fetch("./card.json")
            .then(response => response.json())
            .then(json => {
                callback(json);
                // console.log(json);
            }).catch(()=>{
                callback();
            });

    },
    // custom rendering functions for options and items
    render: {
        option: function(item, escape) {
            return `<div class="flex w-full">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
                    <h1>${item.name}</h1>
                    </div>`;
        },
        item: function(item, escape) {
            return `<div class="flex" style="display: flex;align-items: center;">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px] CardImg" >
                    <span>${item.name}</span>
                    </div>`;
        }
    },
});
new TomSelect('#select-club',{
    valueField: 'img',
    labelField: 'name',
    searchField: 'name',
    // fetch remote data
    load: function(query, callback) {
        fetch("./teams.json")
            .then(response => response.json())
            .then(json => {
                callback(json);
                // console.log(json);
            }).catch(()=>{
                callback();
            });

    },
    // custom rendering functions for options and items
    render: {
        option: function(item, escape) {
            return `<div class="flex w-full">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
                    <h1>${item.name}</h1>
                    </div>`;
        },
        item: function(item, escape) {
            return `<div class="flex" style="display: flex;align-items: center;">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px] ClubImg" >
                    <span>${item.name}</span>
                    </div>`;
        }
    },
});


const statsInp=document.querySelectorAll('input[type="number"]');
const Rating=document.getElementById('card-rating');



let totalRating=0;
statsInp.forEach(inp=>{
    inp.addEventListener("blur",()=>{
        totalRating=0
      for(let i=0;i<statsInp.length;i++){
        const value=parseInt(statsInp[i].value)||0
        totalRating+=value;
      }
      Rating.textContent=`${parseInt(totalRating/6)}`;
    })
})

const dataInput=Array.from(document.querySelectorAll('input'));
// console.log(dataInput);
const addPlayerSection = document.getElementById('add_player');
const selectInputs=document.querySelectorAll('input[role="combobox"]');
function addPlayer(){
    dataInput.forEach((input,i)=>{
        
        input.addEventListener('input',()=>{
            // console.log(input.value);
            
            if (input.value!=='') {
                addPlayerSection.querySelector(`#card-${input.name}`).textContent = input.value;
            }
        })
    })
 


selectInputs.forEach(item=>{
    item.addEventListener('blur',()=>{
        const leaugeImg=document.querySelector('.leaugeImg');
        const leagueLogo=addPlayerSection.querySelector('#leagueLogo');
        // console.log(leagueLogo);
    let leagueSrc=leaugeImg.getAttribute('src')
    leagueLogo.setAttribute('src',`${leagueSrc}`)
       
        const NationImg=document.querySelector('.NationImg');
        const NatioFlag=addPlayerSection.querySelector('#NatioFlag');
        // console.log(NatioFlag);
        let NationSrc=NationImg.getAttribute('src');
        NatioFlag.setAttribute('src',`${NationSrc}`);

        const CardImg=document.querySelector('.CardImg');
        const cardBG=addPlayerSection.querySelector('#cardBG');
        // console.log(cardBG);
        
        let CardSrc=CardImg.getAttribute('src');
        cardBG.setAttribute('src',`${CardSrc}`);
        
        const ClubImg=document.querySelector('.ClubImg');
        const teamLogo=addPlayerSection.querySelector('#teamLogo');
        let ClubSrc=ClubImg.getAttribute('src');
        teamLogo.setAttribute('src',`${ClubSrc}`);
    })

})

const selectPost=document.getElementById('football-positions');
selectPost.addEventListener('change',()=>{
    const post=addPlayerSection.querySelector('#post');
    post.textContent=`${selectPost.value}`
    const Spans=addPlayerSection.querySelectorAll('.cStats');
    // console.log(Spans);
    
    const statslabels=document.querySelectorAll('.stats');
    // console.log(statslabels);
    if(selectPost.value=='GK'){
        
        
                statslabels[0].textContent='DIV';
                Spans[0].textContent='DIV';

                statslabels[1].textContent='HAN';
                Spans[1].textContent='REF';

                statslabels[2].textContent='KIC';
                 Spans[2].textContent='HAN';

                statslabels[3].textContent='REF';
                Spans[3].textContent='SPD';

                statslabels[4].textContent='SPD';
                Spans[4].textContent='KIC';

                statslabels[5].textContent='POS';
                 Spans[5].textContent='POS';
                
                
                

            }else{
                statslabels[0].textContent='PAC';
                Spans[0].textContent='PAC';

                statslabels[1].textContent='PAS';
                Spans[1].textContent='SHO';

                statslabels[2].textContent='DEF';
                 Spans[2].textContent='PAS';

                statslabels[3].textContent='SHO';
                Spans[3].textContent='DRI';

                statslabels[4].textContent='DRI';
                Spans[4].textContent='DEF';

                statslabels[5].textContent='PHY'   ;
                 Spans[5].textContent='PHY';
            }
            
        
        
    
    
})

const imgInput=document.querySelector('input[name="img"]');
const player_img=addPlayerSection.querySelector("#player_img");
// console.log(player_img);

imgInput.addEventListener('input',()=>{
    player_img.setAttribute('src',`${imgInput.value}`);
})

}
addPlayer();



const addButton=document.getElementById('btn');
const cardTemplate=addPlayerSection.querySelector('#cardTemplate');
// console.log(cardTemplate);

const players_sub=document.getElementById('players_sub');
const data_container=document.getElementById('data_container');
const form=document.getElementById('form');
const ShowCard=document.getElementById('cardplace')

let cardStorg=JSON.parse(localStorage.getItem('storg'))||[];
function ShowCards() {
    cardStorg.forEach(cardHtml => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHtml;
        const showCard = tempDiv.firstChild;
        showCard.style.width='38%'
        players_sub.appendChild(showCard);
    });
}
ShowCards();
let cardclone;
let CleanCard=cardTemplate.cloneNode(true);
// console.log(CleanCard);


// addButton.addEventListener('click',()=>{
//     if(dataInput[0].value&&dataInput[1].value&&dataInput[6].value&&dataInput[7].value&&dataInput[8].value&&dataInput[9].value&&dataInput[10].value&&dataInput[11].value){
//     cardclone=cardTemplate.cloneNode(true);
//     cardclone.style.width='38%';
//     const dataContainer = cardclone.querySelector('.data_container');
//     dataContainer.style.gap='86px';
//     cardclone.querySelector('.rating').style.cssText='top: 55px; right: 47px;';
//     cardclone.querySelector('#card-name').style.cssText='font-size:20px;';
//     cardclone.querySelector('#stats').style.cssText='font-size:11px;';
//     hovercard();
//     players_sub.appendChild(cardclone);
//     form.reset();
//     const item=addPlayerSection.querySelectorAll(".item");
//     item.forEach(it=>{
//         it.remove();
//     });
//     addPlayer();

//     cardStorg.push(cardclone.outerHTML);

//     cardTemplate.remove();
//     ShowCard.appendChild(CleanCard);
//     // console.log(cardStorg);
    
//     localStorage.setItem('storg',JSON.stringify(cardStorg));
//     colorChanger();
//     CloseAdd_playerSection();
// }
// })




// console.log(CardText);
function colorChanger(){
    const colorInput=document.getElementById('colorInput');
const CardText=addPlayerSection.querySelectorAll('.color');
colorInput.addEventListener('input',()=>{
    // console.log(colorInput.value);
    CardText.forEach(text=>{
        console.log(text);
        
        text.style.color=`${colorInput.value}`;
    })
})
}
colorChanger();


function ShowAdd_playerSection() {
    addPlayerSection.classList.remove('hidden');
    addPlayerSection.classList.add('flex');
}

function CloseAdd_playerSection(){ 
    addPlayerSection.classList.remove('flex');
    addPlayerSection.classList.add('hidden');
}


// card filde fill up:

const filde=document.getElementById('filde');
const cardsFild=filde.querySelectorAll('.player_card');
// console.log(cardsFild);

// console.log(addButton);

// Define generateCardonclick OUTSIDE the GenerateCard function
let currentTargetDiv = null;
let currentWidth = null;

function generateCardonclick() {
    if (dataInput[0].value && dataInput[1].value && dataInput[6].value && 
        dataInput[7].value && dataInput[8].value && dataInput[9].value && 
        dataInput[10].value && dataInput[11].value) {
        
        const cardclone = cardTemplate.cloneNode(true);
        cardclone.style.width = `${currentWidth}%`;
        
        const dataContainer = cardclone.querySelector('.data_container');
        dataContainer.style.gap = '86px';
        cardclone.querySelector('.rating').style.cssText = 'top: 55px; right: 47px;';
        cardclone.querySelector('#card-name').style.cssText = 'font-size:20px;';
        cardclone.querySelector('#stats').style.cssText = 'font-size:11px;';
        
        hovercard();
        currentTargetDiv.appendChild(cardclone);
        form.reset();
        
        const item = addPlayerSection.querySelectorAll(".item");
        item.forEach(it => {
            it.innerHTML = '';
        });
        
        addPlayer();
        cardStorg.push(cardclone.outerHTML);
        cardTemplate.remove();
        ShowCard.appendChild(CleanCard);
        
        localStorage.setItem('storg', JSON.stringify(cardStorg));
        colorChanger();
        CloseAdd_playerSection();
    }
}

// Remove previous listener and add new one
addButton.removeEventListener('click', generateCardonclick);
addButton.addEventListener('click', generateCardonclick);

function GenerateCard(div, width) {
    console.log(div);
    
    // Update the current target div and width
    currentTargetDiv = div;
    currentWidth = width;
}

cardsFild.forEach(card => {
    card.addEventListener('click', (event) => {
        card.innerHTML = '';
        card.style.cssText = 'z-index:0;';
        ShowAdd_playerSection();
        GenerateCard(event.currentTarget, 100);
    });
});

const addPlayerBtn = document.getElementById('addPlayerBtn');
addPlayerBtn.addEventListener('click', () => {
    ShowAdd_playerSection();
    GenerateCard(players_sub, 38);
    console.log('in');
});
