import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import TxList from "../TxList";
import { hexToDate, hexToString, hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Table, TableBody, TableCell, TableRow, Button, LinearProgress, Typography } from "@material-ui/core";

import BlockGasPrice from "./BlockGasPrice";

function BlockView(props: any) {
  const { block } = props;
  const history = useHistory();
  const { t } = useTranslation();

  if (!block) {
    return (<div>Loading...</div>);
  }

  const {
    timestamp, hash, parentHash, miner, nonce, difficulty,
    extraData, stateRoot, transactionsRoot, receiptsRoot, transactions,
    gasUsed, gasLimit, size,
  } = block;

  const filledPercent = (hexToNumber(gasUsed) / hexToNumber(gasLimit)) * 100;

  return (

    <div style={{
      width: "95%",
      margin: "30px auto 30px auto",
      border: "1px solid #C0C0C0",
      borderRadius: "20px",
      padding: "20px",
    }}>

    <h2 style={{textAlign: "left" }}>🔎 Exploring Block {hexToNumber(block.number)}</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell><b>{t("Number")}</b></TableCell>
            <TableCell>{hexToNumber(block.number)} ({block.number})</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Gas Usage")}</b></TableCell>
            <TableCell>
              <Typography variant="caption">
                {hexToNumber(gasUsed)}/{hexToNumber(gasLimit)}
              </Typography>
              <LinearProgress
                style={{width: "150px"}}
                value={filledPercent}
                variant="determinate"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Timestamp")}</b></TableCell>
            <TableCell>
              {t("Timestamp Date", { date: hexToDate(timestamp) })}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Hash")}</b></TableCell>
            <TableCell>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("ParentHash")}</b></TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/block/${parentHash}`}>
                    {children}
                  </RouterLink>
                )}>
                {parentHash}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Validator")}</b></TableCell>
            <TableCell>{hexToString(extraData)} ({extraData})</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Coinbase")}</b></TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/address/${miner}`}>
                    {children}
                  </RouterLink>
                )}>
                {miner}
              </Link>
            </TableCell>
          </TableRow>

          <BlockGasPrice block={block} />

          <TableRow>
            <TableCell><b>{t("Gas Limit")}</b></TableCell>
            <TableCell>{hexToNumber(gasLimit)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Size")}</b></TableCell>
            <TableCell>{hexToNumber(size)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Nonce")}</b></TableCell>
            <TableCell>{hexToNumber(nonce)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Difficulty")}</b></TableCell>
            <TableCell>{hexToNumber(difficulty)} ({difficulty})</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("State Root")}</b></TableCell>
            <TableCell>{stateRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Transaction Root")}</b></TableCell>
            <TableCell>{transactionsRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><b>{t("Receipts Root")}</b></TableCell>
            <TableCell>{receiptsRoot}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h3>📃 Transactions Processed</h3>
      <TxList transactions={transactions} />

    </div>
  );
}

export default BlockView;
