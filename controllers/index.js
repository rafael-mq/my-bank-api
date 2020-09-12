const { accountSvc } = require("../services")

const controller = {
    
    create: async (req, res, next) => {
        try {
            const { name, balance } = req.body
    
            if (!name || balance === undefined) {
                res.status(400).send("Parâmetros invalidos")
                return next()
            }
    
            const [id, err] = await accountSvc.createAccount(name, balance)
            if (err) {
                res.status(err.code).send(err.msg)
                return next()
            }
            res.send({ id })
            return next()
            
        } catch (e) {
            console.error(e)
            res.status(500).send("Falha no servidor.")
            return next()
        }
    },

    deposit: async (req, res, next) => {
        try {
            const { id, value } = req.body
    
            if (!id || isNaN(value)) {
                res.status(400).send("Parâmetros invalidos")
                return next()
            }
            
            const [balance, err] = await accountSvc.deposit(id, value)
            if (err) {
                res.status(err.code).send(err.msg)
                return next()
            }
            res.send({ balance })
            return next()
            
        } catch (e) {
            console.error(e)
            res.status(500).send("Falha no servidor.")
            return next()
        }
    },
    
    withdraw: async (req, res, next) => {
        try {
            const { id, value } = req.body
    
            if (!id || isNaN(value)) {
                res.status(400).send("Parâmetros invalidos")
                return next()
            }
            
            const [balance, err] = await accountSvc.withdraw(id, value)
            if (err) {
                res.status(err.code).send(err.msg)
                return next()
            }
            res.send({ balance })
            return next()
            
        } catch (e) {
            console.error(e)
            res.status(500).send("Falha no servidor.")
            return next()
        }
    },

    balance: async (req, res, next) => {
        try {
            const { id } = req.query
    
            if (!id) {
                res.status(400).send("Parâmetros invalidos")
                return next()
            }
            
            const [balance, err] = await accountSvc.balance(id)
            if (err) {
                res.status(err.code).send(err.msg)
                return next()
            }
            res.send({ balance })
            return next()
            
        } catch (e) {
            console.error(e)
            res.status(500).send("Falha no servidor.")
            return next()
        }
    },

    remove: async (req, res, next) => {
        try {
            const { id } = req.body
    
            if (!id) {
                res.status(400).send("Parâmetros invalidos")
                return next()
            }
            
            const [_, err] = await accountSvc.removeAccount(id)
            if (err) {
                res.status(err.code).send(err.msg)
                return next()
            }
            res.send({ id })
            return next()
            
        } catch (e) {
            console.error(e)
            res.status(500).send("Falha no servidor.")
            return next()
        }
    },
}

module.exports = controller