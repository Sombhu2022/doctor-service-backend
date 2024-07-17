import jwt from "jsonwebtoken";

export const tokenGenarate = (user) => {
   
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token
 
};