window.addEventListener('load', () => {
    let long;
    let lat;
    
    const temperatureDescription = document.querySelector(
    ".temperature-description"
    );
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone");
    const temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = `https://cors-anywhere.herokuapp.com/`; 
            //using proxy as darksky doesn't allow to fetch response on localhost so using proxy.
            const api = `${proxy}https://api.darksky.net/forecast/8b7018f924168a13195160a374e7f39c/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                
                const {temperature, summary, icon } = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                
                //FORMULA FOR CELCIUS
                let celsius = (temperature - 32) * (5 / 9);
                //Set Icons
                setIcons(icon, document.querySelector(".icon"));
                
                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click', () => {
                   if(temperatureSpan.textContent === "F"){
                       temperatureSpan.textContent = "C";
                       temperatureDegree.textContent = celsius.toFixed(2);
                       
                   }else{
                       temperatureSpan.textContent = "F";
                       temperatureDegree.textContent = temperature;
                   } 
                });
            });
        });
    }
    
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});