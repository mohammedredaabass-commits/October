const usernameInput = document.getElementById("username");
const loginButton = document.getElementById("loginButton");


function startJourney() {

    const username = usernameInput.value.trim();

    if (username === "") {

        usernameInput.focus();

        usernameInput.style.borderColor = "#ef4444";

        return;
    }


    /* حفظ اسم المستخدم */

    localStorage.setItem(
        "octoberUsername",
        username
    );


    /* إعطاء أمر لصفحة Home بتشغيل الصوت */

    localStorage.setItem(
        "playWelcomeAudio",
        "true"
    );


    /* الانتقال إلى الصفحة الرئيسية */

    window.location.href = "home.html";
}


/* زر الدخول */

loginButton.addEventListener(
    "click",
    startJourney
);


/* إزالة رسالة الخطأ عند الكتابة */

usernameInput.addEventListener(
    "input",
    function () {

        usernameInput.style.borderColor =
            "#e2e8f0";

    }
);


/* الضغط على Enter */

usernameInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            startJourney();

        }

    }
);