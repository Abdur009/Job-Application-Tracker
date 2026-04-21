import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Same adapter initializing for seeding
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log(`Start seeding ...`);

    const defaultStatuses = [
        'Applied',
        'Interview Scheduled',
        'Offer Received',
        'Rejected',
        'Withdrawn'
    ];

    for (const label of defaultStatuses) {
        const status = await prisma.status.upsert({
            where: { label },
            update: {},
            create: { label },
        });
        console.log(`Upserted status: ${status.label}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
