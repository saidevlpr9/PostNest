const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

// Sign-in route with correct async handling
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Await the password match method
    const user = await User.matchPassword(email, password);
    console.log("Authenticated User:", user);

    // You can set a session or cookie here for authentication if needed
    // req.session.user = user; (if using sessions)
    
    return res.redirect("/");  // Redirect to homepage or dashboard on successful login
  } catch (error) {
    console.error("Authentication Error:", error.message);
    
    // Render signin page with an error message
    return res.status(401).render("signin", { error: "Invalid email or password." });
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

// Sign-up route with error handling
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Create a new user in the database
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/signin");  // Redirect to sign-in page after successful registration
  } catch (error) {
    console.error("Sign-Up Error:", error.message);

    // Handle unique email constraint error or any other issues
    return res.status(400).render("signup", { error: "Failed to create account. Email may already be in use." });
  }
});

module.exports = router;
