function handleURL(url) {
    return fetch(url)
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Error: " + response.status);
                return;
            }
            
            return response.json();
        });

}    

function _addTable(tableid,tableName){

    if (document.contains(document.getElementById(tableid))) {
        document.getElementById(tableid).remove();
    }            
        //"weather-info"


    var temperature_tbl = document.createElement('table');
    temperature_tbl.setAttribute("id", tableid)
    temperature_tbl.classList.add("styled-table");   

    let thead = document.createElement('thead');
    let headtr1 = document.createElement('tr');

    let headtd1 = document.createElement('td');
    let headtd2 = document.createElement('td');

    headtd1.append(tableName);
    headtd2.append("");
    headtr1.append(headtd1);
    headtr1.append(headtd2);

    thead.appendChild(headtr1);
    temperature_tbl.appendChild(thead);
    return temperature_tbl;
}


function _addContent(data,key,keyInput,text,table,indivInput,isObject){
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    td1.append(text);
              
    if(isObject === true){
        let variable = _createWeatherItem(data[key][keyInput]["description"]);
        td2.append(variable);
    }
    if(indivInput === null){
        let variable = _createWeatherItem(data[key][keyInput]);
        td2.append(variable);
            
    }
    else
        td2.append(indivInput);

    tr.appendChild(td1);
    tr.appendChild(td2);
    table.appendChild(tr);
    return table;
}
function _createWeatherItem(weatherData) {
    let span = document.createElement("span"); // creates a list element (node)
    span.textContent = weatherData;
    return span;
}

export { handleURL,_addContent,_addTable,_createWeatherItem}; // a list of exported variables