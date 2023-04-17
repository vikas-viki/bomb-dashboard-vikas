import { Card } from '@material-ui/core'
import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react'
import CardContent from '../../../components/CardContent/CardContent';
import Bond from "../../../assets/img/bbond-512.png";
import uparrow from "../../../assets/img/up-arrow.png";
import downarrow from "../../../assets/img/down-arrow.png";
import useBondStats from '../../../hooks/useBondStats';
import useBombFinance from '../../../hooks/useBombFinance';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { ModalWrapper, ModalContent, ModalTitle, ModalInput, ModalButtonsContainer, ModalButton, ModalButtonCancel } from "./BombFarms";
import { roundAndFormatNumber } from '../../../0x';

const Bonds = () => {
    const inputRef = useRef(null);

    const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
    const [purchaseAmt, setPurchaseAmount] = useState(0);

    const [redeemModalOpen, setRedeemModalOpen] = useState(false);
    const [redeemAmt, setRedeemAmt] = useState(0);


    const addTransaction = useTransactionAdder();
    const bondStat = useBondStats();
    const bombFinance = useBombFinance();
    const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);


    const handleBuyBonds = useCallback(
        async (amount: string) => {
            const tx = await bombFinance.buyBonds(amount);
            addTransaction(tx, {
                summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
            });
        },
        [bombFinance, addTransaction],
    );

    const handleRedeemBonds = useCallback(
        async (amount: string) => {
            const tx = await bombFinance.redeemBonds(amount);
            addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
        },
        [bombFinance, addTransaction],
    );

    const bondBalance = useTokenBalance(bombFinance?.BBOND);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [purchaseModalOpen || redeemModalOpen]);

    return (
        <div style={{ marginTop: '75px' }}>

            <Card>
                <CardContent>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: '15px'
                        }}
                    >
                        <img
                            src={Bond}
                            alt="@"
                            width="48"
                            height="48"
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                justifyContent: "flex-start",
                            }}
                        >
                            <h2>Bonds</h2>
                            <span>
                                BBOND can be purchased only on contraction periods, when TWAP of
                                BOMB is below 1
                            </span>
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div
                        style={{
                            display: "flex",
                            flex: "1",
                            justifyContent: "space-between",
                            margin: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                flexDirection: "column",
                                gap: "17px",
                            }}
                        >
                            <span>
                                <span>Current Price: </span>
                                <span>{'$ ' +roundAndFormatNumber(Number(bondStat?.priceInDollars || 0), 2)}</span>
                            </span>
                            <span style={{ fontWeight: 700, fontSize: "22px" }}>
                               10K BBond = {Number(bondStat?.tokenInFtm || 0).toFixed(4) || '-'} {'BTC'}
                            </span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                flexDirection: "column",
                                gap: "17px",
                            }}
                        >
                            <span>Available to redeem: </span>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "5px",
                                }}
                            >
                                <img
                                    src={Bond}
                                    alt="@"
                                    width={"39"}
                                    height="39"
                                />
                                <span style={{ fontWeight: 700, fontSize: "36px" }}>{getDisplayBalance(bondBalance).slice(0, 4)}</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "100px",
                                    alignItems: "center",
                                    flex: "1",
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <span
                                    style={{ display: "flex", flexDirection: "column", gap: "3px" }}
                                >
                                    <span>Purchase BBond</span>
                                    <span>{!isBondPurchasable
                                        ? 'BOMB is over peg'
                                        : 'Available for purchase'}</span>
                                </span>
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
                                        cursor: isBondPurchasable && 'pointer',
                                        gap: '5px',
                                        opacity: isBondPurchasable ? '1' : '0.5',
                                    }}
                                    disabled={!isBondPurchasable}
                                    onClick={() => { setPurchaseModalOpen(true); }}
                                >
                                    <span>Purchase </span> <img src={uparrow} alt='@' width='17' height='17' style={{ backgroundColor: '#fff', borderRadius: '50%' }} />

                                </button>
                                {purchaseModalOpen == true && (
                                    <ModalWrapper id="modalWrapper">
                                        <ModalContent>
                                            <ModalTitle>Enter Purchase Amount</ModalTitle>
                                            <ModalInput type="number" id='modalInput' ref={inputRef} value={purchaseAmt}
                                                onChange={
                                                    (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const inputValue = e.target.value;
                                                        setPurchaseAmount(Number(inputValue));
                                                    }} />
                                            <ModalButtonsContainer>
                                                <ModalButton onClick={() => {
                                                    handleBuyBonds(purchaseAmt.toString())
                                                        .then(console.log)
                                                        .catch(e => alert(e.error.data.message.split(':')[2] === ' burn amount exceeds allowance' ? 'Insufficient BOMB balance.' : e.error.data.message.split(':')[2]));
                                                }}
                                                >Purchase</ModalButton>
                                                <ModalButtonCancel
                                                    onClick={() => {
                                                        setPurchaseModalOpen(false);
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
                            <hr style={{ width: '100%' }} />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "100px",
                                    alignItems: "center",
                                    flex: "1",
                                    marginTop: "10px",
                                    marginLeft: "10px",
                                }}
                            >
                                <span style={{ alignSelf: 'flex-start' }}>Redeem Bomb</span>
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
                                    onClick={() => { setRedeemModalOpen(true); }}
                                >
                                    <span>Reedem </span> <img src={downarrow} alt='@' width='17' height='17' style={{ backgroundColor: '#fff', borderRadius: '50%' }} />
                                </button>
                                {redeemModalOpen == true && (
                                    <ModalWrapper id="modalWrapper">
                                        <ModalContent>
                                            <ModalTitle>Enter Reedem Amount</ModalTitle>
                                            <ModalInput type="number" id='modalInput' ref={inputRef} value={redeemAmt}
                                                onChange={
                                                    (e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const inputValue = e.target.value;
                                                        setRedeemAmt(Number(inputValue));
                                                    }} />
                                            <ModalButtonsContainer>
                                                <ModalButton onClick={() => {
                                                    handleRedeemBonds(purchaseAmt.toString())
                                                        .then(console.log)
                                                        .catch(e => alert(e.error.data.message.split(':')[2]));
                                                }}
                                                >Reedem</ModalButton>
                                                <ModalButtonCancel
                                                    onClick={() => {
                                                        setRedeemModalOpen(false);
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
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Bonds