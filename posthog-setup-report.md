<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into DevEvent, a Next.js App Router application. The integration includes client-side event tracking for the two primary user interactions on the home page, a reverse proxy via Next.js rewrites, error tracking via `capture_exceptions`, and a PostHog dashboard with five insights covering engagement patterns and conversion.

## Changes made

| File | Change |
|------|--------|
| `instrumentation-client.ts` | New file — initializes PostHog client-side using the Next.js 15.3+ instrumentation pattern with reverse proxy host, error tracking, and debug mode in development |
| `next.config.ts` | Added `rewrites()` for `/ingest/*` → PostHog US ingestion + asset proxy; added `skipTrailingSlashRedirect: true` |
| `app/components/ExploreBtn.tsx` | Added `posthog.capture("explore_events_clicked")` in the button onClick handler |
| `app/components/EventCard.tsx` | Converted to `"use client"` component; added `posthog.capture("event_card_clicked", {...})` on Link click with `event_title`, `event_slug`, `event_location`, and `event_date` properties |
| `.env.local` | Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |
| `package.json` | Added `posthog-js` and `posthog-node` dependencies |

## Events tracked

| Event | Description | File |
|-------|-------------|------|
| `explore_events_clicked` | User clicks the "Explore Events" button — top of engagement funnel | `app/components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card, indicating interest in a specific developer event; includes `event_title`, `event_slug`, `event_location`, `event_date` properties | `app/components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1634848)
- [Explore Events button clicks](/insights/jJmVDhVy) — daily trend of explore button presses
- [Event card clicks over time](/insights/TJ4lMgme) — daily trend of event card interactions
- [Most clicked events by title](/insights/Ogj4EaE1) — bar chart showing which events attract the most interest
- [Unique visitors engaging with events](/insights/hgD2zsa6) — daily unique users clicking event cards
- [Explore-to-click conversion rate](/insights/Rxf6NlMo) — ratio of event card clicks to explore button presses

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
