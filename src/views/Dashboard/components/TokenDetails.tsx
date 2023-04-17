import React from 'react'

interface TokenDetailsProps {
    tokenData:{
        coinImg: string,
        tokenName: string,
        currntSupply: string,
        totalSupply: string,
        price: {
            dollar: string,
            btcb: string
        },
        wallet: string
    }
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ tokenData }) => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    gap: "40px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    alignItems: "center",
                    fontSize: "16px",
                }}
            >
                <img
                    src={tokenData.coinImg}
                    alt="img"
                    width="35"
                />
                <span style={{minWidth: '70px'}}>{tokenData.tokenName}</span>
                <span style={{minWidth: '70px'}}>{tokenData.currntSupply}</span>
                <span style={{minWidth: '70px'}}>{tokenData.totalSupply}</span>
                <div
                    style={{ display: "flex", flexDirection: "column", gap: "3px" }}
                >
                    <span>{'$ ' + tokenData.price.dollar}</span>
                    <span>{tokenData.price.btcb}</span>
                </div>
                <img
                    src={tokenData.wallet}
                    alt="img"
                />
            </div>
            <hr />
        </>
    )
}

export default TokenDetails