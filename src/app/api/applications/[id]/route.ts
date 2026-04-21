import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const application = await prisma.application.findUnique({
            where: { id },
            include: { status: true }
        });
        if (!application) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!body.company || !body.role || !body.statusId) {
            return NextResponse.json({ error: 'Company, Role and Status are required' }, { status: 400 });
        }

        const application = await prisma.application.update({
            where: { id },
            data: {
                company: body.company,
                role: body.role,
                dateApplied: new Date(body.dateApplied),
                statusId: body.statusId,
                notes: body.notes,
                source: body.source,
            },
        });

        return NextResponse.json(application);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.application.delete({ where: { id } });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
    }
}
