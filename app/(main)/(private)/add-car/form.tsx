'use client';

import { useState, FormEvent, ChangeEvent, ChangeEventHandler } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import crypto from 'crypto';
import { number, string } from 'prop-types';

const cloudinaryKey = "766964324596744";
const cloudinarySecret = 'tFIzw_6yDMXeMKPbX1O6XrpGVEU';

function calculateSHA1(timestamp: number, apiKey: string, apiSecret: string): string {
  const signaturePayload = `timestamp=${timestamp}&apiKey=${apiKey}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(signaturePayload).digest('hex');
  return signature;
}

const AddCarForm = () => {
  const [carDetail, setCarDetail] = useState({
    make: '',
    model: '',
    type: '',
    fuelCapacity: '',
    seatingCapacity: '',
    location: '',
    price: '',
    description: ''
  })
  
  // console.log(carDetail.type);
  //ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
  
    setCarDetail({
      ...carDetail,
      [name]: value,
    })
  }

  const handleSelectInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setCarDetail({
      ...carDetail,
      [name]: value,
    })
  }

  // Step 1: Create state to manage the uploaded images
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  

  // console.log(uploadedImages);
  // console.log(uploadedFiles);

  // Step 2: Create event handlers for drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    uploadFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadFiles(e.target.files);
    }
  };

  // Step 3: Modify the input's onChange event to handle multiple file uploads
  const uploadFiles = (files: FileList) => {
    const fileList = Array.from(files);
    const newImages = fileList.map((file) => URL.createObjectURL(file));
    const newFiles = fileList.map((file) => (file));
    setUploadedImages((prev) => [...prev, ...newImages]);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  // Step 4: Implement delete functionality
  const handleDelete = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageArray: Array<string> = [];
    const formData = new FormData();

    for (const imageFile of uploadedFiles) {
      console.log('uploading files list', imageFile);
      formData.append('file', imageFile)
      formData.append('upload_preset', 'morent-uploads');
    
      const fileResponse = await fetch('https://api.cloudinary.com/v1_1/ddn1veduz/image/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.json());

      console.log(fileResponse.url, "fileResponse");
      imageArray.push(fileResponse.url as string);
    }

    const dataResponse = await fetch('http://localhost:3000/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        make: carDetail.make,
        model: carDetail.model,
        type: carDetail.type,
        fuelCapacity: carDetail.fuelCapacity,
        seatingCapacity: carDetail.seatingCapacity,
        location: carDetail.location,
        price: carDetail.price,
        description: carDetail.description,
        images: imageArray,
      })
    });  


    if (!dataResponse.ok) {
      throw new Error('Failed to submit form');
    }

    const data = await dataResponse.json();

    console.log('data', data);
  }

  return (
    <section className="mx-auto max-w-[852px] rounded-[10px] bg-white px-6 py-8 lg:py-16">
      <div className="mb-5 flex flex-col justify-between lg:mb-10 lg:flex-row lg:items-center">
        <div className="">
          <h2 className="text-xl font-bold text-gray-900">
            Add a Car for Rent
          </h2>
          <p className="text-gray-500">Please enter your car info</p>
        </div>
        <Image
          src="/edit-car.png"
          alt="User car"
          width={146}
          height={66}
          className="mt-10 self-center lg:mt-0 lg:h-auto lg:w-auto"
        />
      </div>
      <form onSubmit={handleKeyPress} action="#">
        <h2 className="mb-6 text-xl font-bold uppercase text-blue-500 lg:mb-9">
          Car Info
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label
              htmlFor="car-make"
              className=" mb-2 block text-sm font-medium text-gray-900"
            >
              Car Make
            </label>
            <input
              type="text"
              name="make"
              id="car-make"
              className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600"
              placeholder="Car manufacturer"
              required
              value={carDetail.make}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="car-model"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Car Model
            </label>
            <input
              type="text"
              name="model"
              id="car-model"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Car model"
              required
              value={carDetail.model}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="car-type"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Car Type
            </label>
            <select
              id="car-type"
              name="type"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={carDetail.type}
              onChange={handleSelectInputChange}
            >
              <option value="">Select Type</option>
              <option value="Sport">Sport</option>
              <option value="SUV">SUV</option>
              <option value="MPV">MPV</option>
              <option value="Sedan">Sedan</option>
              <option value="Coupe">Coupe</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="fuel-capacity"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Fuel Capacity
            </label>
            <input
              type="number"
              min="0"
              max="100"
              name="fuelCapacity"
              id="fuel-capacity"
              className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 "
              placeholder="Capacity in gallons"
              required
              value={carDetail.fuelCapacity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="seating-capacity"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Seating Capacity
            </label>
            <select
              id="seating-capacity"
              name="seatingCapacity"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={carDetail.seatingCapacity}
              onChange={handleSelectInputChange}
            >
              <option value="">Select Capacity</option>
              <option value={2}>2 Person</option>
              <option value={4}>4 Person</option>
              <option value={5}>5 Person</option>
              <option value={6}>6 Person</option>
              <option value={7}>7 or More</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={carDetail.location}
              onChange={handleSelectInputChange}
            >
              <option value="">Select your city</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
              <option value="Houston">Houston</option>
              <option value="Phoenix">Phoenix</option>
              <option value="Philadelphia">Philadelphia</option>
              <option value="San Antonio">San Antonio</option>
              <option value="San Diego">San Diego</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="rent-price"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Rent Price
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              name="price"
              id="rent-price"
              className="block w-full  rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-600 focus:ring-blue-600 "
              placeholder="Price in dollars"
              required
              value={carDetail.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="car-description"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Car Description
            </label>
            <textarea
              id="car-description"
              name="description"
              rows={8}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your car description here"
              value={carDetail.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className="mb-4"> */}
        <span className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Car Images
        </span>
        <div className="mb-4 grid grid-cols-3 gap-4 sm:grid-cols-4">
          {uploadedImages.map((src, index) => (
            <div
              key={index}
              className="relative rounded-lg bg-gray-100 p-2 sm:h-36 sm:w-36"
            >
              <Image src={src} alt={`Uploaded ${index}`} width={75} height={25} />
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute bottom-1 left-1 text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Delete image</span>
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Car Images
          </label>
          <div
            // className="relative col-span-full rounded-lg bg-gray-100 p-2 dark:bg-gray-700 sm:h-36 sm:w-36"
            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                    multiple
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        {/* // Display the uploaded images and add delete functionality */}
        {/* <div className="mt-4 flex flex-wrap gap-2">
          {uploadedImages.map((src, index) => (
            <div key={src} className="relative w-20">
              <Image
                src={src}
                alt={`Uploaded ${index}`}
                className="h-24 w-24 rounded object-cover"
                width={100}
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute right-0 top-0 rounded-full bg-white p-1 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                x
              </button>
            </div>
          ))}
        </div> */}
        <div className="mt-4 flex flex-col items-end justify-end gap-5 lg:flex-row">
          <button
            // intent="danger"
            // borderRadius="medium"
            // fullWidth
            className="flex w-full items-center justify-center rounded-lg bg-red-500 px-[26px] py-4 lg:w-fit"
          >
            <FaTrash className="mr-1" />
            {/* <DeleteIcon className="mr-1" /> */}
            Remove Car
          </button>
          <button
            // intent="primary"
            // borderRadius="medium"
            // fullWidth
            type="submit"
            className="text-white-0 w-full items-center rounded-lg bg-blue-500 px-[26px] py-4 text-center focus:ring-4 focus:ring-blue-200 lg:w-fit"
          >
            Register Car
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddCarForm;
