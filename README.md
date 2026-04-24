# Job Application Tracker

A full-stack web application that helps users track and manage job applications in one place. Users can add applications, update statuses, edit records, and monitor progress through a simple dashboard.

## Features

- **Dashboard:** At-a-glance summary cards for various application statuses (Applied, Interviewing, Offered, Rejected, Withdrawn).
- **Application List:** A responsive tabular UI displaying all applications, ordered by chronological recency.
- **Search & Filter:** Find applications by company or role and filter them dynamically based on application status.
- **Add & Edit:** Intuitive form experiences to log new applications, update status transitions, and add notes.
- **Modern UI:** Built thoughtfully with responsive, clean Tailwind CSS.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database ORM:** Prisma
- **Database:** PostgreSQL (Designed for compatibility, easily adaptable to Neon, Supabase, or a local instance)

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL local or hosted database (e.g., Neon or Supabase)

### Setup Instructions

1. **Clone the project & install dependencies**

   git clone <your-repository-url>
   cd job-application-tracker
   ```bash
   npm install
   ```

2. **Database configuration**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your_postgresql_connection-string"
   ```

3. **Initialize the database**
   
   Run the Prisma migration to create tables in your newly set Database.
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
  ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open browser**
   
   Visit [http://localhost:3000]
