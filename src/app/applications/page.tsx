import prisma from '@/lib/prisma';
import ApplicationsClient from './ApplicationsClient';

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
    const applications = await prisma.application.findMany({
        orderBy: { dateApplied: 'desc' },
    });

    return <ApplicationsClient initialData={applications} />;
}
