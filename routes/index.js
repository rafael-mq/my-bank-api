const express = require('express')
const controller = require("../controllers")

const router = express.Router()

router.post('/', controller.create)
router.patch('/deposit', controller.deposit)
router.patch('/withdraw', controller.withdraw)
router.get('/balance', controller.balance)
router.delete('/', controller.remove)

module.exports = router;
