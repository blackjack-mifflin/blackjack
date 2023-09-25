const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { requireUser } = require('./utils')

router.get("/", async (req, res) => {
  try {
    const results = await prisma.player.findMany();
    res.send(results);
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const results = await prisma.player.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (results) {
      res.send(results);
    } else {
      res.send({ error: "Could not find user" });
    }
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {username, password} = req.body
    const hashPw = await bcrypt.hash(password, 10)
    const player = await prisma.player.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        username: username,
        password: hashPw
      }
    });
    if (player) {
      res.send(player);
    } else {
      res.send({ error: "Error finding user" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/bet/:id", async (req, res) => {
  try {
    // const { balance } = await prisma.player.findUnique({
    //   select: { balance: true },
    //   where: { id: Number(req.params.id) },
    // });
    const balance = req.body.balance;
    const player = await prisma.player.update({
      where: {
        id: Number(req.params.id),
      },
      data: { balance: balance },
    });
    if (player) {
      res.send(player);
    } else {
      res.send({ error: "Error finding balance" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/bet/:id", async (req, res) => {
  try {
    const { balance } = await prisma.player.findUnique({
      select: { balance: true },
      where: { id: Number(req.params.id) },
    });
    console.log(balance);
    res.send({ balance });
  } catch (error) {
    res.send(error);
  }
});

router.put("/add/:id", async (req, res) => {
  try {
    const { balance } = await prisma.player.findUnique({
      select: { balance: true },
      where: { id: Number(req.params.id) },
    });
    const player = await prisma.player.update({
      where: {
        id: Number(req.params.id),
      },
      data: { balance: balance },
    });
    if (player) {
      res.send(player);
    } else {
      res.send({ error: "Error finding balance" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.put("/add/wins/:id", async (req, res) => {
  try {
    const { wins } = await prisma.player.findUnique({
      select: { wins: true },
      where: { id: Number(req.params.id) },
    });
    const player = await prisma.player.update({
      where: {
        id: Number(req.params.id),
      },
      data: { wins: wins + 1 },
    });
    if (player) {
      res.send(player);
    } else {
      res.send({ error: "Error finding balance" });
    }
  } catch (error) {
    res.send(error);
  }
});


router.put("/add/losses/:id", async (req, res) => {
  try {
    const { losses } = await prisma.player.findUnique({
      select: { losses: true },
      where: { id: Number(req.params.id) },
    });
    const player = await prisma.player.update({
      where: {
        id: Number(req.params.id),
      },
      data: { losses: losses + 1 },
    });
    if (player) {
      res.send(player);
    } else {
      res.send({ error: "Error finding balance" });
    }
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;
