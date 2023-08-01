import * as Progress from '@radix-ui/react-progress';
import { Play, FastForward, Rewind, Pause } from 'phosphor-react'

import { useEffect, useState } from 'react';

import { musics } from '../../../db.json'

export function Player() {
  const [activeMusicId, setActiveMusicId] = useState(1)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [music, setMusic] = useState(new Audio(undefined))
  const [progressBar, setProgressBar] = useState(0)

  const isFirstMusic = activeMusicId === 1
  const isLastMusic = activeMusicId === 3

  const activeMusic = musics.find((music) => music.id === activeMusicId)

  const totalMinutesOfMusic = Math.floor(music.duration / 60)
  const totalSecondsOfMusic = Math.floor(music.duration % 60)

  const totalMinutesOfMusicView = !!progressBar ? String(totalMinutesOfMusic).padStart(2, "0") : "00"
  const totalSecondsOfMusicView= !!progressBar ? String(totalSecondsOfMusic).padStart(2, "0") : "00"

  const currentMinutesOfMusicView = Math.floor(music.currentTime / 60).toString().padStart(2, "0")
  const currentSecondsOfMusicView= Math.floor(music.currentTime % 60).toString().padStart(2, "0")

  const isMusicEnded = progressBar >= 100
  
  const PROGRESS_BAR_MAX_VALUE = 100;
  
  isMusicPlaying ? music.play() : music.pause()

  useEffect(() => {
    function updateMusicProgressBar() {
      let timer: number;
      if (isMusicPlaying) {
        timer = setInterval(() => {
          setProgressBar(state => state + PROGRESS_BAR_MAX_VALUE / music.duration)
          if (music.paused || isMusicEnded) {
            clearInterval(timer)
          }
        }
          , 1000)
      }
      return () => {
        clearInterval(timer)
      }
    }
    updateMusicProgressBar()
  }, [isMusicPlaying, music])

  useEffect(() => {
    function loadNewMusic() {
      setMusic(new Audio(activeMusic?.music))
      music.load()
    }
    loadNewMusic()
  }, [activeMusicId])

  function handlePlayAndStopmusic() {
    setIsMusicPlaying(state => !state)
  }

  function changeMusic(action: 'NEXT' | 'PREV') {
    setProgressBar(0)
    setIsMusicPlaying(true)
    action === "NEXT" ? 
    setActiveMusicId(state => state + 1)
    :
    setActiveMusicId(state => state - 1)
  }

  return (
    <main className='flex justify-center items-start sm:items-center h-[100vh]'>
      <section
        className='bg-[#172573] mx-4 my-4 rounded-md max-w-xs sm:w-[500px] sm:max-w-none'
      >
        <div
          className='px-9 sm:px-7 py-14 sm:py-7' >
          <div className='flex flex-col sm:flex-row gap-7 sm:items-center sm:gap-9 '>
            <img src={activeMusic?.image} alt="" className='rounded-md sm:w-[150px] sm:h-[150px]' />
            <div>
              <h2 className='text-[#E1E1E6] font-bold text-2xl'>{activeMusic?.name}</h2>
              <p className='text-[#E1E1E6] text-lg'>{activeMusic?.artist}</p>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-between sm:justify-around items-center w-full my-7'>
              <button
                disabled={isFirstMusic}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  changeMusic('PREV')
                }}
              >
                <Rewind size={28} weight={'fill'} color={'#E1E1E6'} />
              </button>
              <button onClick={handlePlayAndStopmusic}>
                {isMusicPlaying ? (
                  <Pause size={28} weight={'fill'} color={'#E1E1E6'} />
                )
                  :
                  (
                    <Play size={28} weight={'fill'} color={'#E1E1E6'} />
                  )
                }
              </button>

              <button
                disabled={isLastMusic}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  changeMusic('NEXT')
                }}
              >
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
                  style={{ transform: `translateX(-${100 - progressBar}%)` }}
                />
              </Progress.Root>
              <div className='flex items-center justify-between mt-2 text-sm text-[#C4C4CC]'>
                <span>{currentMinutesOfMusicView}:{currentSecondsOfMusicView}</span>
                <span>{totalMinutesOfMusicView}:{totalSecondsOfMusicView}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}