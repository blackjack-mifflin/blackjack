const { PrismaClient } = require("@prisma/client");
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const userExists = await prisma.player.findUnique({ where: { username } });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await prisma.player.findUnique({ where: { username } });
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
    res.send({id: user.id, token: token, isAdmin: user.isAdmin});

  } catch (error) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});


module.exports = router;