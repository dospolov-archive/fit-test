import React from 'react'

// 100 = 100%
// 50 = 75%
// 20 = 60%
// 0 = 50%
// -50 = 25%
// -100 = 0%

const Chart = ({ chart: { extremum, percent } }) => {
  return (
    <div className="chart">
      <span className="chart-min">-{extremum}</span>
      <span className="chart-zero">0</span>
      <span className="chart-position" style={{ left: `${percent}%` }}></span>
      <span className="chart-max">{extremum}</span>
    </div>
  )
}

export default Chart
