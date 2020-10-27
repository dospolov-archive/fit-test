import React from 'react'

const POSITION = 67

// 100 = 100%
// 50 = 75%
// 20 = 60%
// 0 = 50%
// -50 = 25%
// -100 = 0%

const MIN = -500
const MAX = 500

const Chart = () => {
  return (
    <div className="chart">
      <span className="chart-min">{MIN}</span>
      <span className="chart-zero">0</span>
      <span className="chart-position" style={{ left: `${POSITION}%` }}></span>
      <span className="chart-max">{MAX}</span>
    </div>
  )
}

export default Chart
