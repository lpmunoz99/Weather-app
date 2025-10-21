export async function getData(country){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/?key=9NUZQN33KH5EP5BCW2TAZJHXA&iconSet=icons2`);

        if(!response.ok){
            throw new Error('Could not fetch');
        }
        
        return await response.json(); 
    }catch(e){
        alert(e);
    }
}