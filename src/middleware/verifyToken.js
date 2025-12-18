import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase.js";

/**
 * Middleware to verify JWT access token and refresh token
 * - Validates access token
 * - If expired, attempts to refresh using refresh token
 * - Sets new tokens as httpOnly cookies
 * - If both tokens are invalid/expired, returns 401 Unauthorized
 */
export const verifyToken = async (req, res, next) => {
  try {
    // Get tokens from cookies
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // If no tokens provided
    if (!accessToken && !refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No access token or refresh token provided. Please login.",
        statusCode: 401,
      });
    }

    // If access token exists, verify it
    if (accessToken) {
      try {
        const decoded = jwt.verify(
          accessToken,
          process.env.SUPABASE_JWT_SECRET || ""
        );
        req.user = decoded;
        req.accessToken = accessToken;
        return next();
      } catch (error) {
        // Access token is invalid or expired
        if (error.name === "TokenExpiredError") {
          console.log("Access token expired, attempting to refresh...");
          // Proceed to refresh logic below
        } else {
          return res.status(401).json({
            success: false,
            message: "Invalid access token.",
            statusCode: 401,
          });
        }
      }
    }

    // If access token is expired or missing, try to refresh using refresh token
    if (refreshToken) {
      try {
        // Use Supabase to refresh the session
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          return res.status(401).json({
            success: false,
            message:
              "Refresh token is invalid or expired. Please login again.",
            statusCode: 401,
          });
        }

        const newAccessToken = data.session.access_token;
        const newRefreshToken = data.session.refresh_token;

        // Verify the new access token
        const decoded = jwt.verify(
          newAccessToken,
          process.env.SUPABASE_JWT_SECRET || ""
        );

        // Set new tokens as httpOnly cookies
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Attach user info and tokens to request object
        req.user = decoded;
        req.accessToken = newAccessToken;
        req.refreshToken = newRefreshToken;

        console.log("Access token refreshed successfully");
        return next();
      } catch (error) {
        console.error("Token refresh error:", error.message);
        return res.status(401).json({
          success: false,
          message: "Failed to refresh access token. Please login again.",
          statusCode: 401,
        });
      }
    }

    // If we reach here, both tokens are missing or invalid
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please login.",
      statusCode: 401,
    });
  } catch (error) {
    console.error("Middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during token verification.",
      statusCode: 500,
    });
  }
};
