import { prisma } from 'lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get('skip');
  const take = request.nextUrl.searchParams.get('take');
  const cars = await prisma.car.findMany({
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined,
  });

  return new NextResponse(JSON.stringify(cars), { status: 200 });
}

export async function POST(req: Request) {
  try {
    const {
      make,
      model,
      year,
      color,
      bodyType,
      seatCapacity,
      fuelCapacity,
      rentPrice,
      description,
      location,
      ownerId,
    } = await req.json();

    const car = await prisma.car.create({
      data: {
        make,
        model,
        year,
        color,
        bodyType,
        seatCapacity,
        fuelCapacity,
        rentPrice,
        description,
        location,
        ownerId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        car: {
          make: car.make,
          model: car.model,
          year: car.year,
          color: car.color,
          bodyType: car.bodyType,
          seatCapacity: car.seatCapacity,
          fuelCapacity: car.fuelCapacity,
          rentPrice: car.rentPrice,
          description: car.description,
          location: car.location,
          ownerId: car.ownerId,
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
