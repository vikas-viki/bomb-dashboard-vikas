import React, { useEffect, useState, useMemo, useRef } from 'react';
import uparrow from "../../../assets/img/up-arrow.png";
import styled from 'styled-components';
import downarrow from "../../../assets/img/down-arrow.png";
import useStake from "../../../hooks/useStake";
import useWtihdraw from "../../../hooks/useWithdraw";
// for getting rewards and withdraw staked funds.
import useRedeem from "../../../hooks/useRedeem";
import useHarvest from '../../../hooks/useHarvest';
import useEarnings from '../../../hooks/useEarnings';
import useWithdraw from '../../../hooks/useWithdraw';
import useStakedBalance from "../../../hooks/useStakedBalance";
import useBombFinance from '../../../hooks/useBombFinance';
import { roundAndFormatNumber } from '../../../0x';
import useStatsForPool from '../../../hooks/useStatsForPool';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import { parseUnits } from 'ethers/lib/utils';
import {ModalWrapper, ModalContent, ModalTitle, ModalInput, ModalButtonsContainer, ModalButton, ModalButtonCancel} from "./BombFarms";

interface FarmCardProps {
    coin_data: {
        title: string,
        title_img: string,
        stake_img: string,
        earn_img: string,
        claim_img: string,
        bank: {
            address: string,
            closedForStaking: boolean,
            contract: string,
            depositToken: any,
            depositTokenName: string,
            earnToken: any,
            earnTokenName: string,
            finished: boolean,
            name: string,
            poolId: number,
            sectionInUI: number,
            sort: number
        };
    };
    bsharePrice: string;
}

const FarmCard: React.FC<FarmCardProps> = ({ coin_data, bsharePrice }) => {


    const bombFinance = useBombFinance();
    // Modal

    const inputRef = useRef(null);

    const [depositModalOpen, setDepositModalOpen] = useState(false);
    const [depositamt, setDepositamt] = useState(0);

    const [withdrawAmt, setWithdrawAmt] = useState(0);
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

    

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [depositModalOpen || withdrawModalOpen]);

    // Earning.

    const earnings = useEarnings(coin_data.bank.contract, coin_data.bank.earnTokenName, coin_data.bank.poolId);

    const bombStats = useBombStats();
    const tShareStats = useShareStats();

    const tokenStats = coin_data.bank.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
    const tokenPriceInDollars = useMemo(
        () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
        [tokenStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);



    // Staked.
    const stakedBalance = useStakedBalance(coin_data.bank.contract, coin_data.bank.poolId);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(coin_data.bank.depositTokenName, coin_data.bank.depositToken);
    const StakedTokenPriceInDollars = useMemo(
        () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
        [stakedTokenPriceInDollars],
    );
    const StakedEarnedInDollars = (
        Number(StakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, coin_data.bank.depositToken.decimal))
    ).toFixed(2);


    const tokenValue = useStatsForPool(coin_data.bank);

    

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                margin: '30px'
            }}
        >
            <div
                style={{
                    borderBottom: "1px solid #585e5a",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "10px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    <img
                        src={coin_data.title_img}
                        alt="@@"
                        width="33"
                        height="33"
                    />
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                        }}
                    >
                        <span style={{ fontSize: "22px" }}>{coin_data.title}</span>
                        <span
                            style={{
                                background: " rgba(0, 232, 162, 0.5)",
                                fontSize: "12px",
                                borderRadius: "5px",
                                padding: "3px",
                                height: "15px",
                            }}
                        >
                            Recomended
                        </span>
                    </div>
                </div>
                <div style={{ alignSelf: "center" }}>
                    <span>TVL: </span>
                    <span style={{ fontWeight: "600" }}>{'$ ' + (tokenValue?.TVL || 0)}</span>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    letterSpacing: "0.7px",
                }}
            >
                <div style={{ display: "flex", gap: "45px" }}>
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                    >
                        <span style={{ fontSize: "14px", letterSpacing: "0.7px" }}>
                            Daily Returns:{" "}
                        </span>
                        <span style={{ fontWeight: "600", fontSize: "16px" }}>{Number(tokenValue?.dailyAPR) || 0}%</span>
                    </div>
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                    >
                        <span style={{ fontSize: "14px", letterSpacing: "0.7px" }}>
                            Your Stake:{" "}
                        </span>
                        <span>
                            <img
                                src={coin_data?.stake_img}
                                alt="@"
                                width="16"
                                height="16"
                            />
                            <span style={{ fontWeight: "600" }}> {stakedBalance.toString()}</span>
                        </span>
                        <span>{'$ ' + (StakedEarnedInDollars || 0)}</span>
                    </div>
                    <div
                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                    >
                        <span style={{ fontSize: "14px", letterSpacing: "0.7px" }}>
                            Earned:{" "}
                        </span>
                        <span>
                            <img
                                src={coin_data.earn_img}
                                alt="@"
                                width="16"
                                height="16"
                            />
                            <span style={{ fontWeight: "600" }}> {(earnings.toString() || 0)}</span>
                        </span>
                        <span>{'$ ' + (earnedInDollars || 0)}</span>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        alignSelf: "flex-end",
                    }}
                >
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
                                        bombFinance.stake(coin_data.bank.contract, coin_data.bank.poolId, parseUnits(depositamt.toString(), coin_data.bank.depositToken.decimal))
                                            .then(console.log)
                                            .catch(e => { alert(e.error.data.message.split(':')[1] === " ds-math-sub-underflow" ? "Insufficient balance." : e.error.data.message.split(':')[1]) });
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
                        onClick={() => { setWithdrawModalOpen(true); }}
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
                                        bombFinance.unstake(coin_data.bank.contract, coin_data.bank.poolId, parseUnits(depositamt.toString(), coin_data.bank.depositToken.decimal))
                                            .then(console.log)
                                            .catch(e => { alert(e.error.data.message.split(':')[1] === " ds-math-sub-underflow" ? "Insufficient balance." : e.error.data.message.split(':')[1]) });
                                    }}
                                    >Deposit</ModalButton>
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
                    
                    <div>
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
                            }}
                            onClick={()=>{bombFinance.harvest(coin_data.bank.contract, coin_data.bank.poolId)}}
                        >
                            Claim Rewards &nbsp;
                            <img
                                src={coin_data.claim_img}
                                alt="@@"
                                width="16"
                                height="16"
                            />
                        </button>
                        
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FarmCard;

