/* ==========================================
   Statistics Page
   Stadium Manager v1.0
========================================== */

const monthSelect = document.getElementById("monthSelect");

monthSelect.addEventListener("change", loadStatistics);

loadStatistics();

function loadStatistics() {

    const selectedMonth = Number(monthSelect.value);

    const allBookings = BookingStorage.getBookings();

    let bookings = allBookings;

    // تصفية حسب الشهر
    if (selectedMonth !== 0) {

        bookings = allBookings.filter(item => {

            const month =
                new Date(item.date).getMonth() + 1;

            return month === selectedMonth;

        });

    }

    const confirmed =
        bookings.filter(item => item.status === "confirmed");

    const pending =
        bookings.filter(item => item.status === "pending");

    let totalIncome = 0;

    let totalHours = 0;

    const teams = new Set();

    const teamCounter = {};

    confirmed.forEach(item => {

        totalIncome += Number(item.total);

        totalHours += Number(item.hours);

        teams.add(item.team);

        if (!teamCounter[item.team]) {

            teamCounter[item.team] = 0;

        }

        teamCounter[item.team]++;

    });

    // أكثر فريق حجزاً

    let topTeam = "---";

    let maxBookings = 0;

    for (const team in teamCounter) {

        if (teamCounter[team] > maxBookings) {

            maxBookings = teamCounter[team];

            topTeam = team;

        }

    }

    // متوسط قيمة الحجز

    let average = 0;

    if (confirmed.length > 0) {

        average = Math.round(

            totalIncome /

            confirmed.length

        );

    }

    // عرض النتائج

    document.getElementById("incomeValue").textContent =
        totalIncome + " ريال";

    document.getElementById("hoursValue").textContent =
        totalHours + " ساعة";

    document.getElementById("teamsValue").textContent =
        teams.size;

    document.getElementById("confirmedValue").textContent =
        confirmed.length;

    document.getElementById("pendingValue").textContent =
        pending.length;

    document.getElementById("topTeamValue").textContent =
        topTeam;

    document.getElementById("averageValue").textContent =
        average + " ريال";

}
