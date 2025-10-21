import './style.css';
import { formatInTimeZone } from "../node_modules/date-fns-tz";
import { Country } from './country.js';
import { getData } from './api.js';
import { displayCountry } from './dom.js';

(function (){
    const searchBtn = document.querySelector('button');
    const input =  document.getElementById('search-bar');
    const mainDiv = document.querySelector('.top-content');
    const weatherDiv = document.createElement('div');
    weatherDiv.className = 'weather-content';
    mainDiv.appendChild(weatherDiv);
    const scale =  document.querySelector('.scale-text');

    let flag = false;
    let index = 0;
    let currentCountry = null;

    function addCountry(){

        if(input.value === ""){
            alert("Please enter a location");
            return;
        }
        return getData(input.value)
                .then(result => {
                    if (!result) return null;

                    if(result === undefined){
                        throw new Error("Country not found");
                    }
                    const name = result.address;
                    const nameFormatted = name.charAt(0).toUpperCase() + name.slice(1);
                    const dateZoned = formatDates(result, 0);

                    let precipitation = result.currentConditions.precip;
                    if(precipitation === null){
                        precipitation = 0;
                    }
                    currentCountry = new Country(
                        nameFormatted, 
                        dateZoned, 
                        result.currentConditions.conditions, 
                        result.currentConditions.temp, 
                        result.currentConditions.icon, 
                        result.currentConditions.feelslike + '', 
                        result.currentConditions.windspeed + ' mph', 
                        precipitation + ' mm', 
                        result.currentConditions.precipprob + '%', 
                        result.days, flag, 
                        result.timezone
                    );
                    console.log(currentCountry);
                    return currentCountry;
                })
                .catch(error => alert(error));
    }

    searchBtn.addEventListener('click', async () => {
        weatherDiv.textContent = '';
        currentCountry =  await addCountry();
        if (!currentCountry) return;
        const {rightBtn, leftBtn, daysDiv, daysArray} = await displayCountry(currentCountry, weatherDiv, loadImages, formatDates);
        rightBtn.addEventListener('click', () => goToSlide(index + 1, daysArray, daysDiv));
        leftBtn.addEventListener('click', () => goToSlide(index - 1, daysArray, daysDiv));
    });

    async function loadImages(icon){
        try{
            const module = await import(`./icons/${icon}.png`);
            return module.default;
        }catch(e){
            alert(e);
        }
    }

    scale.addEventListener('click', async () => {
        if(currentCountry === null){
            flag ? flag = false : flag = true;
            flag ? scale.textContent = '°C' : scale.textContent = '°F';
        }else{
            flag ? flag = false : flag = true;
            flag ? scale.textContent = '°C' : scale.textContent = '°F';
            currentCountry.changeScale();
            weatherDiv.textContent = '';
            await displayCountry(currentCountry, weatherDiv, loadImages, formatDates);   
        }
    });

    function formatDates(country, dates){
        const date = new Date(country.days[dates].datetimeEpoch * 1000);
        const timezone = country.timezone;
        if(dates > 0) {
            return formatInTimeZone(date, timezone, "EEEE, MMMM d");
        } else{
            return formatInTimeZone(date, timezone, "EEEE, MMMM d, yyyy");
        }
    }

    function goToSlide(i, array, container){
        index = i;
        if(index >= array.length - 4){
            index = 0;
        }
        if(index < 0){
            index = array.length - 5;
        }
        container.style.transform = `translateX(-${index * 20}%)`;
    }
})();