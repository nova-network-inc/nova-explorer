import * as React from "react";
import { Typography, IconButton, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import TxList from "../TxList";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Transaction } from "@etclabscore/ethereum-json-rpc";

export interface IProps {
  transactions: Transaction[];
  from: number;
  to: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  style?: any;
}

const AddressTransactions: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div style={{
      margin: "auto",
      marginBottom: "20px",
      textAlign: "center",
      maxWidth: "1280px"
      }}>
      <div style={{
        background: "rgba(0,0,0,0.05)",
        margin: "10px",
        marginTop: "20px",
        padding: "35px",
        paddingTop: "45px",
        lineHeight: ".05",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "10px",
        textAlign: "center",
        minWidth: "15%",
      }}>
      <Grid container justify="flex-end">
        <IconButton onClick={props.onPrev} disabled={props.disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={props.onNext} disabled={props.disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <Grid container justify="flex-end">
        <Typography>Block Range: {props.to} - {props.from}</Typography>
      </Grid>
      <TxList transactions={props.transactions || []} showBlockNumber={true}></TxList>
      {(!props.transactions || props.transactions.length === 0) &&
        <Grid container style={{ padding: "15px" }}>
          <Typography>{t("No Transactions for this block range.")}</Typography>
        </Grid>
      }
      <div style={{margin: "10px"}} />
      </div>
    </div>
  );
};

export default AddressTransactions;
