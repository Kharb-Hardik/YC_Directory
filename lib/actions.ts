"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  const startup = {
    _type: "startup",
    title,
    description,
    category,
    image: link,
    slug: {
      _type: "slug",
      current: slug,
    },
    author: {
      _type: "reference",
      _ref: session?.id,
    },
    pitch,
  };

  console.log("Startup object:", startup);

  try {
    const result = await writeClient.create(startup);
  
    if (!result || !result._id) {
      throw new Error("Failed to create startup: Missing _id in result.");
    }
  
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error creating pitch:", error);
  
    // Narrow the type of `error`
    if (error instanceof Error) {
      return parseServerActionResponse({
        error: error.message, // Access the message safely
        status: "ERROR",
      });
    }
  
    // Fallback for unknown error types
    return parseServerActionResponse({
      error: "An unknown error occurred",
      status: "ERROR",
    });
  }  
};
