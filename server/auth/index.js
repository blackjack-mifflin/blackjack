import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('reached Auth router');
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await prisma.player.findUnique({ where: { username } });
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'Username not found.' });
    }

    // Compare entered password with stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // If valid, generate a JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({id: user.id, token: token});

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, balance, wins, losses, avatarId } = req.body;

    // Check if user already exists
    const userExists = await prisma.player.findUnique({ where: { username } });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = await prisma.player.create({
        data: {
            username,
            password: hashedPassword,
            balance: 100,
            wins: 0,
            losses: 0,
            avatarId: 1
        }
    });
    console.log(newUser)
    res.status(201).json({ message: 'User registered successfully', playerId: newUser.id });

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Please try again.'});
  }
});


module.exports = router;