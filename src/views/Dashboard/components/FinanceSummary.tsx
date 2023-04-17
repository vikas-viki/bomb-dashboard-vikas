import React from 'react';
import { Button, Card } from '@material-ui/core';
import CardContent from '../../../components/CardContent/CardContent';
import styled from 'styled-components';
import TokenDetails from './TokenDetails';
import Countdown from 'react-countdown';
import CountUp from 'react-countup';


interface FinanceSummaryProps {
  epochData: {
    CurrentEpoch: number;
    nextEpoch: string;
    LastTwap: number;
    currentTWAP: number;
    tvl: string;
  };
  tokensData: [
  ];
}

const FinanceSummary: React.FC<FinanceSummaryProps> = ({ epochData, tokensData }) => {

  console.log({ epochData });

  return (
    <div style={{ marginTop: '90px' }}>
      <Card>
        <CardContent >
          <h2 style={{ letterSpacing: '1px', paddingBottom: '10px', textAlign: 'center', borderBottom: '0.8px solid #fff', width: '100%' }}>Bomb finance summary</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
              flexWrap: 'wrap',
              paddingTop: '40px'
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  padding: "5px",
                  justifyContent: "end",
                  paddingRight: "100px",
                  fontSize: "14px",
                }}
              >
                <span>Current Supply</span>
                <span>Total Supply</span>
                <span>Price</span>
              </div>
              <hr />
              {
                tokensData.map((el, i) => {
                  return (
                    <TokenDetails key={i} tokenData={el} />
                  )
                })
              }
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                letterSpacing: "1px",
              }}
            >
              <div
                style={{
                  borderBottom: "0.7px solid #E5E5E5",
                  padding: "8px",
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  gap: "1px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: "18px" }}>Current Epoch</span>
                <span style={{ fontSize: "34px" }}>{epochData.CurrentEpoch || '000'}</span>
              </div>
              <div
                style={{
                  borderBottom: "0.7px solid #E5E5E5",
                  padding: "8px",
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  gap: "1px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: "34px" }}>
                  {epochData.nextEpoch && <Countdown date={new Date(epochData.nextEpoch).getTime() || 0} // Set the target date for the countdown
                    renderer={({ hours, minutes, seconds, completed }) => (
                      // Custom renderer function to display the countdown
                      <div>
                        {completed ? (
                          <span>0</span>
                        ) : (
                          <span>
                            {hours}:{minutes}:{seconds}
                          </span>
                        )}
                      </div>
                    )}
                  />}
                </span>
                <span style={{ fontSize: "18px" }}>Next Epoch in</span>
              </div>
              <div
                style={{
                  borderBottom: "0.7px solid #E5E5E5",
                  padding: "8px",
                  gap: "6px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span>Live TWAP: </span>
                  <span style={{ color: "green" }}>{epochData.currentTWAP || '---'}</span>
                </div>
                <div>
                  <span>TVL: </span>
                  <span style={{ color: "green" }}>$
                    {epochData.tvl || '---'}

                  </span>
                </div>
                <div>
                  <span>Last Epoch TWAP: </span>
                  <span style={{ color: "green" }}>{String(epochData.LastTwap / (10 ** 14)).slice(0, 6) !== 'NaN' ? String(epochData.LastTwap / (10 ** 14)).slice(0, 6) : '---'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceSummary;

const StyledBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 15px;
`;
