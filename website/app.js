/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let key = "";

const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const feels_like = document.getElementById('feels-like');

document.getElementById('generate').addEventListener('click', performAction)

function performAction(e){
  get(zip, key)
    .then(newData => {
      postData('/create', {
        temp: newData.main.temp,
        feelings: feelings.value,
        date: date
      });
    })
    .then(() => updateUI());
  }



    async function get() {
      try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${key}&units=metric`);
        const json = await res.json();
        console.log('json', json)
        console.log();
        return json;
      } catch (err) {
        console.error('err', err);
      }
    
    }

    /* Function to POST data */
  const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data), 
  });

  try {
        const newData = await response.json();
        console.log(newData);
      } catch(error) {
      console.log("error", error)
  }
};

    /* Function to GET Project Data */
const getData = async (url='') => {
  const request = await fetch(url);
  try {
      let allData = await request.json()
      console.log(allData)
      return allData;
  }
  catch(error) {
      console.log("error",error);
  }
};

const newDate = document.getElementById('date');
const newTemp = document.getElementById('temp');
const newContent = document.getElementById('content');
const city = document.getElementById('city');

const updateUI = async () => {
    const request = await get();

    try{
      city.innerHTML = request.name;
      newDate.innerHTML = date;
      newTemp.innerHTML = request.main.temp;
      description.innerHTML = request.weather[0].description
      feels_like.innerHTML = request.main.feels_like;
      newContent.innerHTML = `How I'm feeling: ${feelings.value}`;
  
    } catch(error){
      console.log("error", error);
    }
  };