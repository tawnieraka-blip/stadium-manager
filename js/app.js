function updateClock(){

const now=new Date();

const days=[
"الأحد",
"الاثنين",
"الثلاثاء",
"الأربعاء",
"الخميس",
"الجمعة",
"السبت"
];

const months=[
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

document.getElementById("clock").innerHTML=
now.toLocaleTimeString('ar-EG');

document.getElementById("day").innerHTML=
days[now.getDay()];

document.getElementById("date").innerHTML=
`${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

}

updateClock();

setInterval(updateClock,1000);

//==============================
// تحديث العدادات
//==============================

function updateCounters(){

    const pending = BookingStorage.getPending().length;

    const confirmed = BookingStorage.getConfirmed().length;

    document.getElementById("pendingCount").textContent = pending;

    document.getElementById("confirmedCount").textContent = confirmed;

}
