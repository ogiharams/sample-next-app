import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "blogjamstack" || "",
  apiKey: process.env.API_KEY || "",
});
