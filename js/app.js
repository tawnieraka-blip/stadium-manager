console.log("app.js Loaded");
function updateClock() {

    console.log("updateClock");

    const clock = document.getElementById("clock");
    const day = document.getElementById("day");
    const date = document.getElementById("date");

    console.log(clock, day, date);

    if (!clock || !day || !date) {
        console.log("Elements not found");
        return;
    }

    const now = new Date();

    const days = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
    ];

    const months = [
        "يناير","فبراير","مارس","أبريل","مايو","يونيو",
        "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"
    ];

    clock.textContent = now.toLocaleTimeString("ar-EG");

    day.textContent = days[now.getDay()];

    date.textContent =
        `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

}

//==============================
// تحديث عدادات الحجوزات
//==============================

function updateCounters() {

    const pending = BookingStorage.getPending().length;
    const confirmed = BookingStorage.getConfirmed().length;

    const pendingBadge = document.getElementById("pendingCount");
    const confirmedBadge = document.getElementById("confirmedCount");

    if (pendingBadge) {

        pendingBadge.textContent = pending > 99 ? "99+" : pending;

        pendingBadge.style.display = pending === 0 ? "none" : "flex";

      }

    if (confirmedBadge) {

        confirmedBadge.textContent = confirmed > 99 ? "99+" : confirmed;

        confirmedBadge.style.display = confirmed === 0 ? "none" : "flex";

    }

}

//==============================
// تشغيل الصفحة
//==============================

updateClock();

updateCounters();

setInterval(updateClock, 1000);
