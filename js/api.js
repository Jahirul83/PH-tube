const loadCategory = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    const categoryData = data.data;

    const tabContainer = document.getElementById('category-tab');
    categoryData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadCategory('${category?.category_id}')" class="tab text-black btn mr-2 hover:bg-red-500 hover:text-white">${category.category}</a>
        `;
        tabContainer.appendChild(div);

    });
    // console.log(data.data);

};

let currentID = '0';

const handleLoadCategory = async (categoryId) => {

    currentID = categoryId;
    
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const idData = await res.json();
    
    // console.log(idData.data.length);
    console.log('sort=======>',currentID);

    const cardContainer = document.getElementById('category-cards');
    cardContainer.textContent = '';
    const emptyDiv = document.getElementById('empty-div');
    emptyDiv.textContent = '';

    if (idData.data.length === 0) {


        const Div = document.createElement('div');
        Div.innerHTML = `
        <div class="my-9">
                    <div class="flex justify-center items-center">
                        <img src="image/Icon.png" alt="">
                    </div>
                    <div class="text-center">
                    <h3 class="text-5xl">Oops!! Sorry, There is no content here</h3>
                    </div>
                </div>

        `;

        emptyDiv.appendChild(Div);
    }
    else {
        // const cardContainer = document.getElementById('category-cards');
        // console.log(cardContainer);

        // cardContainer.textContent = '';

        idData.data.forEach((card) => {
            let duration = card?.others?.posted_date;

            // console.log(card.others.views);
            let videoViews =  card?.others?.views;
           

            if (duration > 0) {

                const hourInFloat = duration/3600;
                const hour = parseInt(hourInFloat);
                const restMinutes = duration%3600;
                const minInFloat = restMinutes/60;
                const minutes = parseInt(minInFloat);
                const hrs = 'hrs ';
                const minAgo = 'min ago';
                duration = hour + hrs + minutes + minAgo;

            }


            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
        <div class="card h-96 bg-gray-100 shadow-xl my-2">
                    <figure class="w- mx-auto"><img class="h-40" src="${card.thumbnail}" alt="Shoes" />
    
                    </figure>
                    <div class="relative">
                    <div class="absolute rounded-lg p-1 bottom-2 right-2 bg-black text-white bg-opacity-75">
                        <p id="posted-date">${duration}</p>
                    </div>
                    </div>
                    
                    <div class="card-body my-3">
                        <div class="flex gap-3">
                            <img class="w-10 h-10 rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                            <h2 class="card-title">${card?.title}</h2>
                        </div>
                        <div class="flex">
                            <p>${card?.authors[0]?.profile_name}
                                ${card?.authors[0]?.verified ?
                    '<i class="bg-blue-600 p-1 text-white rounded-full fa-solid fa-check"></i>' : ''}</p>
                        </div>
                        <p>${card?.others?.views}</p>
                    </div>
                </div>

        `;
            cardContainer.appendChild(cardDiv);


        });

    }

    
}




// sorting

const sortbyView = async () =>{
    // console.log('first');
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${currentID}`);
    const data = await res.json();
    const videoByViews = data.data;


    
     videoByViews.sort((x,y)=>{
        const a = parseInt(x.others.views.replace('K','000'));
        const b = parseInt(y.others.views.replace('K','000'));
        const sorted = b-a;
        return sorted;
        
    })

   /*  videoByViews.sort((x, y) => {
        const a = parseInt(x.others.views.replace('K', '000'));
        const b = parseInt(y.others.views.replace('K', '000'));
      
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      }); */
   
      
      
      console.log('asdas',videoByViews)
      
      
    
    const cardContainer = document.getElementById('category-cards');
    cardContainer.textContent = '';
    const emptyDiv = document.getElementById('empty-div');
    emptyDiv.textContent = '';

   /*  if (videoByViews.data.length === 0) {


        const Div = document.createElement('div');
        Div.innerHTML = `
        <div class="my-9">
                    <div class="flex justify-center items-center">
                        <img src="image/Icon.png" alt="">
                    </div>
                    <div class="text-center">
                    <h3 class="text-5xl">Oops!! Sorry, There is no content here</h3>
                    </div>
                </div>

        `;

        emptyDiv.appendChild(Div);
    } */
    // else {
        // const cardContainer = document.getElementById('category-cards');
        // console.log(cardContainer);

        // cardContainer.textContent = '';

        videoByViews.forEach((card) => {
            let duration = card?.others?.posted_date;

            // console.log(card.others.views);
            // let videoViews =  card?.others?.views;
           

            if (duration > 0) {

                const hourInFloat = duration/3600;
                const hour = parseInt(hourInFloat);
                const restMinutes = duration%3600;
                const minInFloat = restMinutes/60;
                const minutes = parseInt(minInFloat);
                const hrs = 'hrs ';
                const minAgo = 'min ago';
                duration = hour + hrs + minutes + minAgo;

            }


            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
        <div class="card h-96 bg-gray-100 shadow-xl my-2">
                    <figure class="w- mx-auto"><img class="h-40" src="${card.thumbnail}" alt="Shoes" />
    
                    </figure>
                    <div class="relative">
                    <div class="absolute rounded-lg p-1 bottom-2 right-2 bg-black text-white bg-opacity-75">
                        <p id="posted-date">${duration}</p>
                    </div>
                    </div>
                    
                    <div class="card-body my-3">
                        <div class="flex gap-3">
                            <img class="w-10 h-10 rounded-full" src="${card?.authors[0]?.profile_picture}" alt="">
                            <h2 class="card-title">${card?.title}</h2>
                        </div>
                        <div class="flex">
                            <p>${card?.authors[0]?.profile_name}
                                ${card?.authors[0]?.verified ?
                    '<i class="bg-blue-600 p-1 text-white rounded-full fa-solid fa-check"></i>' : ''}</p>
                        </div>
                        <p>${card?.others?.views}</p>
                    </div>
                </div>

        `;
            cardContainer.appendChild(cardDiv);


        });

    // }

}

loadCategory();
handleLoadCategory('1000');