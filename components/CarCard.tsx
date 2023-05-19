'use client';

import { FC, useState } from 'react';
import Image from 'next/image';

import Card from './Card';

import { ICar } from '@/data/index';

interface CarCardProps {
    car: ICar;
    breakpoint?: 'sm' | 'md';
}

const CarCard: FC<CarCardProps> = ({ car,breakpoint = 'md' }) => {
    const {
        id,
        model,
        bodyType,
        seatCapacity,
        fuelCapacity,
        rentPrice,
        location,
        ownerId,
    } = car;

    return (
        <Card breakpoint={breakpoint}>
            hello I'm amazing
        </Card>
    )
}

export default CarCard;