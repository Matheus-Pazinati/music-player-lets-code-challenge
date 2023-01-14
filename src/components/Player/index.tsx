import * as Progress from '@radix-ui/react-progress';
import { Play, FastForward, Rewind, Pause } from 'phosphor-react'

import { useEffect, useState } from 'react';

import { songs } from '../../../db.json'

export function Player() {

  const [activeSongId, setActiveSongId] = useState(1)
  const [isSongPlaying, setIsSongPlaying] = useState(false)
  const [song, setSong] = useState(new Audio(undefined))
  const [progressBar, setProgressBar] = useState(0)

  const isFirstSong = activeSongId === 1
  const isLastSong = activeSongId === 3

  const activeSong = songs.find((song) => song.id === activeSongId)

  const songMinutes = Math.floor(song.duration / 60)
  const songSeconds = Math.floor(song.duration % 60)

  const songMinutesTotal = !!progressBar ? String(songMinutes).padStart(2, "0") : "00"
  const songSecondsTotal = !!progressBar ? String(songSeconds).padStart(2, "0") : "00"

  const songCurrentMinutes = Math.floor(song.currentTime / 60).toString().padStart(2, "0")
  const songCurrentSeconds = Math.floor(song.currentTime % 60).toString().padStart(2, "0")

  useEffect(() => {
    let timer: number;
    if (isSongPlaying) {
      timer = setInterval(() => {
        setProgressBar(state => state + 100 / song.duration)
        if (song.paused || progressBar >= 100) {
          clearInterval(timer)
        }
      }
        , 1000)
      song.play()
      return
    }
    song.pause()
    return () => {
      clearInterval(timer)
    }
  }, [isSongPlaying, song])

  useEffect(() => {
    setProgressBar(0)
    setSong(new Audio(activeSong?.song))
    song.load()
  }, [activeSongId])

  function handlePlayAndStopSong() {
    setIsSongPlaying(state => !state)
  }

  return (
    <main className='flex justify-center items-start sm:items-center h-[100vh]'>
      <section
        className='bg-[#172573] mx-4 my-4 rounded-md max-w-xs sm:w-[500px] sm:max-w-none'
      >
        <div
          className='px-9 sm:px-7 py-14 sm:py-7' >
          <div className='flex flex-col sm:flex-row gap-7 sm:items-center sm:gap-9 '>
            <img src={activeSong?.image} alt="" className='rounded-md sm:w-[150px] sm:h-[150px]' />
            <div>
              <h2 className='text-[#E1E1E6] font-bold text-2xl'>{activeSong?.name}</h2>
              <p className='text-[#E1E1E6] text-lg'>{activeSong?.artist}</p>
            </div>
          </div>
          <div className='w-full'>
            <div className='flex justify-between sm:justify-around items-center w-full my-7'>
              <button
                disabled={isFirstSong}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setActiveSongId(state => state - 1)
                  setIsSongPlaying(true)
                }}
              >
                <Rewind size={28} weight={'fill'} color={'#E1E1E6'} />
              </button>
              <button onClick={handlePlayAndStopSong}>
                {isSongPlaying ? (
                  <Pause size={28} weight={'fill'} color={'#E1E1E6'} />
                )
                  :
                  (
                    <Play size={28} weight={'fill'} color={'#E1E1E6'} />
                  )
                }
              </button>

              <button
                disabled={isLastSong}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setActiveSongId(state => state + 1)
                  setIsSongPlaying(true)
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
                <span>{songCurrentMinutes}:{songCurrentSeconds}</span>
                <span>{songMinutesTotal}:{songSecondsTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}