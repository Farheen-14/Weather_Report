const submitBtn= document.getElementById('submitBtn');
const cityInputValue= document.getElementById('cityInputValue');
const cityNameErr= document.getElementById('cityNameErr');
// console.log ("Working code");


const getInfo= (event)=>{
    event.preventDefault();
    let cityName= cityInputValue.value;

//getting temp. "temp_min": 275.48 in kelvin, this function will convert to celcius
    function convert_kelvin_to_celcius(temprature_in_kelvin) {
        let temp_in_celcius = (temprature_in_kelvin - 273.15).toFixed(1) 
        return temp_in_celcius
      }

//"dt": 1669896000, converting epoch date To Js date
    function epochToJsDate(ts){
        // ts = epoch timestamp
        // returns date obj
        return new Date(ts*1000).getDate();
   }
   
   function epochToJsDate_obj(ts){
    // ts = epoch timestamp
    // returns date obj
    let date_obj = new Date(ts*1000)
    return date_obj.toString()
    // return date_obj.getDate() + '-' + date_obj.getMonth() + '-' + date_obj.getFullYear();
}

function epochToJsDate_for_morning_evening_calculation(ts){
    // ts = epoch timestamp
    // returns date obj
    let date_obj = new Date(ts*1000)
    // console.log(date_obj)
    return date_obj;
}

//    This str_datetime_to_date function is to deal with the help of dt_txt key, which returns datetime in str format
   function str_datetime_to_date(datetime_obj){
    let datetime_obj1 = datetime_obj.split(' ')
    datetime_obj1 = datetime_obj1[0].split('-')
    datetime_obj1 = datetime_obj1[2]
    return datetime_obj1
}

    if(cityName===""){
        cityNameErr.innerHTML= ` Please Enter City Name!`
    }

    else{
        document.getElementById('outer_card').innerHTML = ''
        document.getElementById('outer_card1').innerHTML = ''
        document.getElementById('outer_card2').innerHTML = ''
        document.getElementById('outer_card3').innerHTML = ''
        document.getElementById('outer_card4').innerHTML = ''
        cityNameErr.innerHTML= ``
        try {
        let url= `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=0c2f31a83e3054883fab20fdeff0ec79`;
        const response=  fetch(url);
        response.then((respons) => respons.json())
      .then((data) => {

        // for 5 days, we can differentiate data as per the date provided by the API and with our current date
        // and based on that i have differentiate 5 days data, and stored in separate arrays.
        // then, push those arrays to one master array and show the required data in frontend using 2 loops

        let current_date_arr = []
        let current_date_plus_one_arr = []
        let current_date_plus_two_arr = []
        let current_date_plus_three_arr = []
        let current_date_plus_four_arr = []

        current_date = new Date().getDate()
        current_date_plus_one = current_date + 1
        current_date_plus_two = current_date + 2
        current_date_plus_three = current_date + 3
        current_date_plus_four = current_date + 4
        
        for (let i = 0; i <= data.list.length; i++) {    
            if(data.list[i]){
                if (current_date == epochToJsDate(data.list[i].dt)){
                    current_date_arr.push(data.list[i])
                } else if (current_date_plus_one == epochToJsDate(data.list[i].dt)) {
                    current_date_plus_one_arr.push(data.list[i])
                } else if (current_date_plus_two == epochToJsDate(data.list[i].dt)) {
                    current_date_plus_two_arr.push(data.list[i])
                } else if (current_date_plus_three == epochToJsDate(data.list[i].dt)) {
                    current_date_plus_three_arr.push(data.list[i])
                } else if (current_date_plus_four == epochToJsDate(data.list[i].dt)) {
                    current_date_plus_four_arr.push(data.list[i])
                }
            }
        }

        // console.log(current_date_arr)
        // console.log(current_date_plus_one_arr)
        // console.log(current_date_plus_two_arr)
        // console.log(current_date_plus_three_arr)
        // console.log(current_date_plus_four_arr)

        let master_array = []
        master_array.push(current_date_arr)
        master_array.push(current_date_plus_one_arr)
        master_array.push(current_date_plus_two_arr)
        master_array.push(current_date_plus_three_arr)
        master_array.push(current_date_plus_four_arr)

//Trying one more approch but not completed yet
        // morning, afternoon & evening calculation based on the data we have separated by the date
        // we can write logic to handle different cases based on date & time,from the API
        for (let i = 0; i < current_date_plus_one_arr.length; i++) {
            let morning_evening_object_list = []
            let current_hour = epochToJsDate_for_morning_evening_calculation(current_date_plus_one_arr[i].dt)

            if(current_hour > 6 && current_hour < 12){
                // morning
            } else  if(current_hour > 12 && current_hour < 17){
                // afternoon
            } else {
                // evening
            }
        }



      // THIS BELOW COMMENTED CODE WILL HELP US TO REDUCE THE MULTIPLE LINES, I WAS TRYING IN THE WAY WHICH CAN HELP ME TO REDUCE THE 
        // LENGTH OF THE CODE, BUT DUE TO SOME CONFUSIONS I GOT STUCK ON SOME POINTS AND DIDN'T GOT THE SOLUTION. SO I HAVE USED SEPARATE 
        // LOOP FOR EVERY ARRAY THAT I HAVE CREATED USING THE API RESPONSE


        // this loop will run upto 5 times
        // for (let i = 0; i < master_array.length; i++) {

            
        //     for (let j = 0; j <= master_array[i].length; j++) {  
        //         console.log(master_array[i])
        //         var card_data = `
        //                     <div class="card">
        //                         <img src="https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg" class="card-img-top" style="background-color: rgb(115, 115, 122);" id="img" alt="background">
        //                         <div class="card-body">
        //                             <p class="list-group-item" id="Min">Min - ${(master_array[i].main) ? convert_kelvin_to_celcius(master_array[i].main.temp_min) : ''} C</p>
        //                             <p class="list-group-item" id="Max">Max - ${(master_array[i].main) ? convert_kelvin_to_celcius(master_array[i].main.temp_max) : ''} C</p>
        //                             <p class="list-group-item" id="humidity">Humidity - ${((master_array[i].main) ? (master_array[i].main.humidity).toFixed(1) : '')}</p>
        //                             <p class="list-group-item" id="humidity">Date - ${epochToJsDate_obj(master_array[i].dt)}</p>
        //                             <p class="list-group-item" id="humidity">Date - ${master_array[i].dt_txt}</p>
        //                             </div>
        //                     </div>
        //                     `
        //         // document.getElementById('outer_card').innerHTML += card_data
        //     }           
        //     document.getElementById('master_card').innerHTML += card_data
        // }

//End one more approch 


        // SETTING UP THE UI TO SHOW THE REQUIRED DATA
        
        // for day headers

        var datatoday = new Date();

        var day_date1 = datatoday.toDateString();

        var day_date2 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        day_date2 = new Date(day_date2).toDateString();

        var day_date3 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        day_date3 = new Date(day_date3).toDateString();

        var day_date4 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        day_date4 = new Date(day_date4).toDateString();

        var day_date5 = datatoday.setDate(new Date(datatoday).getDate() + 1);
        day_date5 = new Date(day_date5).toDateString();

        document.getElementById('day1').innerHTML = day_date1
        document.getElementById('day2').innerHTML = day_date2
        document.getElementById('day3').innerHTML = day_date3
        document.getElementById('day4').innerHTML = day_date4
        document.getElementById('day5').innerHTML = day_date5



        // ADDING DYNAMIC HTML BASED ON RESPONSE FROM THE API

        // current date
        for (let i = 0; i < current_date_arr.length; i++) {  
            let card_data = `
                            <div class="card">
                                <img src="http://openweathermap.org/img/wn/${current_date_arr[i].weather[0].icon}.png" class="card-img-top" style="background-color: rgb(115, 115, 122);" id="img" alt="background">
                                <div class="">
                                    <p class="list-group-item" id="Min">Min : ${(current_date_arr[i].main) ? convert_kelvin_to_celcius(current_date_arr[i].main.temp_min) : ''} C</p>
                                    <p class="list-group-item" id="Max">Max : ${(current_date_arr[i].main) ? convert_kelvin_to_celcius(current_date_arr[i].main.temp_max) : ''} C</p>
                                    <p class="list-group-item" id="humidity">Humidity : ${((current_date_arr[i].main) ? (current_date_arr[i].main.humidity).toFixed(1) : '')}</p>
                                    <p class="list-group-item" id="humidity">Date : ${epochToJsDate_obj(current_date_arr[i].dt)}</p>
                                </div>
                            </div>
                            `
                document.getElementById('outer_card').innerHTML += card_data
            }

        // current date + 1
        for (let i = 0; i < current_date_plus_one_arr.length; i++) {  
            let card_data = `
                        <div class="card">
                            <img src="http://openweathermap.org/img/wn/${current_date_plus_one_arr[i].weather[0].icon}.png" class="card-img-top" style="background-color: rgb(115, 115, 122);" id="img" alt="background">
                            <div class="">
                                <p class="list-group-item" id="Min">Min : ${(current_date_plus_one_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_one_arr[i].main.temp_min) : ''} C</p>
                                <p class="list-group-item" id="Max">Max : ${(current_date_plus_one_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_one_arr[i].main.temp_max) : ''} C</p>
                                <p class="list-group-item" id="humidity">Humidity : ${((current_date_plus_one_arr[i].main) ? (current_date_plus_one_arr[i].main.humidity).toFixed(1) : '')}</p>
                                <p class="list-group-item" id="humidity">Date : ${epochToJsDate_obj(current_date_plus_one_arr[i].dt)}</p>
                            </div>
                        </div>
                        `
            document.getElementById('outer_card1').innerHTML += card_data
        }

        // current date + 2
        for (let i = 0; i < current_date_plus_two_arr.length; i++) {  
            let card_data = `
                        <div class="card">
                            <img src="http://openweathermap.org/img/wn/${current_date_plus_two_arr[i].weather[0].icon}.png" class="card-img-top" style="background-color: rgb(115, 115, 122);" id="img" alt="background">
                            <div class="">
                                <p class="list-group-item" id="Min">Min : ${(current_date_plus_two_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_two_arr[i].main.temp_min) : ''} C</p>
                                <p class="list-group-item" id="Max">Max : ${(current_date_plus_two_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_two_arr[i].main.temp_max) : ''} C</p>
                                <p class="list-group-item" id="humidity">Humidity : ${((current_date_plus_two_arr[i].main) ? (current_date_plus_two_arr[i].main.humidity).toFixed(1) : '')}</p>
                                <p class="list-group-item" id="humidity">Date : ${epochToJsDate_obj(current_date_plus_two_arr[i].dt)}</p>
                            </div>
                        </div>
                        `
            document.getElementById('outer_card2').innerHTML += card_data
        }

        // current date + 3
        for (let i = 0; i < current_date_plus_three_arr.length; i++) {  
            let card_data = `
                        <div class="card">
                            <img src="http://openweathermap.org/img/wn/${current_date_plus_three_arr[i].weather[0].icon}.png" class="card-img-top" style="background-color: rgb(115, 115, 122);" id="img" alt="background">
                            <div class="">
                                <p class="list-group-item" id="Min">Min : ${(current_date_plus_three_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_three_arr[i].main.temp_min) : ''} C</p>
                                <p class="list-group-item" id="Max">Max : ${(current_date_plus_three_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_three_arr[i].main.temp_max) : ''} C</p>
                                <p class="list-group-item" id="humidity">Humidity : ${((current_date_plus_three_arr[i].main) ? (current_date_plus_three_arr[i].main.humidity).toFixed(1) : '')}</p>
                                <p class="list-group-item" id="humidity">Date : ${epochToJsDate_obj(current_date_plus_three_arr[i].dt)}</p>
                            </div>
                        </div>
                        `
            document.getElementById('outer_card3').innerHTML += card_data
        }

        // current date + 4
        for (let i = 0; i < current_date_plus_four_arr.length; i++) {  
            let card_data = `
                        <div class="card">
                            <img src="http://openweathermap.org/img/wn/${current_date_plus_four_arr[i].weather[0].icon}.png" class="card-img-top" style="background-color: rgb(115, 115, 122);" id="img" alt="background">
                            <div class="">
                                <p class="list-group-item" id="Min">Min : ${(current_date_plus_four_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_four_arr[i].main.temp_min) : ''} C</p>
                                <p class="list-group-item" id="Max">Max : ${(current_date_plus_four_arr[i].main) ? convert_kelvin_to_celcius(current_date_plus_four_arr[i].main.temp_max) : ''} C</p>
                                <p class="list-group-item" id="humidity">Humidity : ${((current_date_plus_four_arr[i].main) ? (current_date_plus_four_arr[i].main.humidity).toFixed(1) : '')}</p>
                                <p class="list-group-item" id="humidity">Date : ${epochToJsDate_obj(current_date_plus_four_arr[i].dt)}</p>
                            </div>
                        </div>
                        `
            document.getElementById('outer_card4').innerHTML += card_data
        }

        // console.log("data",data);
      }) .catch ((err) => {
          console.log("some err",err);
      })     
}
catch (err){
    console.log("some err",err);
} 
    }      
}

submitBtn.addEventListener("click", getInfo);