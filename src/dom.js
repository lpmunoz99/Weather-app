export async function displayCountry(obj, container, loadImages, formatDates){
    const weatherHeaders = document.createElement('div');
    weatherHeaders.className = 'weather-headers';
    container.appendChild(weatherHeaders);
    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'card-container';
    container.appendChild(cardsDiv);
    const carrousel = document.createElement('div');
    carrousel.className = 'carrousel-container';
    container.appendChild(carrousel);
    const leftBtn =  document.createElement('button');
    leftBtn.className = 'left-button';
    carrousel.appendChild(leftBtn);
    const frame = document.createElement('div');
    frame.className = 'frame';
    carrousel.appendChild(frame);
    const rightBtn =  document.createElement('button');
    rightBtn.className = 'right-button';
    carrousel.appendChild(rightBtn);
    const daysDiv = document.createElement('div');
    daysDiv.className = 'days-container';
    frame.appendChild(daysDiv);
    const daysArray = obj.days.slice(1, obj.days.length + 1);
    const headers = {
        feeltempF: 'Feels Like', 
        wind: 'Wind Speed', 
        precipitation: 'Precipitation', 
        precipitationprob: 'Precipitation Probability'
    }
    
    for (const key in obj){
        if (!(Object.prototype.hasOwnProperty.call(obj, key))) {
            continue;
        }

        if(key === 'name' || key === 'condition' || key === 'currentdate' ){
            const div = document.createElement('div');
            div.classList = 'headers';
            div.textContent = obj[key];
            weatherHeaders.appendChild(div);
        }else if(key === 'tempF'){
            const tempDiv =  document.createElement('div');
            tempDiv.classList = 'temp-container';
            weatherHeaders.appendChild(tempDiv);
            
            const tempImg = document.createElement('img');
            tempImg.classList = 'temp-img';
            const imgSrc = await loadImages(obj.icon);
            tempImg.src = imgSrc;
            tempDiv.appendChild(tempImg);
            
            const tempText = document.createElement('div');
            tempText.classList = 'temp-text';
            tempText.textContent = obj.temp;
            tempDiv.appendChild(tempText);
            
        }else if(key === 'icon' || key === 'scale' || key === 'timezone'){
            continue;
        }else if(key === 'days'){
            daysArray.forEach( async (element, index) => {
                if(index < daysArray.length){
                    const dateZoned = formatDates(obj, index + 1);

                    const day = document.createElement('div');
                    day.classList = 'day';
                    daysDiv.appendChild(day);

                    const dayDate = document.createElement('div');
                    dayDate.classList = 'day-date';
                    dayDate.textContent = dateZoned;
                    day.appendChild(dayDate);

                    const dayIcon = document.createElement('img');
                    dayIcon.classList = 'day-icon';
                    const daySrc = await loadImages(element.icon);
                    dayIcon.src = daySrc;
                    day.appendChild(dayIcon);

                    const dayTemp = document.createElement('div');
                    dayTemp.classList = 'day-temp';
                    dayTemp.textContent = obj.daytemp[index + 1];
                    day.appendChild(dayTemp);

                    const dayCondition = document.createElement('div');
                    dayCondition.classList = 'day-condition';
                    dayCondition.textContent = element.conditions;
                    day.appendChild(dayCondition);
                }
            });
            
        }else{
            const card = document.createElement('div');
            card.classList = 'card';
            cardsDiv.appendChild(card);

            const header = document.createElement('div');
            header.classList = 'card-header';
            header.textContent = headers[key];
            card.appendChild(header);

            const value =  document.createElement('div');
            value.classList = 'card-value';
            value.dataset.key = key;
            key === 'feeltempF' ? value.textContent = obj.feeltemp : value.textContent = obj[key];
            card.appendChild(value);
        }
    }

    return {rightBtn, leftBtn, daysDiv, daysArray}
}