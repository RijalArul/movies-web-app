import React from 'react'
import { useNavigate } from 'react-router'

function Navbar () {
  const navigate = useNavigate()
  function clickMovies () {
    navigate(`/`)
  }

  function clickBookmark () {
    navigate('/bookmark')
  }
  return (
    <div>
      <nav>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <a
                    onClick={() => clickMovies()}
                    href='#'
                    className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Movies
                  </a>

                  <a
                    onClick={() => clickBookmark()}
                    href='#'
                    className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Bookmarks
                  </a>
                </div>
              </div>
            </div>
            <div className='-mr-2 flex md:hidden'>
              <button
                type='button'
                className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>

                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>

                <svg
                  className='hidden h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className='md:hidden' id='mobile-menu'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <a
              href='#'
              className='hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Movies
            </a>

            <a
              href='#'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Tv Show
            </a>

            <a
              href='#'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              Favourites
            </a>

            <a
              href='#'
              className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            ></a>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
