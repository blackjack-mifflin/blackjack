const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

const seed = async() => {
    await prisma.avatar.create({
        data: {
            image_url: "https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-michael-scott.jpg/_jcr_content/renditions/original.JPEG?downsize=1200:*&output-format=webp&output-quality=70",
            avatar_name: "Michael"
        }
    })

    await prisma.avatar.create({
        data: {
            image_url: "https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-dwight-schrute.jpg/_jcr_content/renditions/original.JPEG?downsize=1200:*&output-format=webp&output-quality=70",
            avatar_name: "Dwight"
        }
    })

    await prisma.avatar.create({
        data: {
            image_url: "https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-pam-beesly.jpg/_jcr_content/renditions/original.JPEG?downsize=1200:*&output-format=webp&output-quality=70",
            avatar_name: "Pam"
        }
    })

    await prisma.avatar.create({
        data: {
            image_url: "https://roost.nbcuni.com/bin/viewasset.html/content/dam/Peacock/Landing-Pages/2-0-design/the-office/cast-the-office-jim-halpert.jpg/_jcr_content/renditions/original.JPEG?downsize=1200:*&output-format=webp&output-quality=70",
            avatar_name: "Jim"
        }
    })

    await prisma.player.create({
        data: {
            username: "blakegriffin",
            password: await bcrypt.hash("password1", 10),
            balance: 100,
            wins: 0,
            losses: 0,
            avatarId: 1
        }
    })

    await prisma.player.create({
        data: {
            username: "tombrady",
            password: await bcrypt.hash("password2", 10),
            balance: 100,
            wins: 0,
            losses: 0,
            avatarId: 2
        }
    })

    await prisma.player.create({
        data: {
            username: "robertdeniro",
            password: await bcrypt.hash("password3", 10),
            balance: 100,
            wins: 0,
            losses: 0,
            avatarId: 3
        }
    })

    await prisma.player.create({
        data: {
            username: "driftking",
            password: await bcrypt.hash("password4", 10),
            balance: 100,
            wins: 0,
            losses: 0,
            avatarId: 4    
        }
    })
    await prisma.player.create({
        data: {
            username: "tom",
            password: await bcrypt.hash("tom", 10),
            balance: 100,
            wins: 0,
            losses: 0,
            avatarId: 3
        }
    })
    console.log("Successfully seeded")
};

seed();