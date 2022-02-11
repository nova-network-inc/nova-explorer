import { Grid, Typography, CircularProgress, Theme, Button } from "@material-ui/core";
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
    <div style={{marginTop: "20px"}}>
      <Grid container spacing={3} direction="column" style={{
          width: "80%",
          margin: "30px auto 30px auto",
          border: "1px solid #C0C0C0",
          borderRadius: "20px",
          padding: "20px",
      }}>
        <Grid item container justify="center">

        {/* Element, Native Token */}

        <div style={{margin: "10px", padding: "10px", lineHeight: ".5", fontSize: "10pt"}}>
          <p>Native Coin</p>
          <p style={{fontSize: "14pt"}}>Nebula (NBX)</p>
          </div>

        {/* Element, Network Status */}

        <div style={{margin: "10px", padding: "10px", lineHeight: ".5", fontSize: "10pt"}}>
          <p>Network Status</p>
          <p style={{fontSize: "14pt"}}>Operational</p>
          </div>

        {/* Element, Latest Block */}

        <div style={{margin: "10px", padding: "10px", lineHeight: ".5", fontSize: "10pt"}}>
          <p>Latest Block</p>
          <p style={{fontSize: "14pt"}}>{blockNumber}</p>
          </div>

          {/* Left Chain ID out of the dashboard. Can be re-implemented by simply uncommenting it.

          <Grid key="chainId" item>
            <ChartCard title={t("Chain ID")}>
              <Typography variant="h4">{hexToNumber(chainId)}</Typography>
            </ChartCard>
          </Grid>
          */}

          {syncing &&
            <div key="syncing">
              <ChartCard title={t("Syncing")}>
                {typeof syncing === "object" && syncing.currentBlock &&
                  <Typography variant="h5">
                    {hexToNumber(syncing.currentBlock)} / {hexToNumber(syncing.highestBlock || "0x0")}
                  </Typography>
                }
              </ChartCard>
            </div>
          }

          <div style={{margin: "10px", padding: "10px", lineHeight: ".5", fontSize: "10pt"}}>
            <p>Gas Price</p>
            <p style={{fontSize: "14pt"}}>{weiToGwei(hexToNumber(gasPrice))} Gwei</p>
            </div>

          {/* :: Left the hash rate off the dashboard. Can be re-implemented by simply uncommenting it.

            <Grid key="hRate" item>
             <ChartCard title={t("Network Hash Rate")}>
              {block &&
                <HashRate block={block} blockTime={config.blockTime}>
                  {(hashRate: any) => <Typography variant="h4">{hashRate} GH/s</Typography>}
                </HashRate>
              }
            </ChartCard>
          </Grid>
          */}

          {/* :: Left the number of peers out of the dashboard. Can be re-implemented by simply uncommenting it.

          <Grid key="peers" item>
            <ChartCard title={t("Peers")}>
              <Typography variant="h4">{hexToNumber(peerCount)}</Typography>
            </ChartCard>
          </Grid>
          */}

        </Grid>
      </Grid>
      <StatCharts victoryTheme={victoryTheme} blocks={blocks} />
      <Grid container justify="flex-end">


      {/* Left the 'More Stats' button out of the dashboard. Can be re-implemented by simply uncommenting.

        <Button
          color="primary"
          variant="outlined"
          endIcon={<ArrowForwardIos />}
          onClick={() => props.history.push("/stats/miners")}
        >More Stats</Button>
        */}

      </Grid>


      <BlockListContainer
        from={Math.max(blockNumber - 14, 0)}
        to={blockNumber}
        disablePrev={true}
        disableNext={blockNumber < 14}
        onNext={() => {
          props.history.push(`/blocks/${blockNumber - 15}`);
        }}
        style={{
            width: "80%",
            margin: "30px auto 30px auto",
            border: "1px solid #C0C0C0",
            borderRadius: "20px",
            padding: "30px",
        }} />

        <div style={{ marginTop: "40px", marginBottom: "40px", textAlign: "center", lineHeight: ".5" }}>
        <p><b>Nova Explorer</b></p>
        <p>Powered by Nova Network Inc.</p>
        </div>
    </div >
  );
};
