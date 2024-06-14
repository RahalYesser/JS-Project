/**** By Prettier - code formatter ****/

// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the button for showing age and add a click event listener
  const ageButton = document.getElementById("age-btn");
  ageButton.addEventListener("click", function () {
    show_age();
  });
  // Get the button for showing countdown and add a click event listener
  const countdownButton = document.getElementById("countdown-btn");
  countdownButton.addEventListener("click", function () {
    show_countdown();
  });
  // Get the button for showing holidays and add a click event listener
  const yearButton = document.getElementById("holidays-btn");
  yearButton.addEventListener("click", function () {
    show_holidays();
  });
});

// Function to calculate and show age based on the input date (calculated by API)
function show_age() {
  // Get the value of the input date for age
  const ageDate = document.getElementById("age-date").value;
  const ageContainer = document.getElementById("age-container");
  ageContainer.innerHTML = `<h6 class="text-primary"> ** Info goes here ** </h6>`; // Clear previous content

  // If no date is provided, show an error message
  if (!ageDate) {
    document.getElementById(
      "age-error"
    ).innerHTML = `<p class="text-danger">Choose a date please!</p>`;
  } else {
    // Construct the API URL
    const apiUrl = `https://digidates.de/api/v1/age/${ageDate}`;
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the response is not ok, and show an error message if not
        if (!response.ok) {
          ageContainer.innerHTML = `<p class="text-danger">Network response was not ok</p>`;
        }
        return response.json();
      })
      .then((data) => {
        // Extract age and extended age information from the response data
        const age = data.age;
        const ageExtended = data.ageextended;
        // Create the HTML content to display age information
        const ageInfo = `
                    <p>Your age is: <span class="text-primary fs-5"> ${age} </span></p>
                    <p>Age Extended:</p>
                    <ul>
                        <li>Years: <span class="text-primary fs-5"> ${ageExtended.years} </span></li>
                        <li>Months: <span class="text-primary fs-5">  ${ageExtended.months} </span></li>
                        <li>Days: <span class="text-primary fs-5"> ${ageExtended.days} </span></li>
                    </ul>
                `;
        // Insert the age information into the container
        document.getElementById("age-container").innerHTML = ageInfo;

        // Check if the selected date is in the future and show a warning message if it is
        const selectedDate = new Date(ageDate);
        const today = new Date();
        if (selectedDate > today) {
          document.getElementById(
            "age-error"
          ).innerHTML = `<p class="text-warning">Chosen date is in the future!</p>`;
        }
      })
      .catch((error) => {
        // Handle any errors during the fetch operation
        console.error("Error fetching data:", error);
        ageContainer.innerHTML =
          '<p class="text-danger">Error fetching data. Please try again.</p>';
      });
  }
}

// Function to aclculate and show countdown based on the date choosen (calculated by API)
function show_countdown() {
  // Get the value of the input date for countdown
  const countdownDate = document.getElementById("countdown-date").value;
  const countdownContainer = document.getElementById("countdown-container");
  countdownContainer.innerHTML = `<h6 class="text-primary"> ** Info goes here ** </h6>`; // Clear previous content
  // If no date is provided, show an error message
  if (!countdownDate) {
    document.getElementById(
      "countdown-error"
    ).innerHTML = `<p class="text-danger">Choose a date please!</p>`;
  } else {
    // Construct the API URL
    const apiUrl = `https://digidates.de/api/v1/countdown/${countdownDate}`;
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        // Check if the response is not ok, and show an error message if not
        if (!response.ok) {
          container.innerHTML = `<p class="text-danger">Network response was not ok</p>`;
        }
        return response.json();
      })
      .then((data) => {
        // Extract countdown and extended countdown information from the response data
        const countdown = data.daysonly;
        const countdownExtended = data.countdown;
        // Create the HTML content to display countdown information
        const countdownInfo = `
                    <p>Days Only is: <span class="text-primary fs-5"> ${countdown} </span></p>
                    <p>Countdown Extended:</p>
                    <ul>
                        <li>Years: <span class="text-primary fs-5"> ${countdownExtended.years} </span></li>
                        <li>Months: <span class="text-primary fs-5">  ${countdownExtended.months} </span></li>
                        <li>Days: <span class="text-primary fs-5"> ${countdownExtended.days} </span></li>
                    </ul>
                `;
        // Insert the countdown information into the container
        countdownContainer.innerHTML = countdownInfo;
      })
      .catch((error) => {
        // Handle any errors during the fetch operation and show a warning message if the date is in the past
        const selectedDate = new Date(countdownDate);
        const today = new Date();
        if (selectedDate < today) {
          document.getElementById(
            "countdown-error"
          ).innerHTML = `<p class="text-warning">Chosen date is in the past!</p>`;
        }
        console.error("Error fetching data:", error);
        countdownContainer.innerHTML =
          '<p class="text-danger">Error fetching data. Please try again.</p>';
      });
  }
}

// Function to show holidays based on the year choosen
function show_holidays() {
  // Get the value of the input year for holidays
  const year = document.getElementById("year").value;
  console.log(year, "year");
  // Construct the API URL
  const apiUrl = `https://digidates.de/api/v1/germanpublicholidays?year=${year}&region=de`;
  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => {
      // Check if the response is not ok, and show an error message if not
      if (!response.ok) {
        document.getElementById(
          "holidays-container"
        ).innerHTML = `<p class="text-danger">Network response was not ok</p>`;
      }
      return response.json();
    })
    .then((data) => {
      // Display the fetched holidays data
      displayHolidays(data);
    })
    .catch((error) => {
      // Handle any errors during the fetch operation
      console.error("Error fetching data:", error);
      document.getElementById("holidays-container").innerHTML =
        '<p class="text-danger">Error fetching data. Please try again.</p>';
    });
}

// Function to display holidays
function displayHolidays(data) {
  const holidaysContainer = document.getElementById("holidays-container");
  holidaysContainer.innerHTML = ""; // Clear previous content
  // Create a list to add the holidays
  const holidaysList = document.createElement("ul");
  // Iterate through the holidays data and create list for each holiday
  Object.keys(data).forEach((date) => {
    const holidayName = data[date];
    const listItem = document.createElement("li");
    listItem.textContent = `${date} : ${holidayName}`;
    holidaysList.appendChild(listItem);
  });
  // Append the holidays list to the container
  holidaysContainer.appendChild(holidaysList);
}
