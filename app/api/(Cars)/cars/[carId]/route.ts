import { prisma } from 'lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { carId: string } }
) {
  const id = params.carId;
  const restaurant = await prisma.car.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  return new NextResponse(JSON.stringify(restaurant), { status: 200 });
}

export async function PUT(
  request: Request,
  { params }: { params: { carId: string } }
) {
  const id = params.carId;
  const json = await request.json();

  const updated = await prisma.car.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      make: json.make || null,
      model: json.address || null,
      year: json.year || null,
      color: json.color || null,
      bodyType: json.bodyType || null,
      seatCapacity: json.seatCapacity || null,
      fuelCapacity: json.fuelCapacity || null,
      rentPrice: json.rentPrice || null,
      description: json.description || null,
      location: json.location || null,
    },
  });

  return new NextResponse(JSON.stringify(updated), { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { carId: string } }
) {
  const id = params.carId;
  const json = await request.json();

  const updated = await prisma.car.update({
    where: {
      id: parseInt(id, 10),
    },
    data: json,
  });

  return new NextResponse(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { carId: string } }
) {
  const id = params.carId;

  const deleted = await prisma.car.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return new NextResponse(JSON.stringify(deleted), { status: 200 });
}
