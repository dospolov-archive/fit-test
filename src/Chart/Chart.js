import React from 'react'

// 100 = 100%
// 50 = 75%
// 20 = 60%
// 0 = 50%
// -50 = 25%
// -100 = 0%

const Message = ({ percent }) => {
  switch (true) {
    case percent < 25:
      return 'Вы абсолютно несовестимы. Бегите.'
    case percent < 50:
      return 'Скорее всего у вас нет будущего, увы.'
    case percent < 62.5:
      return 'Эти отношения могут стоить слишком серьезных усилий, задумайтесь, нужно ли оно вам.'
    case percent < 75:
      return 'У вас может все получиться, если постараетесь!'
    case percent < 87.5:
      return 'Вы отлично подходите друг другу, вам очень повезло!'
    case percent <= 100:
      return 'Ваш союз создан на небесах и вы идеально подходите друг другу!'
    default:
      return ''
  }
}

const Chart = ({ chart: { extremum, percent } }) => {
  return (
    <div className="mt-8">
      <div className="text-xl text-center">
        <Message {...{ percent }} />
      </div>
      <div className="chart">
        <span className="chart-min">-{extremum}</span>
        <span className="chart-zero">0</span>
        <span className="chart-position" style={{ left: `${percent}%` }}></span>
        <span className="chart-max">{extremum}</span>

        <i className="chart-bg-25"></i>
        <i className="chart-bg-50"></i>
        <i className="chart-bg-62"></i>
        <i className="chart-bg-75"></i>
        <i className="chart-bg-87"></i>
        <i className="chart-bg-100"></i>
      </div>
    </div>
  )
}

export default Chart
