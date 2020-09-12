const fsall = require("fs");
const fs = fsall.promises;

class Database {
    constructor(filename) {
        this.filename = filename;
        this._data = [];
    }

    async init() {
        var that = this;
        console.log("initializing db");
        if (fsall.existsSync(this.filename)) {
            this._data = JSON.parse(await fs.readFile(this.filename, "utf-8"));
            if (this._data) {
                console.log(
                    `There ${this._data.length === 1 ? "is" : "are"} ${this._data.length} account${
                        this._data.length === 1 ? "" : "s"
                    }.`
                );
                return;
            }
        }
        console.log("No accounts found");
    }

    _save = async () => await fs.writeFile(this.filename, JSON.stringify(this._data), "utf-8");

    insert = async (account) => {
        this._data.push(account);
        await this._save();
    };

    getById = (id) => {
        const idx = this._data.findIndex((el) => el.id == id);
        return idx !== undefined ? this._data[idx] : null;
    };

    update = async (account) => {
        const idx = this._data.findIndex((el) => el.id == account.id);
        if (idx < 0) return null;

        this._data[idx] = account;
        await this._save();
    };

    remove = async (id) => {
        const idx = this._data.findIndex((el) => el.id == id);
        if (idx < 0) return null;

        const acc = this._data.splice(idx, 1);
        await this._save();
        return acc;
    };
}

const db = new Database("accounts.json");

module.exports = db;
