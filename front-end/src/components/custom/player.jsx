'use client'

import { SERV_ADDRESS } from '@/config';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

import { useState, useEffect } from 'react';

function make_player_appear() {
  const container = document.getElementById('player_container');
  const audio = document.getElementById('audio_tag');
  container.hidden = false;
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function switch_playback(isPlaying, setPlaying) {
  const audio = document.getElementById('audio_tag');
  if (isPlaying) {
    setPlaying(false);
    audio.pause();
  } else {
    setPlaying(true);
    audio.play();
  }
}

function seek(time, setTime) {
  setTime(time);
  const audio = document.getElementById('audio_tag');
  audio.currentTime = time;
}

function cycle_speed(speed, setSpeed) {
  speed = 1 + (speed - 1 + 0.25) % 1.25;
  setSpeed(speed);
  const audio = document.getElementById('audio_tag');
  audio.playbackRate = speed;
}

export default function Player({audio_path}) {
  const [isPlaying, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const audio = document.getElementById('audio_tag');
      if (audio.duration) {
        const container = document.getElementById('player_container');
        container.hidden = false;
        setPlaying(!audio.paused);
        setTime(audio.currentTime);
        setDuration(audio.duration);
        setSpeed(audio.playbackRate);
      }
    }, 200);

    return () => clearInterval(interval);
  });

  return (
    <div hidden className="border-foreground border-2 rounded-2xl p-2" id='player_container'>
      <div className='pl-2'>
        Аудиостатья
      </div>
      <div className='flex items-center gap-2 p-2 z-10'>
        <Button
          onClick={() => switch_playback(isPlaying, setPlaying)}
          variant="outline"
          size="icon"
          className='flex-none border-2 border-foreground hover:bg-muted'>
          <img src={isPlaying ? '/icons/pause.svg' : '/icons/play.svg'} className="size-4 dark:invert"/>
        </Button>
        <Button
          onClick={() => cycle_speed(speed, setSpeed)}
          variant="outline"
          size="icon"
          className='flex-none border-2 border-foreground hover:bg-muted font-monospace text-l md:text-xl w-12 md:w-16'>
          {speed}x
        </Button>
        <span className='hidden md:block font-monospace pt-1 md:pt-0'>
          {Math.floor(time / 60)}:{pad(Math.floor(time % 60))}
        </span>
        <Slider value={[time/duration*100]} onValueChange={(val) => seek(val/100*duration, setTime)}/>
        <span className='font-monospace pt-1 md:pt-0'>
          -{Math.floor((duration-time)/60)}:{pad(Math.ceil((duration-time)%60))}
        </span>
        <audio id='audio_tag' onCanPlay={make_player_appear}>
          <source src={audio_path} type="audio/mp3"/>
        </audio>
      </div>
    </div>
  );
}
