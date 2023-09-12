const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const results = await prisma.player.findMany();
        res.send(results)
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const results = await prisma.player.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        if (results) {
            res.send(results)
        } else {
            res.send({error: "Could not find user"})
        }
    } catch (err) {
        res.send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const player = await prisma.player.update({
            where: {
                id: Number(req.params.id)
            },
            body: req.body
        })
        if (player) {
            res.send(player);
        } else {
            res.send({ error: "Error finding user" });
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;