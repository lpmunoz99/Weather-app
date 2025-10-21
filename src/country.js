export class Country {
    constructor(name, currentdate, condition, tempF, icon, feeltempF, wind, precipitation, precipitationprob, days, scale, timezone){
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }
        this.name = name;
        this.currentdate = currentdate;
        this.condition = condition;
        this.tempF = tempF;
        this.icon = icon;
        this.feeltempF = feeltempF;
        this.wind = wind;
        this.precipitation = precipitation;
        this.precipitationprob = precipitationprob;
        this.days = days;
        this.scale = scale;
        this.timezone = timezone;
    }

    get temp(){
        return this.scale ? ((5/9)*(this.tempF-32)).toFixed(1) + '°C' : this.tempF + '°F';
    }

    get feeltemp(){
        return this.scale ? ((5/9)*(this.feeltempF-32)).toFixed(1) + '°C' : this.feeltempF + '°F';
    }

    get daytemp(){
        const tempsConvert = this.days.map(d => {
            return this.scale ? ((5/9)*(d.temp-32)).toFixed(1) + '°' : d.temp + '°';
        });
        return tempsConvert;
    }
}

Country.prototype.changeScale = function() {
    this.scale = !this.scale;
};