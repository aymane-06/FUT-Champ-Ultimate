const FildPlayersCard=document.querySelectorAll('.player_card');

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
                console.log(json);
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
                console.log(json);
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
                console.log(json);
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
                console.log(json);
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

 dataInput.forEach((input,i)=>{
    
    input.addEventListener('input',()=>{
        console.log(input.value);
        
        if (input.value!=='') {
            document.querySelector(`#card-${input.name}`).textContent = input.value;
        }
    })
 })
 
 const selectInputs=document.querySelectorAll('input[role="combobox"]');

selectInputs.forEach(item=>{
    item.addEventListener('blur',()=>{
        const leaugeImg=document.querySelector('.leaugeImg');
        const leagueLogo=document.getElementById('leagueLogo');
    let leagueSrc=leaugeImg.getAttribute('src')
    leagueLogo.setAttribute('src',`${leagueSrc}`)
       
        const NationImg=document.querySelector('.NationImg');
        const NatioFlag=document.getElementById('NatioFlag');
        let NationSrc=NationImg.getAttribute('src');
        NatioFlag.setAttribute('src',`${NationSrc}`);

        const CardImg=document.querySelector('.CardImg');
        const cardBG=document.getElementById('cardBG');
        let CardSrc=CardImg.getAttribute('src');
        cardBG.setAttribute('src',`${CardSrc}`);
        
        const ClubImg=document.querySelector('.ClubImg');
        const teamLogo=document.getElementById('teamLogo');
        let ClubSrc=ClubImg.getAttribute('src');
        teamLogo.setAttribute('src',`${ClubSrc}`);
    })

})

const selectPost=document.getElementById('football-positions')
console.log(selectPost);


