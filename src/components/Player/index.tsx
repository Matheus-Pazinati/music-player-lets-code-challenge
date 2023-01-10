import * as Progress from '@radix-ui/react-progress';

import musicImg from '../../assets/images/Florian.jpg'

import { Play, FastForward, Rewind } from 'phosphor-react'

export function Player() {
  const progress = 50
  return (
    <main className='flex justify-center items-center h-[100vh]'>
      <section
        className='bg-[#2A2141] mx-4 rounded-md max-w-xs'
      >
        <div
          className='px-9 py-14' >
          <div className='flex flex-col gap-7 '>
            <img src={musicImg} alt="" className='rounded-md' />
            <div>
              <h2 className='text-[#E1E1E6] font-bold text-2xl'>Janking Roe</h2>
              <p className='text-[#E1E1E6] text-lg'>Florian</p>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-between items-center w-full my-7'>
              <button>
                <Rewind size={28} weight={'fill'} color={'#E1E1E6'} />
              </button>
              <button>
                <Play size={28} weight={'fill'} color={'#E1E1E6'} />
              </button>
              <button>
                <FastForward size={28} weight={'fill'} color={'#E1E1E6'} />
              </button>
            </div>
            <div>
              <Progress.Root
                value={50}
                className='w-full h-2 bg-[#0B0B0B] rounded-full relative overflow-hidden'
              >
                <Progress.Indicator
                  className='w-full h-full bg-[#D9D9D9] rounded-full transition trasform duration-1000 ease-[cubic-bezier(0.65, 0, 0.35, 1)]'
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                />
              </Progress.Root>
              <div className='flex items-center justify-between mt-2 text-sm text-[#C4C4CC]'>
                <span>03:20</span>
                <span>00:12</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}