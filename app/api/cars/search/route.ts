import { NextRequest, NextResponse } from 'next/server'
import { prisma } from 'lib/prisma';

export async function GET(req: Request) {
    const { searchParams } = req.nextUrl
    try {
        const make = searchParams.get('make')
        const seatCapacity = parseInt(searchParams.get('seatCapacity'))
        const type = searchParams.get('type')
        const location = searchParams.get('location')
        const price = parseFloat(searchParams.get('price'))
        const cars = await prisma.car.findMany({
            
            where: {
                AND: [
                    {
                        OR: [
                                { make: { contains: make || undefined } },
                                { model: { contains: make || undefined } },
                                null,
                        ]
                    },
                    {
                        seatCapacity: seatCapacity || undefined,
                        bodyType: type || undefined,
                        location: location || undefined,
                        rentPrice: {
                            lt: price || undefined
                        }
                    }
                ]
            }
        });

        return new NextResponse(JSON.stringify(cars), { status: 200 });
    } catch (err: any) {
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }

}