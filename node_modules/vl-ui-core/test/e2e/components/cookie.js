class Cookies {
    constructor(driver) {
        this._driver = driver;
    }

    async get(name) {
        const cookies = await this._driver.manage().getCookies();
        return new Cookie(cookies.find(cookie => {
            return cookie.name === name;
        }));
    }
}

class Cookie {
    constructor(cookie) {
        if (cookie) {
            this._value = cookie.value;
            delete cookie.value;
            Object.assign(this, cookie);
        }
    }

    get value() {
        return this._value ? JSON.parse(this._value) : undefined;
    }
}

module.exports = {
    Cookies: Cookies
};
