import * as React from "react";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import useDarkMode from "use-dark-mode";
import Link from "@material-ui/core/Link";

export interface IAddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

function AddressView(props: IAddressViewProps) {
  const { address, balance, txCount, code } = props;
  const { t } = useTranslation();
  const darkMode = useDarkMode();
  return (
  <div style={{
    margin: "auto",
    textAlign: "center",
    maxWidth: "1280px"
  }}>

    <div style={{margin: "20px"}}>
      <p style={{fontSize: "16pt", fontWeight: "bold", lineHeight: ".2"}}>
        <SupervisedUserCircleIcon style={{marginBottom: "-5px"}} /> Address Explorer </p>
      <p style={{fontSize: "10pt", lineHeight: ".2"}}> {address} </p>
    </div>

    <Grid item container justify="center" style={{maxWidth: "95vw"}}>

      <div style={{
        background: "rgba(255,255,255,0.05)",
        margin: "10px",
        padding: "35px",
        paddingTop: "45px",
        lineHeight: ".05",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: "10px",
        textAlign: "center",
        minWidth: "15%",
      }}>

      <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: "1"}}>Balance</p>
      <p style={{fontSize: "18pt", fontWeight: "bold", lineHeight: "1"}}>{balance.substring(0,10)}</p>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.05)",
        margin: "10px",
        padding: "35px",
        paddingTop: "45px",
        lineHeight: ".05",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: "10px",
        textAlign: "center",
        minWidth: "15%",
      }}>

      <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: "1"}}>Total Txns</p>
      <p style={{fontSize: "18pt", fontWeight: "bold", lineHeight: "1"}}>{txCount}</p>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.05)",
        margin: "10px",
        padding: "25px",
        paddingTop: "30px",
        lineHeight: ".05",
        border: "1px solid rgba(0,0,0,0.05)",
        borderRadius: "10px",
        textAlign: "center",
        minWidth: "15%",
      }}>

      <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: "1"}}>Explore</p>
        <div style={{fontSize: "10pt", marginTop: "25px"}}>
          <p style={{lineHeight: "0.3"}}><Link href={ 'https://etherscan.com/address/' + address } target='_blank'>Ethereum</Link></p>
          <p style={{lineHeight: "0.3"}}><Link href={ 'https://etherscan.com/address/' + address } target='_blank'>Binane SC</Link></p>
          <p style={{lineHeight: "0.3"}}><Link href={ 'https://ftmscan.com/address/' + address } target='_blank'>Fantom Opera</Link></p>
        </div>
      </div>
    </Grid>

    <div style={{
      background: "rgba(255,255,255,0.05)",
      margin: "10px",
      padding: "25px",
      lineHeight: ".05",

      border: "1px solid rgba(0,0,0,0.05)",
      borderRadius: "10px",
      textAlign: "center",
      minWidth: "15%",
    }}>

    <p style={{fontSize: "12pt", fontWeight: "bold"}}>Deployed ByteCode</p>

    <textarea style={{
      background: "transparent",
      color: "#A8A8A8",
      border: "0px solid transparent",
      width: "100%",
      height: "100px"
    }}>
    {code}
    </textarea>
    <p style={{margin: "auto", marginTop: "20px", textAlign: "right", fontSize: "8pt", fontWeight: "bold"}}>
      <Link href="https://smui.novanetwork.io/" target="_blank">SMUI ↗</Link>&nbsp;&nbsp;
      <Link href="https://ethervm.io/decompile" target="_blank">Decompile ↗</Link>
    </p>
    </div>
  </div>

  );
}

export default AddressView;
