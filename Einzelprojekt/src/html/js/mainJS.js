import { handleURL,_addContent,_addTable,_createWeatherItem } from './jsHelper.js'; // with name

var app = (function() {
  
    let _initialize = function() {    
        app.fetchMyData();
    }

    let _fetchMyData = function() {
        let url = 'https://restcountries.eu/rest/v2/region/europe';

        handleURL(url).then(response => {
            _renderRequestedData(response, "item-list");
        });
        app.detail(this, "Mariehamn",false);

    };

    let _renderRequestedData = function(data) {
        console.log(data);
        
        var myParent = document.getElementById("parent");
        var selectList = document.createElement("select");
        selectList.id = "mySelect";
        selectList.classList.add("custom-select");
        myParent.appendChild(selectList);

        for (let key in data) {

           if(data[0].capital != "undefined"){
                var option = document.createElement("option");
                option.value = data[key].name;
                option.text = data[key].name;
                option.addEventListener("click", function() { app.detail(this, data[key].capital,false); });
                selectList.appendChild(option);
            }
        }
    }
    

    let _renderRequestedWeather = function(data) {

        var weatherParent = document.getElementById("weather-info");


        let temperature_tbl = _addTable("tableid","temperature table");
        let general_tbl = _addTable("generalid","general table");
                   
        weatherParent.appendChild(temperature_tbl);

 
        for (let key in data) {

            if(typeof data[key] === 'object' ){

                if(typeof data[key][0] === 'object' && data[key][0] !== null){                   
                    document.getElementById("weather-desc").innerHTML = data[key][0]["description"];
                    document.getElementById("show-icon").src = "../../icons/day/"+data[key][0]["main"]+".png";
                }

                if(data[key]["temp"]){
                    let temp = _createWeatherItem(data[key]["temp"]);
                    temp = Math.round(data[key]["temp"] - 273.15) + '°C';

                    let content = _addContent(data,key,"temp","temperature",temperature_tbl,temp);
                    weatherParent.appendChild(content);
                }
                if(data[key]["feels_like"]){
                    let feels_like = _createWeatherItem(data[key]["feels_like"]);
                    feels_like = Math.round(data[key]["feels_like"] - 273.15) + '°C';

                    let content = _addContent(data,key,"feels_like","feels like",temperature_tbl,feels_like);
                    weatherParent.appendChild(content);
                }

                if(data[key]["temp_max"]){
                    let temp_max = _createWeatherItem(data[key]["temp_max"]);
                    temp_max = Math.round(data[key]["temp_max"] - 273.15) + '°C';

                    let content = _addContent(data,key,"temp_min","min temperature",temperature_tbl,temp_max);
                    weatherParent.appendChild(content);
                    
                }
                if(data[key]["temp_min"]){

                    let temp_min = _createWeatherItem(data[key]["temp_min"]);
                    temp_min = Math.round(data[key]["temp_min"] - 273.15) + '°C';

                    let content = _addContent(data,key,"temp_min","max temperature",temperature_tbl,temp_min);
                    weatherParent.appendChild(content);

                }
                if(data[key]["speed"]){
                    
                    let content = _addContent(data,key,"speed","speed",general_tbl,null);
                    weatherParent.appendChild(content);
                   
                }
                
                 if(data[key]["humidity"]){
                    let content = _addContent(data,key,"humidity","humidity",general_tbl,null);
                    weatherParent.appendChild(content);
                }
                if(data[key]["sunset"]){
                    let unix = data[key]["sunset"];
                    let date = new Date(unix*1000);

                    let content = _addContent(data,key,"sunset","sunset",general_tbl,date);
                    weatherParent.appendChild(content);
                }
                if(data[key]["sunrise"]){
                    let unix = data[key]["sunrise"];
                    let date = new Date(unix*1000);
                    let content = _addContent(data,key,"sunrise","sunrise",general_tbl,date);
                    weatherParent.appendChild(content);
                }
                if(data[key]["lon"]){
                    let content = _addContent(data,key,"lon","longitude",general_tbl,null);
                    weatherParent.appendChild(content);
                }
                if(data[key]["lat"]){
                    let content = _addContent(data,key,"lat","latitude",general_tbl,null);
                    weatherParent.appendChild(content);
                }
            }else{
                if(key == "name"){
                    document.getElementById("capital").innerHTML = "Capital: "+ data[key];
                }
            }

        }
    }

    let _detail = function(element, capital,isButton) {
        let url = "https://api.openweathermap.org/data/2.5/weather?q="+capital+"&appid=a1602e990fc84e3b3175c307fef23c44";

        handleURL(url).then(response => {
            //console.log(response);
            _renderRequestedWeather(response, "weather-info");
            console.log(response);
        });
        if(typeof element.value === "undefined"){
            document.getElementById("country").innerHTML = "Country: Åland Islands";
            /*document.getElementById("country").addEventListener("click", function() { 
                _addToCart("Mariehamn"); 
            });*/

        }else{
            document.getElementById("country").innerHTML = "Country: "+ element.value;
            if(isButton == false)
                document.getElementById("country").click( _addToCart(capital));

        }
    }
  
    function _addToCart(element) {
        let cart = document.getElementById("cart")
        let g = document.createElement("div");

        let ol = document.getElementById("ol-id");
        let li = document.createElement("li");

        var button_show_data = document.createElement("button");
        button_show_data.classList.add("button");
        button_show_data.textContent  = element;
        button_show_data.addEventListener("click", function() { 
            app.detail(this,element,true); 
        });

        var a = document.createElement("a");
        a.setAttribute("href","#");
       // button_delete.classList.add("button");
        var img = document.createElement("img");
        img.src ="../../icons/delete.png";
        img.addEventListener("click", function() { 
            button_show_data.remove(); 
            img.remove(); 
        });
        a.appendChild(img);

     
       /*
        span2.addEventListener("click", function() { 
            document.getElementById(element).remove();
            document.getElementById(element+"s").remove(); 
            var lines = cart.innerHTML.split('\n');
            lines.splice(0,1);
            cart = lines.join('\n');
        }) ;
        */

        li.appendChild(button_show_data);
        li.appendChild(a);
        ol.appendChild(li);

        g.appendChild(ol);
        cart.append(g);
        //cart.append(li1);
        //cart.append(button);


        var myParent = document.getElementById("parent");
        myParent.appendChild(cart);
    
    }

    return {
        fetchMyData: _fetchMyData,
        detail: _detail,
        initialize: _initialize
    }
}());
app.initialize();
