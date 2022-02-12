import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Editor from "@monaco-editor/react";
import useDarkMode from "use-dark-mode";

export interface IAddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

function AddressView(props: IAddressViewProps) {
  const { address, balance, txCount, code } = props;
  const { t } = useTranslation();
  return (
    <div style={{
      width: "100%",
      overflowX: "auto",
      margin: "20px auto 20px auto",
      border: "1px solid #c0c0c0",
      borderRadius: "10px",
      padding: "15px",
      maxWidth: "1280px"
      }}>
      <h2><SupervisedUserCircleIcon style={{marginBottom: "-5px"}} /> Address Explorer</h2>
    <Card>
      <CardContent style={{
        width: "100%",
        overflowX: "auto",
        border: "1px solid #c0c0c0",
        borderRadius: "10px",
        padding: "15px",
        maxWidth: "1280px",
        lineHeight: "1.5",
        }}>
        <div style={{fontSize: "12pt", fontWeight: "bold"}}>Blockchain Address: <span style={{fontWeight: "normal"}}>{address}</span></div>
        <div style={{fontSize: "12pt", fontWeight: "bold"}}>Balance: <span style={{fontWeight: "normal"}}>{balance} NBX</span></div>
        <div style={{fontSize: "12pt", fontWeight: "bold"}}>Total Transactions: <span style={{fontWeight: "normal"}}>{txCount}</span></div>
        <div>
          <div style={{fontSize: "12pt", fontWeight: "bold"}}>Smart Contract Code:</div>
          <pre>
            <textarea style={{
              width: "100%",
              minHeight: "100px",
              overflowX: "auto",
              border: "1px solid #c0c0c0",
              borderRadius: "10px",
              padding: "20px",
            }}>{code}</textarea>
          </pre>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

export default AddressView;
