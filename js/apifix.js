const loadCategory = async () =>
{
    
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();

    const categoryData = data.data;
    
    const tabContainer = document.getElementById('category-tab');
    categoryData.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML=`
        <a class="tab text-black btn mr-2 hover:bg-red-500 hover:text-white">${category.category}</a>
        `;
        tabContainer.appendChild(div);
        
    });
    console.log(data.data);


}
loadCategory()