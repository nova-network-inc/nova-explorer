# Nova Explorer

Nova Explorer is Nova Network's officially supported block explorer. It has been initially forked from the open-source Expedition (https://expedition.dev), and we have worked a great deal on modifications, customisations, and improvements to bring it to its current state.

It is open-source, and we are very open to public contributions, so feel free to submit your changes.

## Requirements

For the purposes of this tutorial, we will be using `yarn` as our package manager, but you can also use it with `npm` if you prefer. Other than that, that are no other libraries, or packages you will need to pre-install in order to run Nova Explorer.

## Running Nova Explorer

Nova Explorer is easy to install and run, and you can do it in three simple steps. First, clone the repository to your local machine:

```shell
git clone https://github.com/nova-network-inc/nova-explorer.git
```

If you don't have Git CLI installed, you can clone the repository manually by downloading it directly from Github, and then extracting the `nova-explorer` folder anywhere in your computer.

Now that you have all the package files, navigate to your root folder - you can use `cd nova-explorer` if you have cloned using CLI - and run the following command to install the dependencies:

```shell
yarn install
```

It will take some time for all dependencies to be installed, but once finished, all you need to do is to run the code using:

```shell
yarn start
```

And once started, you can access Nova Explorer via your `localhost` port `3000` - type `http://localhost:3000` in your internet browser.

## Natively Compatible Networks

Nova Explorer currently supports `Nova Network` as its primary network, but also offers support to `Nebula Testnet`, `Ethereum`, `Binance Smartchain`, and `Fantom Opera`. You can add support for more networks - or even your own private Nova Network instance - by editing the file `/src/hooks/useChainList.ts`.
