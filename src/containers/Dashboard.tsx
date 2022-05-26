import { Grid, Typography, CircularProgress, Theme, Button, Tooltip, IconButton } from "@material-ui/core";
import useEthRPCStore from "../stores/useEthRPCStore";
import * as React from "react";
import { weiToGwei } from "../components/formatters";
import HashRate from "../components/HashRate";
import getBlocks, { useBlockNumber } from "../helpers";
import useInterval from "use-interval";
import { useTheme } from "@material-ui/styles";
import getTheme from "../themes/victoryTheme";
import ChartCard from "../components/ChartCard";
import BlockListContainer from "./BlockList";
import { hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";
import { ArrowForwardIos } from "@material-ui/icons";
import StatCharts from "../components/StatCharts";
import { Block as IBlock, IsSyncingResult as ISyncing} from "@etclabscore/ethereum-json-rpc";
import { Public } from "@material-ui/icons";
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

const useState = React.useState;

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export default (props: any) => {
  const [erpc] = useEthRPCStore();
  const theme = useTheme<Theme>();
  const victoryTheme = getTheme(theme);
  const [blockNumber] = useBlockNumber(erpc);
  const [chainId, setChainId] = useState<string>();
  const [block, setBlock] = useState<IBlock>();
  const [blocks, setBlocks] = useState<IBlock[]>();
  const [gasPrice, setGasPrice] = useState<string>();
  const [syncing, setSyncing] = useState<ISyncing>();
  const [peerCount, setPeerCount] = useState<string>();

  const { t } = useTranslation();

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_chainId().then((cid) => {
      if (cid === null) { return; }
      setChainId(cid);
    });
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc || blockNumber === undefined) { return; }
    erpc.eth_getBlockByNumber(`0x${blockNumber.toString(16)}`, true).then((b) => {
      if (b === null) { return; }
      setBlock(b);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  React.useEffect(() => {
    if (!erpc || blockNumber === null) { return; }
    getBlocks(
      Math.max(blockNumber - config.blockHistoryLength + 1, 0),
      blockNumber,
      erpc,
    ).then((bl) => {
      setBlocks(bl);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  useInterval(() => {
    if (!erpc) { return; }
    erpc.eth_syncing().then(setSyncing);
  }, 10000, true);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.net_peerCount().then(setPeerCount);
  }, [erpc]);

  React.useEffect(() => {
    if (!erpc) { return; }
    erpc.eth_gasPrice().then(setGasPrice);
  }, [erpc]);

  if (blocks === undefined || chainId === undefined || gasPrice === undefined || peerCount === undefined) {
    return <CircularProgress />;
  }

  return (
    <div style={{marginTop: "-20px"}}>

      <Grid container spacing={3} direction="column" style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "30px auto 30px auto",
          border: "0px",
          borderRadius: "10px",
          padding: "0px",
      }}>
        <Grid item container justify="center" style={{maxWidth: "95vw"}}>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          margin: "10px",
          padding: "25px",
          paddingTop: "25px",
          lineHeight: ".05",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "10px",
          textAlign: "center",
          minWidth: "15%",
        }}>

        <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: ".7"}}>Status</p>
        <p style={{fontSize: "24pt", fontWeight: "bold", lineHeight: ".7"}}>Active</p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          margin: "10px",
          padding: "25px",
          paddingTop: "25px",
          lineHeight: ".05",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "10px",
          textAlign: "center",
          minWidth: "15%",
        }}>

        <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: ".7"}}>Blocks</p>
        <p style={{fontSize: "24pt", fontWeight: "bold", lineHeight: ".7"}}>{blockNumber}</p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          margin: "10px",
          padding: "25px",
          paddingTop: "25px",
          lineHeight: ".05",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "10px",
          textAlign: "center",
          minWidth: "15%",
        }}>

        <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: ".7"}}>Chain ID</p>
        <p style={{fontSize: "24pt", fontWeight: "bold", lineHeight: ".7"}}>{hexToNumber(chainId)}
        <span style={{fontSize: "8pt", fontWeight: "normal"}}>&nbsp;{chainId}</span>
        </p>
        </div>

        <div style={{
          background: "rgba(0,0,0,0.05)",
          margin: "10px",
          padding: "25px",
          paddingTop: "25px",
          lineHeight: ".05",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "10px",
          textAlign: "center",
          minWidth: "15%",
        }}>

        <p style={{fontSize: "12pt", fontWeight: "bold", lineHeight: ".7"}}>Gas Price</p>
        <p style={{fontSize: "24pt", fontWeight: "bold", lineHeight: ".7"}}>{weiToGwei(hexToNumber(gasPrice)).toFixed(1)}
          <span style={{fontSize: "8pt", fontWeight: "normal"}}>&nbsp;GWEI</span>
        </p>
        </div>

        {syncing &&
          <div style={{
            background: "rgba(0,0,0,0.05)",
            margin: "10px",
            padding: "25px",
            paddingTop: "25px",
            lineHeight: ".05",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "50%",
            minWidth: "15%",
          }}>

            <p style={{fontSize: "12pt", fontWeight: "bold"}}>Syncing</p>
              {typeof syncing === "object" && syncing.currentBlock &&
            <p style={{fontSize: "24pt", fontWeight: "bold"}}>{hexToNumber(syncing.currentBlock)} / {hexToNumber(syncing.highestBlock || "0x0")}</p>
              }
          </div>
        }

        </Grid>
      </Grid>
      <div style={{marginTop: "50px"}}>
      <StatCharts victoryTheme={victoryTheme} blocks={blocks} />
      </div>

      <BlockListContainer
        from={Math.max(blockNumber - 14, 0)}
        to={blockNumber}
        disablePrev={true}
        disableNext={blockNumber < 14}
        onNext={() => {
          props.history.push(`/blocks/${blockNumber - 15}`);
        }}
        style={{
            width: "1280px",
            maxWidth: "90vw",
            margin: "auto",
            padding: "20px",
            background: "rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "10px",
        }} />

  <div style={{
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: "10px",
    maxWidth: "125px",
  }}>

    <Grid container alignItems="center" alignContent="center" style={{ margin: "auto", textAlign: "center" }}>

      <Grid item>
          <div style={{margin: "7px"}}>
            <Tooltip title={t("Official Website") as string}>
              <IconButton
                size="small"
                onClick={() =>
                  window.open("https://novanetwork.io/")
                    }
                  >
                  <Public />
              </IconButton>
          </Tooltip>
        </div>
      </Grid>

      <Grid item>
        <div style={{margin: "7px"}}>
          <Tooltip title={t("Official Twitter") as string}>
            <IconButton
              size="small"
              onClick={() =>
                window.open("https://twitter.com/NovaFinOfficial")
                  }
                >
                <TwitterIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>

        <Grid item>
          <div style={{margin: "7px"}}>
            <Tooltip title={t("Github") as string}>
              <IconButton
              size="small"
              onClick={() =>
                window.open("https://github.com/nova-network-inc/")
                  }
                >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>

      </Grid>
    </div>

    <div style={{ marginTop: "10px", marginBottom: "40px", textAlign: "center" }}>
      <p style={{lineHeight: ".2"}}><b>Nova Network Block Explorer</b></p>
      <p>©2022 Nova Network Inc.</p>
      <br />
    </div>
  </div>

  );
};
