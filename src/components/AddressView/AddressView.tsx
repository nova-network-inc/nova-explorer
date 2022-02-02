import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
    <div style={{marginTop: "20px"}}>
    <Card>
      <CardContent>
        <Typography variant="h6">{t("Address")}: <b>{address}</b></Typography>
        <Typography variant="h6">{t("Balance")}: <b>{balance}</b></Typography>
        <Typography variant="h6">{t("Total Transactions")}: <b>{txCount}</b></Typography>
        <br />
        <div>
          <div>{t("Code")}</div>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

export default AddressView;
