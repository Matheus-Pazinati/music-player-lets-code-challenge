import * as Progress from '@radix-ui/react-progress';

import { Play, FastForward, Rewind } from 'phosphor-react'

export function Player() {
  const progress = 50
  return (
    <main className='flex justify-center items-start sm:items-center h-[100vh]'>
      <section
        className='bg-[#2A2141] mx-4 my-4 rounded-md max-w-xs sm:w-[500px] sm:max-w-none'
      >
        <div
          className='px-9 sm:px-7 py-14 sm:py-7' >
          <div className='flex flex-col sm:flex-row gap-7 sm:items-center sm:gap-9 '>
            <img src="https://phx02pap001files.storage.live.com/y4m14tKYTSDdKN4DQnuXHjsPTs5BFv1LgUFGJtP5OVRDqd8hwDlWPvYJ5uQEGEg9b_ZbLy0GPB1OY-4ulU8SxP9Iyo0ke4nwEZNdxJQEcepAbGr6PbqKt_0is2nzdLVwbBsV7u9v6Z2CmEWauj_9CGAC_1TiNJEoKbpnwOhyXAW8ZP6KW3RgJq-ZyFt50Zt4ZBO?width=640&height=640&cropmode=none" alt="" className='rounded-md sm:w-[150px] sm:h-[150px]' />
            <div>
              <h2 className='text-[#E1E1E6] font-bold text-2xl'>Janking Roe</h2>
              <p className='text-[#E1E1E6] text-lg'>Florian</p>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-between sm:justify-around items-center w-full my-7'>
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
                className='w-full h-2 bg-[#1B1B1B] rounded-full relative overflow-hidden'
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