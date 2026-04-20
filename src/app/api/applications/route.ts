import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { dateApplied: 'desc' },
        });
        return NextResponse.json(applications);
    } catch (error) {
        console.error('Failed to fetch applications', error);
        return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { company, role, dateApplied, status, notes, source } = body;

        // Basic Validation
        if (!company || !role || !dateApplied) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const application = await prisma.application.create({
            data: {
                company,
                role,
                dateApplied: new Date(dateApplied),
                status: status || 'Applied',
                notes,
                source,
            },
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error('Failed to create application', error);
        return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
    }
}
