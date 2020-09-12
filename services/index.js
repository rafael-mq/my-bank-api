const { v4: uuidv4 } = require('uuid');
const db = require("../database")

const accountSvc = {
    createAccount: async (name, balance) => {
        const newAccount = {
            name,
            balance,
            id: uuidv4()
        }

        const account = await db.insert(newAccount)
        return [newAccount.id, null]
    },

    deposit: async (id, value) => {
        let account = await db.getById(id)
        if (!account) {
            return [null, {code: 404, msg: "Conta não encontrada."}]
        }

        account.balance += value
        await db.update(account)
        return [account.balance, null]
    },
    
    withdraw: async (id, value) => {
        let account = await db.getById(id)
        if (!account) {
            return [null, {code: 404, msg: "Conta não encontrada."}]
        }
        if(account.balance < value) {
            return [null, {code: 405, msg: "Saldo Insuficiente."}]
        }
        account.balance -= value
        await db.update(account)
        return [account.balance, null]
    },

    balance: async (id) => {
        let account = await db.getById(id)
        if (!account) {
            return [null, {code: 404, msg: "Conta não encontrada."}]
        }
        return [account.balance, null]
    },

    removeAccount: async(id) => {
        let account = await db.remove(id)
        if (!account) {
            return [null, {code: 404, msg: "Conta não encontrada."}]
        }
        return [account.name, null]
    }
}

module.exports = { accountSvc }