import { Request, Response } from 'express';
import { MOCK_USERS } from '../models/User';
import { security } from '../services/SecurityService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user in the array by email
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    // 2. If user doesn't exist, return 401
    if (!user) {
      console.log(`Login failed: No user found with email ${email}`);
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    // 3. Compare the provided password with the stored hash
    const isValid = await security.verifyCredentials(password, user.passwordHash);

    if (isValid) {
      console.log(`Login successful: ${user.email} (${user.role})`);
      // Return the role so the Frontend knows where to navigate
      return res.status(200).json({
        message: "Login successful",
        role: user.role
      });
    } else {
      console.log(`Login failed: Wrong password for ${email}`);
      return res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};