# Job Application Tracker

A full-stack web application that helps users track and manage job applications in one place. Users can add applications, update statuses, edit records, and monitor progress through a simple dashboard.

## Features

- **Dashboard:** View a quick summary of total applications by status such as Applied, Interview Scheduled, Offer Received, Rejected, and Withdrawn.
- **Application List:** See all job applications in a clean and responsive table layout.
- **Search & Filter:** Search applications by company or role and filter them by status.
- **Add & Edit:** Add new applications, update existing records, and manage notes easily.
- **Delete Applications:** Remove applications that are no longer needed.
- **Responsive UI:** Works smoothly on desktop and mobile devices.


## Tech Stack

- **Framework:** Next.js 
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database ORM:** Prisma
- **Database:** PostgreSQL 

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL local ( Neon)

### Setup Instructions

1. **Clone the project & install dependencies**

```bash
git clone <your-repository-url>
cd job-application-tracker
npm install

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
