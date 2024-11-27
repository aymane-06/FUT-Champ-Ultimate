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
            return `<div class="flex w-full">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
                    <h1>${item.name}</h1>
                    </div>`;
        },
        item: function(item, escape) {
            return `<div class="flex" style="display: flex;align-items: center;">
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
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
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
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
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
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
                    <img src="${item.img}" alt="" class="w-[20px] h-[20px]" >
                    <span>${item.name}</span>
                    </div>`;
        }
    },
});

const dataInput=Array.from(document.querySelectorAll('input'));
const playerNAme=document.getElementById('playerName');
const rating=document.getElementById('rating');
const post=document.getElementById('post');
const player_img=document.getElementById('player_img');
const leagueLogo=document.getElementById('leagueLogo');
const NatioFlag=document.getElementById('NatioFlag');
const teamLogo=document.getElementById('teamLogo');
const cardBG=document.getElementById('cardBG');
const PAC=document.getElementById('PAC');
const PAS=document.getElementById('PAS');
const DEF=document.getElementById('DEF');
const SHO=document.getElementById('SHO');
const DRI=document.getElementById('DRI');
const PHY=document.getElementById('PHY');



 dataInput.forEach(input=>{
    input.addEventListener('input',()=>{
        document.querySelector(`#card-${input.name}`).textContent = input.value
    })
 })

