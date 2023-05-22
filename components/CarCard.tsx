'use client';

import { FC, useState } from 'react';
import Image from 'next/image';

import Card from './Card';

import { Car } from '@/data/index';
import FavoriteIcon from '@/public/svg/favoriteIcon.svg'

interface CarCardProps {
    car: Car;
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
            <div className="flex h-full flex-col justify-between text-gray-400">
                <div className="flex justify-between">
                    <h2>{model}</h2>
                    <button
                        className="bg-blue-500 text-white border-transparent hover:bg-transparent hover:text-gray-900 text-xs py-2.5 px-5 sm:text-base sm:py-2.5 sm:px-5 rounded"
                    >
                        <p>Rent Now</p>
                    </button>
                </div>
            </div>
        </Card>
    )
}

export default CarCard;