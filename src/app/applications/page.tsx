import prisma from '@/lib/prisma';
import ApplicationsClient from './ApplicationsClient';

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
    const applications = await prisma.application.findMany({
        include: { status: true },
        orderBy: { dateApplied: 'desc' },
    });

    const statuses = await prisma.status.findMany({
        orderBy: { label: 'asc' },
    });

    return <ApplicationsClient initialData={applications} statuses={statuses} />;
}
