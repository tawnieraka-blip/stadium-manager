console.log("app.js Loaded");
function updateClock() {

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
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر"
    ];

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("ar-EG");

    document.getElementById("day").textContent =
        days[now.getDay()];

    document.getElementById("date").textContent =
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

c
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
}
