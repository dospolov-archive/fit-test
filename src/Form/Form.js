import React, { useState } from 'react'
import { Input, Row, Col, Button, Slider } from 'antd'
import Chart from '../Chart'

const SLIDER_DOTS = 5

const Form = () => {
  const [rows, updateRows] = useState([
    {
      positive: { title: 'Красота', weight: 3 },
      negative: { title: 'Жадность', weight: 3 }
    },
    {
      positive: { title: 'Нежность', weight: 3 },
      negative: { title: 'Ограниченность', weight: 3 }
    },
    {
      positive: { title: 'Широта взглядов', weight: 3 },
      negative: { title: 'Ревность', weight: 3 }
    },
    {
      positive: { title: 'Доброта', weight: 3 },
      negative: { title: 'Агрессия', weight: 3 }
    }
  ])
  const [chart, updateChart] = useState({
    extremum: rows.length * SLIDER_DOTS - rows.length,
    percent: null
  })

  const calculate = () => {
    const max = rows.length * SLIDER_DOTS - rows.length

    const total = rows.reduce(
      (acc, row) => acc - row.negative.weight + row.positive.weight,
      0
    )

    updateChart({
      extremum: rows.length * SLIDER_DOTS - rows.length,
      percent: ((max + total) / (max * 2)) * 100
    })
  }

  const addRow = () => {
    updateChart(prevChart => ({
      ...prevChart,
      extremum: (rows.length + 1) * SLIDER_DOTS - rows.length - 1
    }))
    updateRows(prevRows => [
      ...prevRows,
      {
        positive: { title: '', weight: 3 },
        negative: { title: '', weight: 3 }
      }
    ])
  }

  const updateRowField = (rowIndex, updatedField, qualityType) =>
    updateRows(prevRows =>
      prevRows.map((row, i) =>
        i === rowIndex
          ? {
              ...row,
              [qualityType]: {
                ...row[qualityType],
                ...updatedField
              }
            }
          : row
      )
    )

  return (
    <div>
      <Row>
        <Col span={11}>
          <Row className="mb-2">
            <Col span={16}>
              <h2>Позитивные качества</h2>
            </Col>
            <Col span={6} offset={1}>
              <h2>Важность для вас</h2>
            </Col>
          </Row>

          {rows.map(({ positive: { title, weight } }, i) => (
            <Row key={i} className="mb-2">
              <Col span={16}>
                <Input
                  value={title}
                  placeholder="Что-то хорошее"
                  onChange={({ target: { value } }) =>
                    updateRowField(i, { title: value }, 'positive')
                  }
                />
              </Col>
              <Col span={6} offset={1}>
                <Slider
                  value={weight}
                  dots={true}
                  min={1}
                  max={SLIDER_DOTS}
                  onChange={value => updateRowField(i, { weight: value }, 'positive')}
                />
              </Col>
            </Row>
          ))}
        </Col>
        <Col span={11} offset={2}>
          <Row className="mb-2">
            <Col span={16}>
              <h2>Негативные качества</h2>
            </Col>
            <Col span={6} offset={1}>
              <h2>Важность для вас</h2>
            </Col>
          </Row>

          {rows.map(({ negative: { title, weight } }, i) => (
            <Row key={i} className="mb-2">
              <Col span={16}>
                <Input
                  value={title}
                  placeholder="Что-то плохое"
                  onChange={({ target: { value } }) =>
                    updateRowField(i, { title: value }, 'negative')
                  }
                />
              </Col>
              <Col span={6} offset={1}>
                <Slider
                  value={weight}
                  dots={true}
                  min={1}
                  max={SLIDER_DOTS}
                  onChange={value => updateRowField(i, { weight: value }, 'negative')}
                />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <div className="text-right mt-5">
        <Button onClick={addRow}>Добавить качества</Button>
        <Button
          type="primary"
          className="ml-2"
          disabled={
            !rows.every(({ positive, negative }) => positive.title && negative.title)
          }
          onClick={calculate}
        >
          Посчитать совместимость
        </Button>
      </div>
      {chart.percent !== null && <Chart {...{ chart }} />}
    </div>
  )
}

export default Form
