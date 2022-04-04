import React, { useEffect, useRef, useState } from 'react'
import { useGame } from '../../contexts/game/useGame'
import styles from './styles/timer.module.scss'
export const Timer = ({
  time = 20,
  display = true,
  timerStyle = '',
  drawACard = false,
  snatchCardTimer = false,
}) => {
  const { setStopTimer, answerIfPlayerHasCard, setDrawCardForTimerState } =
    useGame()
  const [count, setCount] = useState(time)
  let intervalRef = useRef()

  const decreaseNum = () => setCount((prev) => prev - 1)

  useEffect(() => {
    intervalRef.current = setInterval(decreaseNum, 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalRef.current)
      setStopTimer(true)
      timerStyle === 'responseCardAlert' && answerIfPlayerHasCard()
      if (drawACard) {
        setDrawCardForTimerState(true)
      }
      if (snatchCardTimer) {
        setDrawCardForTimerState(true)
      }
    }
  }, [count])

  return (
    <>
      {display && (
        <div
          className={`${!timerStyle && styles.timer} ${
            timerStyle === 'responseCardAlert' && styles.timer2
          }`}
        >
          <p>{count}</p>
        </div>
      )}
    </>
  )
}
