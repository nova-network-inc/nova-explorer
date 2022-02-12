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
    <div style={{
      width: "100%",
      overflowX: "auto",
      margin: "20px auto 20px auto",
      border: "1px solid #c0c0c0",
      borderRadius: "10px",
      padding: "15px",
      maxWidth: "1280px"
      }}>
      <Button
        onClick={() => {
          history.push(`/tx/${tx.hash}`);
        }}
        color="secondary"
        variant="outlined"
        style={{ position: "relative", borderRadius: "10px", marginBottom: "10px" }}
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
  );
};

export default TxRaw;
