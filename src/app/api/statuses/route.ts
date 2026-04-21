import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const statuses = await prisma.status.findMany({
            orderBy: { label: 'asc' },
        });
        return NextResponse.json(statuses);
    } catch (error) {
        console.error('Failed to fetch statuses', error);
        return NextResponse.json({ error: 'Failed to fetch statuses' }, { status: 500 });
    }
}
