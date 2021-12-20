import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Input, Col, Row, Card } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCoins(cryptoList?.data?.coins);
    const filteredData = cryptoList?.data?.coins.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setCoins(filteredData);
  }, [cryptoList, search]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto" hidden={simplified}>
          <Input
            placeholder="Search crypto..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {coins?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.id}>
            <Link to={`/crypto/${coin.id}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={
                  <img src={coin.iconUrl} className="crypto-image" alt="" />
                }
                hoverable
              >
                <p>Price: {millify(coin.price)} USD</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
