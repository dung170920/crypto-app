import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Input } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import demoImage from "../images/no-images.png";

const News = ({ simplified }) => {
  const [topic, setTopic] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: newsList, isFetching } = useGetNewsQuery({
    topic,
    count: simplified ? 6 : 12,
  });

  if (isFetching) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a crypto"
            optionFilterProp="children"
            onChange={(value) => setTopic(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {data?.data?.coins.map((c) => (
              <Select.Option key={c.id} value={c.name}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
      )}

      {newsList?.value.map((newsItem, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={newsItem.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Typography.Title className="news-title" level={4}>
                  {newsItem.name}
                </Typography.Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={newsItem?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />
              </div>
              <p>
                {newsItem.description > 100
                  ? `${newsItem.description.substring(0, 100)}...`
                  : newsItem.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      newsItem?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Typography.Text className="provider-name">
                    {newsItem?.provider[0]?.name}
                  </Typography.Text>
                </div>
                <Typography.Text>
                  {moment(newsItem.datePublished).startOf("ss").fromNow()}
                </Typography.Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
