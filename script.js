/*  TO-DOs:  
IP validation for form input

*/

function watchForm() {
    watchShowIP();
    watchCustomIP();
    console.log('App loaded...')
}

function watchShowIP() {
    $('#button-show-ip').click(function() {
        event.preventDefault();
        getIP();
        $('#button-show-ip').addClass("hidden");
        $('#button-custom-ip').addClass("hidden");
        $('#ip-info').removeClass("hidden");
    })
}

function watchCustomIP() {
    $('#button-custom-ip').click(function() {
        event.preventDefault();
        watchCustomIPSubmit();
        $('#button-show-ip').addClass("hidden");
        $('#button-custom-ip').addClass("hidden");
        $('form').removeClass("hidden");
    })
}

function watchCustomIPSubmit() {
    $('#submit-ip').click(function() {
        event.preventDefault();
        let ipAddress = document.getElementById("input-custom-ip").value;
        console.log(ipAddress);
        $('form').addClass("hidden");
        $('#ip-info').removeClass("hidden");
        displayResults(ipAddress);
    })
}

function getIP() {
    fetch("https://api.kwelo.com/v1/network/ip-address/my?format=json")
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => makeIP(responseJson))
    .catch(err => {
      $('h1').html(`Something went wrong.`);
    });
}

function makeIP(responseJson) {
    console.log(responseJson);
    let ipAddress = responseJson.data.ip_address;
    displayResults(ipAddress);
}

function displayResults(ipAddress) {
    console.log(ipAddress);
    $('h1').html("My public IP address is: " + ipAddress);
    additionalInfo(ipAddress);
}

function additionalInfo(ipAddress) {
    fetch(`http://api.ipapi.com/${ipAddress}?access_key=ac199051467c151c8af9e980ccd1ac8e`)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayAdditional(responseJson))
    .catch(err => {
      $('1').html(`Something went wrong.`);
    });
}

function displayAdditional(responseJson) {
    console.log(responseJson);
    $('h2').html(responseJson.city + ', ' + responseJson.region_code);
    $('ul').append(`
        <li><strong>Country:</strong> ${responseJson.country_name}</li>
        <li><strong>ZIP Code:</strong> ${responseJson.zip}</li>
        <li><strong>Longitude:</strong> ${responseJson.longitude} Latitude: ${responseJson.latitude}</li>
    `)
    let city = responseJson.city;
    let state = responseJson.region_code;
    makeMap(city, state);
}

function makeMap(city, state) {
    $('body').css({
        'background-image': `url('https://maps.googleapis.com/maps/api/staticmap?center=${city},${state}&zoom=14&size=3000x3000&key=AIzaSyDnwktLifUmea_EUZFq_KpTA0n-vr1HFbc')`,
        'background-size': 'cover',
        'background-position': 'center',
    });
}

$(watchForm);