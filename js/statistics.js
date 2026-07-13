/* ==========================================
   Stadium Manager
   statistics.js v4.0
========================================== */

//==============================
// عناصر الصفحة
//==============================

const bookingsCard = document.getElementById("bookingsCount");

const teamsCard = document.getElementById("teamsCount");

const hoursCard = document.getElementById("hoursCount");

const incomeCard = document.getElementById("incomeCount");

//==============================
// البداية
//==============================

init();

async function init(){

    await loadStatistics();

}

//==============================
// تحميل الإحصائيات
//==============================

async function loadStatistics(){

    try{

        const stats = await BookingAPI.getStatistics();

        if(!stats){

            alert("تعذر تحميل الإحصائيات");

            return;

        }

        bookingsCard.textContent = stats.bookings || 0;

        teamsCard.textContent = stats.teams || 0;

        hoursCard.textContent = stats.hours || 0;

        incomeCard.textContent = (stats.income || 0) + " ريال";

    }catch(error){

        console.error(error);

        alert("حدث خطأ أثناء تحميل الإحصائيات");

    }

}
