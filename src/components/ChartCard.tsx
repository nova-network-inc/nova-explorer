import * as React from "react";
import { Typography, Card, CardContent } from "@material-ui/core";

interface IProps {
  children: any;
  title: string;
}

const ChartCard: React.FC<IProps> = (props) => {
  return (
    <Card style={{
      background: "rgba(0,0,0,0.05)",
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "10px",
      textAlign: "center",
      padding: "5px",
      margin: "10px",
      maxWidth: "90vw",
    }}
      elevation={0}
      >
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
