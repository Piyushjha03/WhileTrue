import Users from "../model/users/users.mongo.js";

export async function getUserInfo(req, res) {
  const clerkID = req.body.clerkID;
  await Users.findOne({ clerkID: clerkID })
    .populate("courses")
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
