# 💪 FitLog — Workout Library

> Train with intent. Log every set.

FitLog is a dark, no-nonsense gym companion. Browse a library of twelve lifts, open any workout for specs and step-by-step instructions, lock it into today's plan or save it for later, and watch your minutes and calories add up.

- Live link: http://localhost:3000


## Technologies Used

| Technology | Purpose |
|
| Next.js 15 (App Router) | UI, routing, dynamic `/workout/[id]` route, custom 404 |
| React 19 | Components, context state |
| Tailwind CSS v4 | Styling and responsive layout |
| lucide-react | Icons |
| react-hot-toast | Toast notifications |
| Fitlog REST API | Workout data (with automatic fallback to the alternative API) |

##  Key Features

1. Workout library — responsive grid (1 → 2 → 3 → 4 columns) of cards showing image, muscle tags, equipment, duration, calories and rating, with a loading animation while data is fetched.
2. Sort & search — "Sort By" dropdown (Duration, Calories, Rating) plus live search by workout name or muscle group.
3. Workout details — two-column layout with key specs panel, numbered instructions, and "Add to today's plan" / "Save for later" actions with toasts.
4. My Plan page — live Exercises / Minutes / Calories metrics, Today's Plan and Saved tabs, loading and empty states, View Details, Mark as Done and Remove actions.
5. Live navbar counters — Plan (filled) and Saved (outlined) badges update instantly and link to `/my-plan`.
6. Persistence & limits — plan and saved lists survive reloads via `localStorage`; today's plan is capped at 5 lifts.
7. Resilient by design — custom 404 page, API fallback endpoint, error + retry state, fully responsive on mobile, tablet and desktop.

##  Getting Started

```bash
npm install
npm run dev      # http://localhost:3000/
npm run build    # production build
npm start        # serve the production build
```

##  Project Structure

```
app/
  layout.js            Root layout (navbar, footer, toaster)
  page.js              Home: hero + library
  workout/[id]/page.js Workout details
  my-plan/page.js      Plan / Saved log
  not-found.js         404 page
components/            Navbar, Footer, Hero, Library, WorkoutCard, Spinner, ...
lib/api.js             API client with fallback
lib/store.js           Plan / saved / done state + localStorage
```

