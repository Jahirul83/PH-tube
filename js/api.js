// console.log('api.js');
/* fetch('https://openapi.programming-hero.com/api/videos/categories')
.then(res => res.json())
.then(data => console.log(data)); */

const loadBtn = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');

    const data = await res.json();
    // console.log(data.data);
    btns = data.data;

    const BtnDiv = document.getElementById('category-btn');

    console.log(btns);
    displayBtn(btns);
    ReturnCategoryId(btns);
}


const loadCard = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000');

    const data = await res.json();

    const cardData = data.data;
    const cardPostDateMap = data.data.map(returnFunction);

    // console.log(data.data);
    console.log(cardPostDateMap);
    
    displayCards(cardData);

}

loadCard();

const displayBtn = (buttons) => {

    const BtnDiv = document.getElementById('category-btn');

    for (const button of buttons) {
        // console.log(button);

        const btns = document.createElement('button');
        btns.innerHTML = `<button onclick="ReturnCategoryId(${buttons.category_id})" class="btn mr-2 hover:bg-red-500 hover:text-white">${button.category}</button>`;
        BtnDiv.appendChild(btns);
    }

}



const displayCards = (cardData) => {

    cardData.forEach(card => {

        const categoryCard = document.getElementById('category-cards')
        // console.log(categoryCard);


        // console.log(card.authors[0].profile_picture);

        const cardDiv = document.createElement('div');

        // const timeField = document.getElementById('posted-date');
        // console.log(timeField.innerText);


        cardDiv.innerHTML = `
        <div class="card bg-gray-100 shadow-xl my-2">
                <figure class="w- mx-auto"><img class="min-w-full h-40" src="${card.thumbnail}" alt="Shoes" />

                </figure>
                <div class="relative">
                <div class="absolute bottom-0 right-0  bg-black text-white">
                    <p id="posted-date">${card?.others?.posted_date}</p>
                </div>
                </div>
                
                <div class="card-body my-3">
                    <div class="flex gap-3">
                        <img class="w-10 h-10 rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                        <h2 class="card-title">${card?.title}</h2>
                    </div>
                    <div class="flex">
                        <p>${card?.authors[0]?.profile_name}
                            ${card?.authors[0]?.verified || ''}</p>
                    </div>
                    <p>${card?.others?.views}</p>
                </div>
            </div>
                  `;

        categoryCard.appendChild(cardDiv);

    });
}

const returnFunction = (num) =>{

    const timeFist = num?.others?.posted_date;
    const timeHour = timeFist/60;
    const timeMin = timeHour / 60;
    return [timeHour,timeMin];

}

// displayBtn();
loadBtn();