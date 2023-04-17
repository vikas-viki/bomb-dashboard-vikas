import React, { useState, useRef, useEffect } from 'react';
import { Button, Card } from '@material-ui/core';
import CardContent from '../../../components/CardContent/CardContent';
import bshare from "../../../assets/img/bshare-512.png";
import bomb from "../../../assets/img/bomb-512.png"
import Discord from "../../../assets/img/discord_1.png"
import Docs from "../../../assets/img/read_docs.png";
import uparrow from "../../../assets/img/up-arrow.png";
import downarrow from "../../../assets/img/down-arrow.png";
import useBanks from "../../../hooks/useBanks";
import { ModalWrapper, ModalContent, ModalTitle, ModalInput, ModalButtonsContainer, ModalButton, ModalButtonCancel } from "./BombFarms";
import useBombFinance from '../../../hooks/useBombFinance';
interface InvestmentProps {
    boardRoomData: {
        bshareTVL: string;
        totalStaked: string;
        userEarnings: string;
        userStake: string;
        bsharePrice: string;
        bombPrice: number;
    }
}


const InvestMent: React.FC<InvestmentProps> = ({ boardRoomData }) => {
    const [banks] = useBanks();

    const inputRef = useRef(null);


    const bombFinance = useBombFinance();

    const bshareBank = banks[banks.length - 1];

    const [depositModalOpen, setDepositModalOpen] = useState(false);
    const [depositamt, setDepositamt] = useState(0);

    const [withdrawAmt, setWithdrawAmt] = useState(0);
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [depositModalOpen || withdrawModalOpen]);

    return (
        <div
            style={{
                marginTop: '75px',
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                width: '100%',
                gap: "30px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <div style={{ textAlign: "end", color: "#9EE6FF" }}>
                    <a
                        target='_blank'
                        href="https://docs.bomb.money/strategies/general-quick-roi-strategy"
                        style={{ width: "100%", color: "#9EE6FF", letterSpacing: "1.3px" }}
                    >
                        Read Investment Stratergy
                    </a>
                    {" >"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <button
                        style={{
                            padding: "7px",
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: "24px",
                            background:
                                "radial-gradient(at 50% 50%, rgba(0, 245, 171, 0.5) 0%, rgba(0, 173, 232, 0.5) 100%)",
                            borderRadius: "3px",
                            border: 'none',
                            outline: 'none'
                        }}
                    >
                        <span>Invest Now</span>
                    </button>

                    <div style={{ display: "flex", gap: "15px", width: "100%" }}>
                        <a href="http://discord.bomb.money/" target='_blank' style={{
                            textDecoration: 'none', color: 'black', flex: "1", width: '100%', backgroundColor: "rgba(255, 255, 255, 0.5)", cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>

                            <button
                                style={{
                                    padding: "7px",
                                    fontSize: "18px",
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                    borderRadius: "3px",
                                    flex: "1",
                                    border: 'none',
                                    outline: 'none',
                                    fontWeight: '600',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center', cursor: 'pointer'
                                }}
                            >
                                <div style={{ borderRadius: '50%', backgroundColor: '#fff', width: '35px', height: '35px', display: 'inline-block', marginRight: '7px' }}>
                                    <img src={Discord} alt='@' width='27' height='27' style={{ margin: '3px' }} />
                                </div>
                                Chat on Discord
                            </button>
                        </a>
                        <a href="https://docs.bomb.money/" target='_blank' style={{
                            textDecoration: 'none', color: 'black', flex: "1", width: '100%', backgroundColor: "rgba(255, 255, 255, 0.5)", cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <button
                                style={{
                                    padding: "7px",
                                    fontSize: "18px",
                                    width: '100%',
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                    borderRadius: "3px",
                                    border: 'none',
                                    outline: 'none',
                                    fontWeight: '600',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center', cursor: 'pointer'
                                }}
                            >
                                <div style={{ borderRadius: '50%', backgroundColor: '#fff', width: '35px', height: '35px', display: 'inline-block', marginRight: '7px' }}>
                                    <img src={Docs} alt='@' width='27' height='27' style={{ margin: '3px' }} />
                                </div>
                                Read Docs
                            </button>
                        </a>
                    </div>
                </div>
                <Card>
                    <CardContent>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                borderRadius: "10px",
                            }}
                        >
                            <div
                                style={{
                                    borderBottom: "1px solid #728CDF",
                                    display: "flex",
                                    gap: "144px",
                                    padding: "10px",
                                }}
                            >
                                <div
                                    style={{ display: "flex", justifyContent: "start", gap: "15px" }}
                                >
                                    <img
                                        src={bshare}
                                        alt="@@"
                                        width="48"
                                        height="48"
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "15px",
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <span style={{ fontSize: "22px" }}>Boardroom </span>
                                            <span
                                                style={{
                                                    background: " rgba(0, 232, 162, 0.5)",
                                                    fontSize: "14px",
                                                    borderRadius: "5px",
                                                    padding: "3px",
                                                    height: "15px",
                                                }}
                                            >
                                                Recomended
                                            </span>
                                        </div>
                                        <span>Stake BSHARE and earn BOMB every epoch</span>
                                    </div>
                                </div>
                                <div style={{ alignSelf: "flex-end" }}>
                                    <span>TVL: </span>
                                    <span style={{ fontWeight: "600" }}>{'$ ' + (boardRoomData.bshareTVL || '000')}</span>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "20px",
                                    padding: "15px",
                                }}
                            >
                                <div style={{ alignSelf: "flex-end" }}>
                                    <span>Total Staked: </span>
                                    <span>
                                        <img
                                            src={bshare}
                                            alt="@"
                                            width="16"
                                            height="16"
                                        />
                                        <span style={{ fontWeight: "600" }}>{boardRoomData.totalStaked || '000'}</span>
                                    </span>
                                </div>
                                <div
                                    style={{ display: "flex", gap: "45px", letterSpacing: "0.7px" }}
                                >
                                    <div
                                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                                    >
                                        <span style={{ fontSize: "14px", letterSpacing: "0.7px" }}>
                                            Daily Returns:{" "}
                                        </span>
                                        <span style={{ fontWeight: "600", fontSize: "16px" }}>2%</span>
                                    </div>
                                    <div
                                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                                    >
                                        <span style={{ fontSize: "14px", letterSpacing: "0.7px" }}>
                                            Your Stake:{" "}
                                        </span>
                                        <span>
                                            <img
                                                src={bshare}
                                                alt="@"
                                                width="16"
                                                height="16"
                                            />
                                            <span style={{ fontWeight: "600" }}> {boardRoomData.userStake || '0'}</span>
                                        </span>
                                        <span>={'$ ' + (Number(boardRoomData?.bsharePrice || 0) * Number(boardRoomData?.userStake || 0))}</span>
                                    </div>
                                    <div
                                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                                    >
                                        <span style={{ fontSize: "14px", letterSpacing: "0.7px" }}>
                                            Earned:{" "}
                                        </span>
                                        <span>
                                            <img
                                                src={bomb}
                                                alt="@"
                                                width="16"
                                                height="16"
                                            />
                                            <span style={{ fontWeight: "600" }}> {(Number(boardRoomData?.userEarnings || 0) / Number(boardRoomData?.bombPrice || 0)) || '0'}</span>
                                        </span>
                                        <span>= {'$ ' + (boardRoomData.userEarnings || '0')}</span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "15px",
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: "15px" }}>
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
                                                onClick={() => { setDepositModalOpen(true); }}
                                            >
                                                <span>Deposit</span> <img src={uparrow} alt='@' width='17' height='17' style={{ backgroundColor: '#fff', borderRadius: '50%' }} />

                                            </button>
                                            {depositModalOpen == true && (
                                                <ModalWrapper id="modalWrapper">
                                                    <ModalContent>
                                                        <ModalTitle>Enter Deposit Amount</ModalTitle>
                                                        <ModalInput type="number" id='modalInput' ref={inputRef} value={depositamt}
                                                            onChange={
                                                                (e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    const inputValue = e.target.value;
                                                                    setDepositamt(Number(inputValue));
                                                                }} />
                                                        <ModalButtonsContainer>
                                                            <ModalButton onClick={() => {
                                                                bombFinance.stakeShareToBoardroom(String(depositamt))
                                                                    .then(console.log)
                                                                    .catch(e => alert(e.error.data.message.split(':')[2]));
                                                            }}
                                                            >Deposit</ModalButton>
                                                            <ModalButtonCancel
                                                                onClick={() => {
                                                                    setDepositModalOpen(false);
                                                                }}
                                                            >
                                                                Cancel
                                                            </ModalButtonCancel>
                                                        </ModalButtonsContainer>
                                                    </ModalContent>
                                                </ModalWrapper>
                                            )
                                            }
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
                                                onClick={() => {
                                                    setWithdrawModalOpen(true);
                                                }}
                                            >
                                                <span>Withdraw</span> <img src={downarrow} alt='@' width='17' height='17' style={{ backgroundColor: '#fff', borderRadius: '50%' }} />
                                            </button>
                                            {withdrawModalOpen == true && (
                                                <ModalWrapper id="modalWrapper">
                                                    <ModalContent>
                                                        <ModalTitle>Enter Withdrawal Amount</ModalTitle>
                                                        <ModalInput type="number" id='modalInput' ref={inputRef} value={withdrawAmt}
                                                            onChange={
                                                                (e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    const inputValue = e.target.value;
                                                                    setWithdrawAmt(Number(inputValue));
                                                                }} />
                                                        <ModalButtonsContainer>
                                                            <ModalButton onClick={() => {
                                                                bombFinance.withdrawShareFromBoardroom(String(depositamt))
                                                                    .then(console.log)
                                                                    .catch(e => alert(e.error.data.message.split(':')[2]));
                                                            }}
                                                            >Withdraw</ModalButton>
                                                            <ModalButtonCancel
                                                                onClick={() => {
                                                                    setWithdrawModalOpen(false);
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
                                        <div>
                                            <button
                                                style={{
                                                    padding: "5px",
                                                    letterSpacing: '0.7px',
                                                    border: "1px solid #fff",
                                                    background: 'transparent',
                                                    color: '#fff',
                                                    width: "100%",
                                                    fontSize: "15px",
                                                    borderRadius: "20px",
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    bombFinance.harvestCashFromBoardroom()
                                                        .then(console.log)
                                                        .catch(e => alert(e.error.data.message.split(':')[2]));
                                                }}
                                            >
                                                Claim Rewards &nbsp;
                                                <img
                                                    src={bshare}
                                                    alt="@@"
                                                    width="16"
                                                    height="16"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div
                style={{
                    borderRadius: "4px",
                    color: ' #dddfee',
                    padding: '20px',
                    backgroundColor: '#171923',
                    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    width: '100%',
                    flex: "1",
                    fontSize: "22px",
                    boxShadow: 'box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                }}
            >
                <span>Latest News</span>
            </div>
        </div>
    )
}

export default InvestMent;
