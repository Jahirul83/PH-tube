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

const handleLoadCategory = async (categoryId) => {
    // console.log(categoryId.data);

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const idData = await res.json();

    // console.log(idData.data.length);

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
            // console.log(card);

            const cardDiv = document.createElement('div');
            cardDiv.innerHTML = `
        <div class="card h-96 bg-gray-100 shadow-xl my-2">
                    <figure class="w- mx-auto"><img class="min-w-full h-40" src="${card.thumbnail}" alt="Shoes" />
    
                    </figure>
                    <div class="relative">
                    <div class="absolute rounded-lg p-1 bottom-0 right-2 bg-black text-white">
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
loadCategory();
handleLoadCategory('1000');