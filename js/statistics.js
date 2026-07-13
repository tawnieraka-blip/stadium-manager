/* ==========================================
   Stadium Manager
   statistics.js v4.0
========================================== */

//==============================
// عناصر الصفحة
//==============================

const incomeValue = document.getElementById("incomeValue");
const hoursValue = document.getElementById("hoursValue");
const teamsValue = document.getElementById("teamsValue");
const confirmedValue = document.getElementById("confirmedValue");
const pendingValue = document.getElementById("pendingValue");
const topTeamValue = document.getElementById("topTeamValue");
const averageValue = document.getElementById("averageValue");
const monthSelect = document.getElementById("monthSelect");

//==============================
// البداية
//==============================

init();

async function init(){

    await loadStatistics();

    if(monthSelect){

        monthSelect.addEventListener("change", loadStatistics);

    }

}

//==============================
// تحميل الإحصائيات
//==============================

async function loadStatistics(){

    try{

        const bookings = await BookingAPI.getBookings();

        if(!Array.isArray(bookings)){

            return;

        }

        let data = bookings;

        // فلترة بالشهر
        if(monthSelect && monthSelect.value !== "0"){

            const month = Number(monthSelect.value);

            data = bookings.filter(item=>{

                const d = new Date(item.date);

                return (d.getMonth()+1) === month;

            });

        }

        calculateStatistics(data);

    }catch(error){

        console.error(error);

        alert("تعذر تحميل الإحصائيات");

    }

}

//==============================
// حساب الإحصائيات
//==============================

function calculateStatistics(bookings){

    let income = 0;

    let hours = 0;

    let confirmed = 0;

    let pending = 0;

    const teams = new Set();

    const teamCounter = {};

    bookings.forEach(item=>{

        teams.add(item.team);

        if(item.status === "confirmed"){

            confirmed++;

            income += Number(item.total) || 0;

            hours += Number(item.hours) || 0;

        }else{

            pending++;

        }

        if(!teamCounter[item.team]){

            teamCounter[item.team] = 0;

        }

        teamCounter[item.team]++;

    });

    // أكثر فريق

    let topTeam = "---";

    let max = 0;

    Object.keys(teamCounter).forEach(team=>{

        if(teamCounter[team] > max){

            max = teamCounter[team];

            topTeam = team;

        }

    });

    // متوسط قيمة الحجز

    const average =

        bookings.length

        ?

        Math.round(

            income / bookings.length

        )

        :

        0;

    // عرض النتائج

    incomeValue.textContent = income + " ريال";

    hoursValue.textContent = hours;

    teamsValue.textContent = teams.size;

    confirmedValue.textContent = confirmed;

    pendingValue.textContent = pending;

    topTeamValue.textContent = topTeam;

    averageValue.textContent = average + " ريال";

}
