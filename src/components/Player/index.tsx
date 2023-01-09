import * as Progress from '@radix-ui/react-progress';

import musicImg from '../../assets/images/Florian.jpg'

import { Play, FastForward, Rewind } from 'phosphor-react'

export function Player() {
  return (
    <section>
      <div>
        <img src={musicImg} alt="" />
        <div>
          <h2>Janking Roe</h2>
          <p>Florian</p>
        </div>
      </div>
      <div>
        <div>
          <button>
            <Rewind size={28} />
          </button>
          <button>
            <Play size={28} />
          </button>
          <button>
            <FastForward size={28} />
          </button>
        </div>
        <Progress.Root>
          <Progress.Indicator />
        </Progress.Root>
      </div>
    </section>
  )
}