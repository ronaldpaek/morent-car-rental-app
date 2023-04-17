'use client';

import { useState } from 'react';
import { Filter } from 'components';

const Search = () => {
  return (
    <main className="bg-white-200">
      <div className="mx-auto max-w-[1440px]">
        <Filter />
      </div>
    </main>
  );
};

export default Search;
