/*====================================
تحويل الوقت إلى 12 ساعة
====================================*/

function formatTime12(time){

    if(!time) return "--";

    let parts = time.split(":");

    let hour = parseInt(parts[0]);

    let minute = parts[1];

    let period = "ص";

    if(hour >= 12){

        period = "م";

    }

    hour = hour % 12;

    if(hour === 0){

        hour = 12;

    }

    return `${String(hour).padStart(2,"0")}:${minute} ${period}`;

}
