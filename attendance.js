document.addEventListener("DOMContentLoaded", function () {
    const students = ["Aarav", "Mira", "Ishaan", "Riya", "Kabir"]; // Sample students
    const tableBody = document.getElementById("attendance-body");
    const saveBtn = document.getElementById("save-attendance");

    function loadStudents() {
        tableBody.innerHTML = "";
        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student}</td>
                <td>
                    <select class="attendance-status">
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function saveAttendance() {
        const date = document.getElementById("date").value;
        if (!date) {
            alert("Please select a date!");
            return;
        }

        const attendanceData = [];
        document.querySelectorAll("#attendance-body tr").forEach(row => {
            const name = row.cells[0].textContent;
            const status = row.querySelector(".attendance-status").value;
            attendanceData.push({ name, status });
        });

        localStorage.setItem(`attendance_${date}`, JSON.stringify(attendanceData));
        alert("Attendance saved successfully!");
    }

    saveBtn.addEventListener("click", saveAttendance);
    loadStudents();
});
document.addEventListener("DOMContentLoaded", function () {
    const students = ["Aarav", "Mira", "Ishaan", "Riya", "Kabir"]; // Sample students
    const tableBody = document.getElementById("attendance-body");
    const saveBtn = document.getElementById("save-attendance");

    function loadStudents() {
        tableBody.innerHTML = "";
        students.forEach(student => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student}</td>
                <td>
                    <select class="attendance-status">
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function saveAttendance() {
        const date = document.getElementById("date").value;
        if (!date) {
            alert("Please select a date!");
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,Date,Student,Status\n";
        document.querySelectorAll("#attendance-body tr").forEach(row => {
            const name = row.cells[0].textContent;
            const status = row.querySelector(".attendance-status").value;
            csvContent += `${date},${name},${status}\n`;
        });

        // Create a download link
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `attendance_${date}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    saveBtn.addEventListener("click", saveAttendance);
    loadStudents();
});
