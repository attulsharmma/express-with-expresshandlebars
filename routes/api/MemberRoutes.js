import express from "express";
import shortid from "shortid";
import members from "../../Members.js";
const router = express.Router();

//Get all Members

router.get("/", (req, res) => res.status(200).json(members));

//Get Member by id

router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

//Create a Member

router.post("/", (req, res) => {
  const newMember = {
    id: shortid.generate(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: "Please include name and email" });
  }
  members.push(newMember);
  res.json(members);
  // res.redirect("/");
});

//Update member data

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updatedMember = req.body;
    members.map((member) => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updatedMember.name ? updatedMember.name : member.name),
          (member.email = updatedMember.email
            ? updatedMember.email
            : member.email);
        res.json({ message: "Member wa updated", member });
      }
    });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

//Delete

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      message: "Member deleted successfully",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

export default router;
