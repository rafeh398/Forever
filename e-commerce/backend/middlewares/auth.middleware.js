import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Exactly! In simple terms, the verifyJWT middleware finds the logged-in user 
// by checking the provided access token, verifying it, and then fetching the corresponding user from the database.
//  If everything checks out, it makes the user's information available for the rest of the request processing. 
//  If not, it stops the request with an error.
//ye middle ware fid krega k ap true loggin ho




export const verifyJWT = asyncHandler(async (req, res, next) => {
  // Get token from cookies 
  const token =
    req.cookies?.accessToken || req.body.accessToken;
    

  if (!token) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach user to request object for downstream use
    req.user = user;  //req.user is current user if user is logged in
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});