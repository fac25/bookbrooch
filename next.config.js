/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

// see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// https://github.com/motdotla/dotenv
// Create a .env file in the root 
// Install dotenv module
// Import and configure dotenv
// process.env now has the keys and values you defined in your .env file
import * as dotenv from "dotenv"; 
dotenv.config();

export default nextConfig;
