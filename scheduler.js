document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("schedule-form");
    const table = document.getElementById("schedule-table");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const day = document.getElementById("day").value;
        const subject = document.getElementById("subject").value;
        const time = document.getElementById("time").value;

        if (day && subject && time) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${day}</td>
                <td>${subject}</td>
                <td>${time}</td>
                <td><button class="delete-btn">Remove</button></td>
            `;
            table.appendChild(row);

            // Save schedule in local storage
            saveSchedule(day, subject, time);

            // Add delete functionality
            row.querySelector(".delete-btn").addEventListener("click", function () {
                row.remove();
                removeSchedule(day, subject, time);
            });

            // Clear input fields
            form.reset();
        }
    });

    // Load saved schedules on page load
    loadSchedule();

    function saveSchedule(day, subject, time) {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        schedules.push({ day, subject, time });
        localStorage.setItem("schedules", JSON.stringify(schedules));
    }

    function loadSchedule() {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        schedules.forEach((schedule) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${schedule.day}</td>
                <td>${schedule.subject}</td>
                <td>${schedule.time}</td>
                <td><button class="delete-btn">Remove</button></td>
            `;
            table.appendChild(row);

            row.querySelector(".delete-btn").addEventListener("click", function () {
                row.remove();
                removeSchedule(schedule.day, schedule.subject, schedule.time);
            });
        });
    }

    function removeSchedule(day, subject, time) {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        schedules = schedules.filter((s) => !(s.day === day && s.subject === subject && s.time === time));
        localStorage.setItem("schedules", JSON.stringify(schedules));
    }
});
