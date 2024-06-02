import express from "express";
import dotenv from "dotenv";
import { Webhook } from "svix";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Users from "./model/users/users.mongo.js";

dotenv.config();
const app = express();
const uri = process.env.MONGODB_URI;

// mongodb connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/test", (req, res) => {
  res.send({ message: "Hello World" });
});

app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    console.log("====================================");
    console.log("Webhook received");
    console.log("====================================");
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("You need a WEBHOOK_SECRET in your .env");
    }

    // Get the headers and body
    const headers = req.headers;
    const payload = req.body;

    // Get the Svix headers for verification
    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required headers",
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.log("Error verifying webhook:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data;
    const eventType = evt.type;

    console.log("====================================");
    console.log(evt.type);
    console.log("====================================");

    if (evt.type === "user.created") {
      console.log("====================================");
      console.log(evt.data);
      console.log("====================================");
      const firstName = evt.data.first_name;
      const lastName = evt.data.last_name;
      const email = evt.data.email_addresses[0].email_address;

      // Save the user to your database
      Users.create({
        clerkID: id,
        firstName,
        lastName,
        email,
      })
        .then((user) => {
          return res.status(200).json({
            success: true,
            message: "User created",
            user,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            success: false,
            message: "Error creating user",
            error,
          });
        });
    }
  }
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log(`Server is running on port ${PORT}`);
  console.log("====================================");
});
