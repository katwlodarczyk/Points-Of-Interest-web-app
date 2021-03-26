iziToast.settings({
  timeout: 3000, // default timeout
  resetOnHover: true,
  // icon: '', // icon class
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  position: 'topRight',
});



// AUTOMATIC DATE UPDATE FOR FOOTER

const footerYear = document.getElementById("year");
const date = new Date();
const year = date.getFullYear();

footerYear.innerText = year;



// STAT COUNTER
function animateNumber(id, start, end, duration) {
  if (start === end) return;
  var range = end - start;
  var now = start;
  var increment = end > start? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var counter = setInterval(function() {
      now += increment;
      obj.innerHTML = now;
      if (now == end) {
          clearInterval(counter);
      }
  }, stepTime);
}

animateNumber("statAll", 0, 332, 5000);
animateNumber("statRegions", 0, 19, 5000);
animateNumber("statRestaurants", 0, 99, 5000);

//TO TOP BUTTON

toTopbutton = document.getElementById("toTopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 700 ||
    document.documentElement.scrollTop > 700
  ) {

    toTopbutton.style.display = "block";
  } else {
    toTopbutton.style.display = "none";
  }
}

function toTopFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// SEARCH 
async function poiSearch(type, field) {
    
  // Send a request to our remote URL
  const response = await  fetch(`/poi/${type}/${field}`);

  // Parse the JSON.
  const result = await response.json();
  // Loop through the array of JSON objects and add the results to a <div>
  let html = "";
  document.getElementById('results').innerHTML = "";
  let resultsdivsstart =
    `
    <h2 class="sm:px-6 lg:px-8 py-4 text-2xl text-brand-navy font-extrabold">Your results:</h2>
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
    `

  let resultsdivsend =
    `       </tbody
          </table>
        </div>
      </div>
    `
  let tableHeader = 
    `
    <thead class="bg-brand-light-gray">
      <tr>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Type
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Country
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Region
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Lon
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Lat
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Description
        </th>
        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Recommendations
        </th>
      </tr>
    </thead>
    <tbody>
  `;

  let noResultsNotification = `<h2 class="sm:px-6 lg:px-8 py-4 text-2xl text-brand-navy font-extrabold">Your results:</h2><p class="text-brand-navy text-xl font-normal sm:px-6 lg:px-8">Oops... Sorry, no matching results. Plase check your spelling or search for something else!</p>`

  if (result.length === 0){
      document.getElementById('results').innerHTML = noResultsNotification + html;
  } else {
      result.forEach ( result => {
        html += `
  
            <tr class="bg-white">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${result.name}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.type}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.country}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.region}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.lon}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.lat}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.description}
              </td>
              <td class="pl-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${result.recommendations}
                <a id="recommendButton" onclick='recommend(${result.ID})' class="pl-8 text-sm text-brand-orange hover:underline cursor-pointer">Recommend</a>
              </td>
            </tr>
          `
      });
      document.getElementById('results').innerHTML = resultsdivsstart + tableHeader + html + resultsdivsend;
  }
}


// Make the AJAX run when we click a search button
document.getElementById('searchButton').addEventListener('click', ()=> {
  const type = document.getElementById('poiType').value;
  const field = document.getElementById('poiField').value;
  poiSearch(type, field);
});


//  recommend a poi
async function recommend(id) {
  const poi = {
     recommendations : 1 
  }

  const response = await fetch(`/poi/${id}/recommend`, {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify(poi)
  });

  if(response.status == 404) {
    iziToast.error({
      title: 'Error',
      message: 'Could not recommend. Please try again.',
  });
  } else {
      const data = await response.json();
      iziToast.success({
        title: 'Success',
        message: 'You have recommended a point of interest.',
    });
  } 
}

// Make the AJAX run when user clicks recommend button
document.getElementById('recommendButton').addEventListener('click', ()=> {
  const id = `${result.id}`;
  recommend(id);
});




