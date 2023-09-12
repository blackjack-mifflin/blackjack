const router = require("express").Router();
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const results = await prisma.avatar.findMany();
        res.send(results)
    } catch (err) {
        res.send(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const results = await prisma.avatar.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (results) {
            res.send(results)
        } else {
            res.send({error: "Could not find Avatar"})
        }
    } catch (err) {
        res.send(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const avatar = await prisma.avatar.update({
            where: {
                id: Number(req.params.id)
            },
            body: req.body
        })
        if (avatar) {
            res.send(avatar);
        } else {
            res.send({ error: "Error finding avatar" });
        }
    } catch (error) {
        res.send(error);
    }
})

module.exports = router