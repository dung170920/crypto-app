import React from "react";
import millify from "millify";
import { useGetCryptoExchangesQuery } from "../services/cryptoApi";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) return "Loading...";

  return (
    <>
      <Row className="exchange-header">
        <Col span={6}>
          <Typography.Title level={4}>Exchanges</Typography.Title>
        </Col>
        <Col span={6}>
          <Typography.Title level={4}>24h Trade Volume</Typography.Title>
        </Col>
        <Col span={6}>
          <Typography.Title level={4}>Markets</Typography.Title>
        </Col>
        <Col span={6}>
          <Typography.Title level={4}>Change</Typography.Title>
        </Col>
      </Row>
      <Row>
        {data?.data?.exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Collapse.Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id} className="exchange-row">
                    <Col span={6}>
                      <Typography.Text>
                        <strong>{exchange.rank}.</strong>
                      </Typography.Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Typography.Text>
                        <strong>{exchange.name}</strong>
                      </Typography.Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Collapse.Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
