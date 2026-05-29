"use client";

import { creatBooking } from "@/lib/actions/booking.action";
import posthog from "posthog-js";
import { useState } from "react";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSUbmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await creatBooking({ eventId, slug, email });

    if (result.success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });
    } else if (result.error === "duplicate") {
      setError("You have already booked this event with that email.");
    } else {
      console.error("Booking creation failed");
      posthog.captureException("Booking creation failed");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSUbmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" className="button-submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
