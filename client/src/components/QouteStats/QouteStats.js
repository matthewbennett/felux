import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Row, Col, Space, Card } from 'antd';

function QouteStats({stats}) {
  const statCards = stats.map((item, i) => {
    console.log(item);
    return (
      <Col key={i} span={8}>
        <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}>
          <Card>
              <Statistic
                title={item.title}
                value={item.value}
                precision={item.precision}
                valueStyle={item.styles}
                prefix={item.prefix}
                suffix={item.suffix}
              />
            </Card>
        </Space>
      </Col>
    );
  });

  return (
    <Row>
      {statCards}
    </Row>
  )
}

QouteStats.propTypes = {
  stats: PropTypes.array
}

export default QouteStats

