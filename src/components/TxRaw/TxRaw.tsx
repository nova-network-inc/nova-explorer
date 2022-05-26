import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import useDarkMode from "use-dark-mode";
import { Transaction } from "@etclabscore/ethereum-json-rpc";
import ReceiptIcon from '@material-ui/icons/Receipt';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

interface IProps {
  tx: Transaction;
  receipt: any;
}

const TxRaw: React.FC<IProps> = (props) => {
  const history = useHistory();
  const darkMode = useDarkMode();
  const { tx, receipt } = props;

  return (
    <div>
    <h2 style={{textAlign: "center", margin: "20px"}}>Raw Transaction Details</h2>
    <div style={{
      width: "1280px",
      maxWidth: "90vw",
      background: "rgba(0,0,0,0.05)",
      overflowX: "auto",
      margin: "20px auto 20px auto",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "10px",
      padding: "15px",
      }}>
      <Button
        onClick={() => {
          history.push(`/tx/${tx.hash}`);
        }}
        color="secondary"
        variant="outlined"
        style={{ position: "relative", borderRadius: "99px", marginBottom: "10px" }}
      >View Summary</Button>
      <br />
      <Typography variant="h5" gutterBottom style={{ margin: "10px" }}><SwapHorizIcon style={{marginBottom: "-5px"}} /> Transaction</Typography>
      <br />
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          wordWrap: "on",
          wrappingIndent: "deepIndent",
          readOnly: true,
          showFoldingControls: "always",
        }}
        theme={darkMode.value ? "dark" : "light"}
        width="100%"
        height="35vh"
        language="json"
        value={JSON.stringify(tx, null, 4)}
      />
      <br />
      <Typography variant="h6" gutterBottom style={{ margin: "10px" }}><ReceiptIcon style={{marginBottom: "-5px"}} /> Receipt</Typography>
      <br />
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: "off",
          wordWrap: "on",
          wrappingIndent: "deepIndent",
          readOnly: true,
          showFoldingControls: "always",
        }}
        theme={darkMode.value ? "dark" : "light"}
        width="100%"
        height="35vh"
        language="json"

        value={JSON.stringify(receipt, null, 4)}
      />

    </div>
    <div style={{margin: "30px"}}>&nbsp;</div>
    </div>
  );
};

export default TxRaw;
