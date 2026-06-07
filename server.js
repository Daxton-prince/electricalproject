
require("dotenv").config();

const express = require("express");
const { Resend } = require("resend");

const app = express();

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send", async (req, res) => {

    const {
        name,
        phone,
        location,
        projectType,
        message
    } = req.body;

    try {

        await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `New Enquiry from ${name}`,
            html: `
                <h2>New Project Enquiry</h2>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Location:</strong> ${location || "Not Provided"}</p>
                <p><strong>Project Type:</strong> ${projectType || "Not Provided"}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({
            success: true,
            message: "Enquiry sent successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to send enquiry."
        });

    }
});

module.exports = app;