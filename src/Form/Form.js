import React, { useState } from 'react'
import { Input, Row, Col, Button, InputNumber } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Chart from '../Chart'

const WEIGHT_MIN = 1
const WEIGHT_MAX = 5
const PRESENCE_MIN = 0
const PRESENCE_MAX = 10

const Form = () => {
  const [rows, updateRows] = useState([
    {
      positive: { title: 'Красота', weight: 3, presence: 0 },
      negative: { title: 'Жадность', weight: 3, presence: 0 }
    },
    {
      positive: { title: 'Нежность', weight: 3, presence: 0 },
      negative: { title: 'Ограниченность', weight: 3, presence: 0 }
    },
    {
      positive: { title: 'Широта взглядов', weight: 3, presence: 0 },
      negative: { title: 'Ревность', weight: 3, presence: 0 }
    },
    {
      positive: { title: 'Доброта', weight: 3, presence: 0 },
      negative: { title: 'Агрессия', weight: 3, presence: 0 }
    }
  ])
  const [chart, updateChart] = useState({
    extremum: rows.length * WEIGHT_MAX - rows.length,
    percent: null
  })

  const calculate = () => {
    const max = rows.length * WEIGHT_MAX * PRESENCE_MAX

    const total = rows.reduce(
      (acc, row) =>
        acc -
        row.negative.weight * row.negative.presence +
        row.positive.weight * row.positive.presence,
      0
    )

    updateChart({
      extremum: rows.length * WEIGHT_MAX * PRESENCE_MAX,
      percent: ((max + total) / (max * 2)) * 100
    })
  }

  const addRow = () => {
    updateChart(prevChart => ({
      ...prevChart,
      extremum: (rows.length + 1) * WEIGHT_MAX * PRESENCE_MAX
    }))
    updateRows(prevRows => [
      ...prevRows,
      {
        positive: { title: '', weight: 3, presence: 0 },
        negative: { title: '', weight: 3, presence: 0 }
      }
    ])
  }

  const deleteRow = removeIndex => {
    updateChart(prevChart => ({
      ...prevChart,
      extremum: (rows.length - 1) * WEIGHT_MAX * PRESENCE_MAX
    }))
    updateRows(prevRows => prevRows.filter((_, i) => i !== removeIndex))
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
        {['positive', 'negative'].map(characteristic => (
          <Col
            span={11}
            key={characteristic}
            offset={characteristic === 'positive' ? 0 : 2}
          >
            <Row className="mb-2">
              <Col span={characteristic === 'positive' ? 24 : 22}>
                <Row>
                  <Col span={14}>
                    <h2>
                      {characteristic === 'positive' ? 'Позитивные' : 'Негативные'}{' '}
                      качества
                    </h2>
                  </Col>
                  <Col span={4} offset={1}>
                    <h2>
                      Важность для вас,{' '}
                      <span className="whitespace-pre">
                        {WEIGHT_MIN}-{WEIGHT_MAX}
                      </span>
                    </h2>
                  </Col>
                  <Col span={4} offset={1}>
                    <h2>
                      Наличие у партнера,{' '}
                      <span className="whitespace-pre">
                        {PRESENCE_MIN}-{PRESENCE_MAX}
                      </span>
                    </h2>
                  </Col>
                </Row>
              </Col>
            </Row>

            {rows.map(({ [characteristic]: { title, weight, presence } }, i) => (
              <Row key={i} className="mb-2">
                <Col span={characteristic === 'positive' ? 24 : 22}>
                  <Row>
                    <Col span={14}>
                      <Input
                        value={title}
                        placeholder={
                          characteristic === 'positive'
                            ? 'Что-то хорошее'
                            : 'Что-то негативное'
                        }
                        onChange={({ target: { value } }) =>
                          updateRowField(i, { title: value }, characteristic)
                        }
                      />
                    </Col>
                    <Col span={4} offset={1}>
                      <InputNumber
                        value={weight}
                        className="w-full"
                        min={WEIGHT_MIN}
                        max={WEIGHT_MAX}
                        step={1}
                        onChange={value =>
                          updateRowField(i, { weight: value }, characteristic)
                        }
                      />
                    </Col>
                    <Col span={4} offset={1}>
                      <InputNumber
                        value={presence}
                        className="w-full"
                        min={PRESENCE_MIN}
                        max={PRESENCE_MAX}
                        step={1}
                        onChange={value =>
                          updateRowField(i, { presence: value }, characteristic)
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                {characteristic === 'negative' && (
                  <Col span={2} className="text-center">
                    <CloseOutlined className="text-xl" onClick={() => deleteRow(i)} />
                  </Col>
                )}
              </Row>
            ))}
          </Col>
        ))}
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
