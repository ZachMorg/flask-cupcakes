const BASE_URL = 'http://localhost:5000/api'

async function showCupcakes(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for(let cupcakeData of response.data.cupcakes){
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $("#cupcake-list").append(newCupcake);
    }
}


function generateCupcakeHTML(cupcake){
    return `
        <div data-cupcake-id=${cupcake.id}>
            <img class="cupcake-image" src="${cupcake.image}">
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete">Delete Item</button>
            </li>
        </div>
        <br>
    `;
}


$("#cupcake-form").on("submit", async function(evt){
    evt.preventDefault();

    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();

    const response = await axios.post(`${BASE_URL}/cupcakes`,{
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(generateCupcakeHTML(response.data.cupcake));
    $("#cupcake-list").append(newCupcake);
    $("#cupcake-form").trigger('reset');
});


$("#cupcake-list").on("click", ".delete", async function(evt){
    evt.preventDefault();
    let $cupcake = $(evt.target).closest('div');
    let cupcakeId = $cupcake.attr('data-cupcake-id');

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showCupcakes);