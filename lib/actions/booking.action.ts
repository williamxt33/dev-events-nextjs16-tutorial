"use server";

import Booking from "@/database/booking.model";
import connectDB from "@/lib/mongodb";

export const creatBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  try {
    await connectDB();
    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (e: any) {
    if (e?.code === 11000) {
      return { success: false, error: "duplicate" };
    }
    console.log("creat booking failed", e);
    return { success: false, error: "unknown" };
  }
};
