const FildPlayersCard=document.querySelectorAll('.player_card');
function hovercard() {
    const FildPlayersCard = document.querySelectorAll('.player_card');
    
    FildPlayersCard.forEach(playerCard => {
        const bgImg = playerCard.querySelector('img');
        const type = playerCard.querySelector('.typ');
        
        playerCard.addEventListener('mouseenter', () => {
            playerCard.style.zIndex = '2';
            playerCard.style.cursor = 'pointer';
            bgImg.style.filter = 'drop-shadow(0px 0px 40px #417560)';
            type.style.filter = 'drop-shadow(0px 10px #458ea9)';
        });
        
        playerCard.addEventListener('mouseleave', () => {
            playerCard.style.zIndex = '0';
            bgImg.style.filter = 'none';
            type.style.filter = 'none';
        });
    });

    // Add functionality for created cards
    const createdCards = document.querySelectorAll('#players_sub .data_container, .player_card .data_container');
    
    createdCards.forEach(card => {
        const cardContainer = card.closest('.player_card, .data_container');
        // console.log(cardContainer);
        
        
        // Create edit and delete buttons container
        const editDeleteContainer = document.createElement('div');
        editDeleteContainer.classList.add(
            'edit-delete-container', 
            'hidden', 
            'absolute', 
            'top-0', 
            'right-0', 
            'flex', 
            'gap-2', 
            'p-2', 
            'z-50'
        );
        
        // Create edit button
        const editButton = document.createElement('button');
        const editIcon = document.createElement('i');
        editIcon.classList.add('fas', 'fa-edit', 'text-green-500');
        editButton.appendChild(editIcon);
        editButton.classList.add(
            'edit-btn', 
            'bg-white', 
            'rounded-full', 
            'p-2', 
            'hover:bg-green-100', 
            'z-50'
        );
        
        // Create delete button
        const deleteButton = document.createElement('button');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash', 'text-red-500');
        deleteButton.appendChild(deleteIcon);
        deleteButton.classList.add(
            'delete-btn', 
            'bg-white', 
            'rounded-full', 
            'p-2', 
            'hover:bg-red-100', 
            'z-50'
        );
        
        editDeleteContainer.appendChild(editButton);
        editDeleteContainer.appendChild(deleteButton);
        
        cardContainer.addEventListener('mouseenter', (e) => {
            const bgImg = cardContainer.querySelector('img');
            const type = cardContainer.querySelector('.typ');
            
            cardContainer.style.zIndex = '2';
            cardContainer.style.cursor = 'pointer';
            
            if (bgImg) {
                bgImg.style.filter = 'drop-shadow(0px 0px 40px #417560)';
            }
            
            if (type) {
                type.style.filter = 'drop-shadow(0px 10px #458ea9)';
            }
            
            cardContainer.appendChild(editDeleteContainer);
            editDeleteContainer.classList.remove('hidden');
        });
        
        cardContainer.addEventListener('mouseleave', (e) => {
            const bgImg = cardContainer.querySelector('img');
            const type = cardContainer.querySelector('.typ');
            
            cardContainer.style.zIndex = '0';
            
                bgImg.style.filter = 'none';
            
                type.style.filter = 'none';
            
            
            // Hide edit/delete buttons
            editDeleteContainer.classList.add('hidden');
        });
        
        // Edit button functionality
        editButton.addEventListener('click', () => {
            // Open the add player section with current card's data
            ShowAdd_playerSection();
            checkClickingEvent=false;
            cardContainer.parentNode.style.width='132%'
            // Collect data using textContent and getAttribute
            const cardData = {
                name: card.querySelector('#card-name').textContent,
                position: card.querySelector('#post').textContent,
                img: card.querySelector('#player_img').getAttribute('src'),
                pac: card.querySelector('#card-pac').textContent,
                sho: card.querySelector('#card-sho').textContent,
                pas: card.querySelector('#card-pas').textContent,
                dri: card.querySelector('#card-dri').textContent,
                def: card.querySelector('#card-def').textContent,
                phy: card.querySelector('#card-phy').textContent
            };
            
            // Populate form inputs
            document.querySelector('input[name="name"]').value = cardData.name;
            
            // Set position in select
            const positionSelect = document.getElementById('football-positions');
            Array.from(positionSelect.options).forEach(option => {
                if (option.value === cardData.position) {
                    positionSelect.value = option.value;
                }
            });
            
            document.querySelector('input[name="img"]').value = cardData.img;
            
            // Populate stats
            document.querySelector('input[name="pac"]').value = cardData.pac;
            document.querySelector('input[name="sho"]').value = cardData.sho;
            document.querySelector('input[name="pas"]').value = cardData.pas;
            document.querySelector('input[name="dri"]').value = cardData.dri;
            document.querySelector('input[name="def"]').value = cardData.def;
            document.querySelector('input[name="phy"]').value = cardData.phy;
            
            // Trigger any necessary updates
            const statsInputs = document.querySelectorAll('input[type="number"]');
            statsInputs.forEach(inp => {
                inp.dispatchEvent(new Event('blur'));
            });
            
            // Remove the original card from storage and DOM
           

            removeCardFromStorage(cardContainer);
            
        
        });
        
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log(cardContainer);
            
            const cardName = cardContainer.querySelector('#card-name').textContent;
            
            cardStorg = cardStorg.filter(cardHTML => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cardHTML;
                const nameElement = tempDiv.querySelector('#card-name');
                return nameElement && nameElement.textContent !== cardName;
            });
            
            localStorage.setItem('storg', JSON.stringify(cardStorg));
        
            // Find if this card is in the field section
            const fieldCard = cardContainer.closest('.player_card');
            if (fieldCard) {
                resetCardToDefault(fieldCard);
            } else {
                cardContainer.parentNode.remove();
            }
        });
        

    });
}

function removeCardFromStorage(cardContainer) {
    if(checkClickingEvent){
    // Find the card name to remove
    const cardName = cardContainer.querySelector('#card-name').textContent;
    
    // Filter out the card from storage
    cardStorg = cardStorg.filter(cardHTML => {
        // Create a temporary div to parse the HTML string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardHTML;
        
        // Check if the name matches
        const nameElement = tempDiv.querySelector('#card-name');
        return nameElement && nameElement.textContent !== cardName;
    });
    
    // Update localStorage
    localStorage.setItem('storg', JSON.stringify(cardStorg));
    
    // Remove from DOM
    const cardToRemove = cardContainer.closest('.player_card, .data_container');
    if (cardToRemove) {
        cardToRemove.remove();
    }
}
}
function resetCardToDefault(cardContainer) {
    // Find the position type
    const positionType = cardContainer.querySelector('.typ').textContent;
    
    // Find the original placeholder card for this position
    const originalPlaceholderCard = Array.from(document.querySelectorAll('.player_card'))
        .find(card => 
            card.querySelector('.typ').textContent === positionType && 
            card.querySelector('#card-name') === null
        );
    
    if (originalPlaceholderCard) {
        // Clone the original placeholder
        const placeholderClone = originalPlaceholderCard.cloneNode(true);
        
        // Replace the current card with the placeholder clone
        cardContainer.parentNode.replaceChild(placeholderClone, cardContainer);
        
        // Re-apply hover effect
        hovercard();
    }
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
// console.log(cardStorg.length);

let playerInFild=0;

const filde=document.getElementById('filde');
const cardsFild=filde.querySelectorAll('.player_card');
function ShowCards() {
    for(let i = 0; i < cardStorg.length; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardStorg[i];
        
        const showCard = tempDiv.firstChild;
        showCard.style.width = '135%';
        
        if (playerInFild < 11 && cardsFild[i]) {
            cardsFild[i].innerHTML = '';
            cardsFild[i].appendChild(showCard);
            playerInFild++;
        } else {
            ShowCard.style.margin='0px'
            showCard.style.width='38%'
            players_sub.appendChild(showCard);
        }
        
        hovercard();
    }
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

// console.log(cardsFild);

// console.log(addButton);

// Define generateCardonclick OUTSIDE the GenerateCard function
let currentTargetDiv = null;
let currentWidth = null;
const clearcrad=0;
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
        if(currentTargetDiv==selectedCard){
            currentTargetDiv.innerHTML = '';
            selectedCard.style.width='18%';
            checkClickingEvent=false;
            
            
        }
        checkClickingEvent=1;
        currentTargetDiv.appendChild(cardclone);
        form.reset();
        
        const item = addPlayerSection.querySelectorAll(".item");
        item.forEach(it => {
            it.innerHTML = '';
        });
        
        addPlayer();
        cardStorg.push(cardclone.outerHTML);
        // cardTemplate.remove();
        // ShowCard.appendChild(CleanCard);
        
        localStorage.setItem('storg', JSON.stringify(cardStorg));
        colorChanger();
        CloseAdd_playerSection();
        hovercard();
        clearcrad++
        return checkClickingEvent=true;
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
let selectedCard;
let checkClickingEvent;
cardsFild.forEach(card => {
    card.addEventListener('click', (event) => {
        card.style.cssText = 'z-index:0;';
        card.style.margin='0px';
        ShowAdd_playerSection();
        checkClickingEvent=false
        selectedCard=event.currentTarget;
        GenerateCard(selectedCard, 100);
        
    
    });
});

const addPlayerBtn = document.getElementById('addPlayerBtn');
addPlayerBtn.addEventListener('click', () => {
    ShowAdd_playerSection();
    checkClickingEvent=false
    GenerateCard(players_sub, 38);
    console.log('in');
});
