 document.addEventListener('DOMContentLoaded', function () {
    const ageButton = document.getElementById('age-btn');
    ageButton.addEventListener('click', function () {
        show_age();
    });
    const countdownButton = document.getElementById('countdown-btn');
    countdownButton.addEventListener('click', function () {
        show_countdown();
    });
});

function show_age() {
    const ageDate = document.getElementById('age-date').value;
    if(!ageDate) {
        document.getElementById('age-error').innerHTML = `<p class="text-danger">Choose a date please!</p>`;
    }
    else {
        const apiUrl = `https://digidates.de/api/v1/age/${ageDate}`;   
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    document.getElementById('age-container').innerHTML = `<p class="text-danger">Network response was not ok</p>`;
                }
                return response.json();
            })
            .then(data => {
                const age = data.age;
                const ageExtended = data.ageextended;
                const ageInfo = `
                    <p>Your age is: <span class="text-primary fs-5"> ${age} </span></p>
                    <p>Age Extended:</p>
                    <ul>
                        <li>Years: <span class="text-primary fs-5"> ${ageExtended.years} </span></li>
                        <li>Months: <span class="text-primary fs-5"">  ${ageExtended.months} </span></li>
                        <li>Days: <span class="text-primary fs-5"> ${ageExtended.days} </span></li>
                    </ul>
                `;
                document.getElementById('age-container').innerHTML = ageInfo;
                const selectedDate = new Date(ageDate);
                const today = new Date();
                if (selectedDate > today){
                    document.getElementById('age-error').innerHTML = `<p class="text-warning">Choosen date is in the future !</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('age-container').innerHTML = '<p class="text-danger">Error fetching data. Please try again.</p>';
            });
    }   
}

function show_countdown() {
    const countdownDate = document.getElementById('countdown-date').value;
    if(!countdownDate) {
        document.getElementById('countdown-error').innerHTML = `<p class="text-danger">Choose a date please!</p>`;
    }
    else {
        const apiUrl = `https://digidates.de/api/v1/countdown/${countdownDate}`;   
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    document.getElementById('countdown-container').innerHTML = `<p class="text-danger">Network response was not ok</p>`;
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const countdown = data.daysonly;
                const countdownExtended = data.countdown;
                const countdownInfo = `
                    <p>Days Only is: <span class="text-primary fs-5"> ${countdown} </span></p>
                    <p>Countdown Extended:</p>
                    <ul>
                        <li>Years: <span class="text-primary fs-5"> ${countdownExtended.years} </span></li>
                        <li>Months: <span class="text-primary fs-5"">  ${countdownExtended.months} </span></li>
                        <li>Days: <span class="text-primary fs-5"> ${countdownExtended.days} </span></li>
                    </ul>
                `;
                document.getElementById('countdown-container').innerHTML = countdownInfo;
            })
            .catch(error => {
                const selectedDate = new Date(countdownDate);
                const today = new Date();
                if (selectedDate < today){
                    document.getElementById('countdown-error').innerHTML = `<p class="text-warning">Choosen date is in the past !</p>`;
                }
                console.error('Error fetching data:', error);
                document.getElementById('countdown-container').innerHTML = '<p class="text-danger">Error fetching data. Please try again.</p>';
            });
    }   
}
