const themeButton =
    document.getElementById("themeButton");


let darkMode =
    localStorage.getItem("octoberTheme") === "dark";


function applyTheme() {

    if (darkMode) {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

    } else {

        document.body.classList.remove("dark-mode");

        themeButton.textContent = "🌙";

    }

}


themeButton.addEventListener("click", function () {

    darkMode = !darkMode;

    localStorage.setItem(
        "octoberTheme",
        darkMode ? "dark" : "light"
    );

    applyTheme();

});


applyTheme();