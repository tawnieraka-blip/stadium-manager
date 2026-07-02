/* ==========================================
   Settings Page
========================================== */

const stadiumName = document.getElementById("stadiumName");

const associationName = document.getElementById("associationName");

const pricePerHour = document.getElementById("pricePerHour");

const themeSelect = document.getElementById("themeSelect");

const apiUrl = document.getElementById("apiUrl");

const apiStatus = document.getElementById("apiStatus");

const saveBtn = document.getElementById("saveSettings");

const resetBtn = document.getElementById("resetSettings");


//==============================
// تحميل الإعدادات
//==============================

loadSettings();

function loadSettings(){

    const settings = BookingStorage.getSettings();

    stadiumName.value = settings.stadiumName;

    associationName.value = settings.associationName;

    pricePerHour.value = settings.pricePerHour;

    themeSelect.value = settings.theme;

    apiUrl.value = settings.apiUrl;

    updateApiStatus();

}


//==============================
// حفظ
//==============================

saveBtn.onclick = () => {

    const settings = {

        stadiumName: stadiumName.value.trim(),

        associationName: associationName.value.trim(),

        pricePerHour: Number(pricePerHour.value),

        apiUrl: apiUrl.value.trim(),

        version: "1.0"

    };

    BookingStorage.saveSettings(settings);

    alert("تم حفظ الإعدادات بنجاح");

};


//==============================
// إعادة الضبط
//==============================

resetBtn.onclick = () => {

    if(!confirm("هل تريد إعادة الإعدادات الافتراضية؟"))
        return;

    BookingStorage.resetSettings();

    loadSettings();

};


//==============================
// تطبيق الثيم
//==============================

function applyTheme(theme){

    document.body.classList.remove("dark");

    if(theme==="dark"){

        document.body.classList.add("dark");

    }

}


//==============================
// حالة Google Sheets
//==============================

function updateApiStatus(){

    if(apiUrl.value.trim()===""){

        apiStatus.innerHTML="🔴 غير مربوط";

        apiStatus.style.color="red";

    }else{

        apiStatus.innerHTML="🟢 جاهز للربط";

        apiStatus.style.color="green";

    }

}
