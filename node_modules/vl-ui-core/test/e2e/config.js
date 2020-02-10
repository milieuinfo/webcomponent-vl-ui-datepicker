let argv = require('yargs').argv;

function browserName() {
    if (argv) {
        if (argv.chrome) {
            return "chrome";
        } else if (argv.firefox) {
            return "firefox";
        } else if (argv.opera) {
            return "opera";
        } else if (argv.safari) {
            return "safari";
        } else {
            console.warn("Geen geldige browser gevonden, default Chrome browser!")
            return "chrome";
        }
    } else {
        console.error("Geen argumenten meegegeven!");
        process.exit(1);
    }
}

function gridEnabled() {
    return !!argv.grid;
}

module.exports = {
    browserName: browserName(),
    gridEnabled: gridEnabled(),
    gridUrl: "http://selenium-hub:4444/wd/hub",
    baseUrl: gridEnabled() ? 'http://tests:8080' : 'http://localhost:8080'
}
