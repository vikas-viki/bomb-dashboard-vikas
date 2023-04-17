import { Card } from '@material-ui/core';
import CardContent from '../../../components/CardContent/CardContent';
import React, { useState } from 'react'
import FarmCard from './FarmCard';
import BOMB_BTCB from "../../../assets/img/bomb-bitcoin-LP.png"
import bshare from "../../../assets/img/bshare-512.png";
import BSHARE_BNB from "../../../assets/img/bshare-bnb-LP.png";
import useBanks from '../../../hooks/useBanks';
import styled from 'styled-components';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useBombFinance from '../../../hooks/useBombFinance';

interface BombFarmsProps {
    bsharePrice: string;
}

const BombFarms: React.FC<BombFarmsProps> = ({ bsharePrice }) => {
    const [banks] = useBanks();
    const bombFinance = useBombFinance();
    const data = [
        {
            title: 'BOMB-BTCB',
            title_img: BOMB_BTCB,
            stake_img: BOMB_BTCB,
            earn_img: bshare,
            claim_img: bshare,
            bank: banks[2],
            stakedBalance: useStakedBalance(banks[2].contract, banks[2].poolId)
        },
        {
            title: 'BSHARE-BNB',
            title_img: BSHARE_BNB,
            stake_img: BSHARE_BNB,
            earn_img: bshare,
            claim_img: bshare,
            bank: banks[4],
            stakedBalance: useStakedBalance(banks[2].contract, banks[2].poolId)
        }
    ];

    type RewardClaimable = {
        title: string;
        checked: boolean;
        bank: any;
    };

    // Initialize the state with an array of RewardClaimable objects
    const initialRewardClaimables: RewardClaimable[] = [
        {
            title: 'BOMB-BTCB',
            checked: false,
            bank: [],
        },
        {
            title: 'BSHARE-BNB',
            checked: false,
            bank: [],
        },
    ];

    // claiming all the rewards and tokens.
    const [rewardClaimables, setRewardClaimables] = useState<RewardClaimable[]>(initialRewardClaimables);
    const [claimModalOpen, setClaimModalOpen] = useState(false);
    const claimAllRewards = async () => {
        const claims = rewardClaimables.filter(e => e.checked === true);
        claims.map(el => {
            try {
                bombFinance.exit(el.bank.contract, el.bank.poolId);
            } catch (error) {
                console.log(error);
            }
        })
    }


    return (
        <div style={{ marginTop: '75px' }}>
            <Card>
                <CardContent >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                gap: "15px",
                            }}
                        >
                            <h3 style={{ fontSize: "22px", lineHeight: "30px", fontWeight: 700 }}>
                                Bomb Farms
                            </h3>
                            <span
                            >
                                Stake your LP tokens in our farms to start earning BSHARE
                            </span>
                        </div>
                        <button
                            style={{
                                padding: "5px",
                                letterSpacing: '0.7px',
                                border: "1px solid #fff",
                                background: 'transparent',
                                color: '#fff',
                                paddingLeft: "15px",
                                paddingRight: "15px",
                                fontSize: "15px",
                                borderRadius: "20px",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                gap: '5px'
                            }}
                            onClick={() => { setClaimModalOpen(true); }}
                        >
                            <span style={{ fontSize: "15px", lineHeight: "20px" }}>
                                Claim All
                            </span>
                            <img
                                src="https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F2079639823-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Ffir9H9ck6r6eH3VEWFGa%252Ficon%252FbRCpgHPwDxe21uW2HTAz%252Fbomb-200x200.png%3Falt%3Dmedia%26token%3D03c750fa-e3bb-4d84-b1c6-2008f8c0d932"
                                alt="@@"
                                width="16"
                                height="16"
                            />
                        </button>
                        {claimModalOpen == true && (
                            <ModalWrapper id="modalWrapper">
                                <ModalContent>
                                    <ModalTitle>Select Stakes to claim rewards and withdraw tokens:</ModalTitle>
                                    <ModalCkeckBoxList id='modalCheckBoxWrapper'>
                                        {
                                            data.filter(el => el.stakedBalance.toNumber() > 0).length === 0 ? (
                                                <div>"You don't hold any tokens."</div>
                                            ) : (
                                                data.map((el, i) => (
                                                    <ModalInputCheckBoxWrapper key={i}>
                                                        <ModalInputCheckBox
                                                            value={el.title}
                                                            type="checkbox"
                                                            id={`Modal_${i}`}
                                                            onChange={(e) => {
                                                                e.persist(); // Persist the event object
                                                                setRewardClaimables(prevRewardClaimables => {
                                                                    // Clone the previous state object to avoid mutating it directly
                                                                    const updatedRewardClaimables = [...prevRewardClaimables];
                                                                    // Find the index of the object that needs to be updated
                                                                    const index = updatedRewardClaimables.findIndex(item => item.title === el.title);
                                                                    // Update the title property of the object at the found index
                                                                    updatedRewardClaimables[index] = { ...updatedRewardClaimables[index], title: el.title, checked: e.target.checked, bank: el.bank };
                                                                    return updatedRewardClaimables;
                                                                });
                                                            }}
                                                        />
                                                        <ModalCheckboxLabel htmlFor={`Modal_${i}`}>{el.title}</ModalCheckboxLabel>
                                                    </ModalInputCheckBoxWrapper>
                                                ))
                                            )}
                                    </ModalCkeckBoxList>
                                    <ModalButtonsContainer>
                                        <ModalButton onClick={() => {
                                            claimAllRewards();
                                        }}
                                        >Claim All</ModalButton>
                                        <ModalButtonCancel
                                            onClick={() => {
                                                setClaimModalOpen(false);
                                            }}
                                        >
                                            Cancel
                                        </ModalButtonCancel>
                                    </ModalButtonsContainer>
                                </ModalContent>
                            </ModalWrapper>
                        )
                        }
                    </div>
                    {
                        data.map((el, i) => (
                            <>
                                <FarmCard coin_data={el} key={i} bsharePrice={bsharePrice} />
                                {i == 0 && <hr style={{ width: '100%' }} />}
                            </>
                        ))
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default BombFarms;

export const ModalCheckboxLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
`

export const ModalInputCheckBoxWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const ModalCkeckBoxList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    flex-wrap: wrap;
    gap: 15px;
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* Adjust the opacity as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Adjust the z-index as needed */
`;


export const ModalContent = styled.div`
  background-color: #33373d;
  border-radius: 5px;
  padding: 30px;
  max-width: 600px;
  min-width: 400px;
  margin: 0 auto;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const ModalInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ModalInputCheckBox = styled.input`
width: 20px;
height: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const ModalButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;
export const ModalButtonCancel = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  background-color: rgb(255, 152, 152);
  color: #fff;
  cursor: pointer;
`;