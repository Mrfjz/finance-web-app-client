import React from 'react';
import Link from '../shared/Link';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../hooks/SearchBar.tsx';
import useSignout from '../hooks/useSignout';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const data = [
    {
      "symbol": "USDBTC-USD",
      "name": "Bitcoin USD"
    },
    {
      "symbol": "USDETH-USD",
      "name": "Ethereum USD",
    },
    {
      "symbol": "EURUSD=X",
      "name": "EUR/USD",
    },
    {
      "symbol": "JPY=X",
      "name": "USD/JPY",
    },
  ]
  const signout = useSignout();
  const { auth } = useAuth();

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <SearchBar />
          </Col>
          <Col md={{ span: 2, offset: 1 }}>
            {!auth?.accessToken ? (
              <Link to="/signin">Sign in</Link>
            ) : (
              <Link to="/" onClick={signout}>
                Sign out
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/">Finance Home </Link>
          </Col>
          <Col>
            <Link to="/portfolio">My Portfolio</Link>
          </Col>
          <Col>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Col>
          <Col>
            <Link to="/currencies">Currencies</Link>
          </Col>
          <Col>
            <Link to="/stocks">Stocks</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
