"use client";

import { Button } from "@/components/ui/button";
import { connectMetaMask, signMessage } from "@/lib/web3";
import * as Avatar from "@radix-ui/react-avatar";
import * as Select from "@radix-ui/react-select";
import axios from "axios";
import { ethers } from "ethers";
import { ChevronDown, Loader2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Network {
  chainId: string;
  name: string;
  symbol: string;
  rpcUrl: string;
  blockExplorer: string;
  apiUrl?: string;
  apiKey?: string;
  color: string;
}

interface Token {
  address: string;
  symbol: string;
  decimals: number;
  balance: string;
  name: string;
}

interface Transaction {
  hash: string;
  to: string;
  from: string;
  value: string;
  blockNumber: string;
  timeStamp: string;
  gasUsed: string;
  gasPrice: string;
  tokenSymbol?: string;
  tokenName?: string;
}

interface WalletData {
  account: string;
  balance: string;
  transactions: Transaction[];
  tokens: Token[];
  currentNetwork: Network;
}

const NETWORKS: Network[] = [
  {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    symbol: "ETH",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
    apiUrl: "https://api.etherscan.io/api",
    apiKey: "YOUR_API_KEY",
    color: "#627EEA",
  },
  {
    chainId: "0x38",
    name: "BSC Mainnet",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed1.binance.org/",
    blockExplorer: "https://bscscan.com",
    apiUrl: "https://api.bscscan.com/api",
    apiKey: "YOUR_API_KEY",
    color: "#F3BA2F",
  },
  {
    chainId: "0x89",
    name: "Polygon Mainnet",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com",
    apiUrl: "https://api.polygonscan.com/api",
    apiKey: "YOUR_API_KEY",
    color: "#8247E5",
  },
  {
    chainId: "0xa86a",
    name: "Avalanche C-Chain",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorer: "https://snowtrace.io",
    apiUrl: "https://api.snowtrace.io/api",
    apiKey: "YOUR_API_KEY",
    color: "#E84142",
  },
];

export default function SignIn() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0]);
  const router = useRouter();

  const switchNetwork = async (network: Network) => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      });
      setSelectedNetwork(network);
      if (walletData) {
        await refreshData(network);
      }
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: network.chainId,
                chainName: network.name,
                nativeCurrency: {
                  name: network.symbol,
                  symbol: network.symbol,
                  decimals: 18,
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.blockExplorer],
              },
            ],
          });
          setSelectedNetwork(network);
          if (walletData) {
            await refreshData(network);
          }
        } catch (addError) {
          console.error("Failed to add network:", addError);
          setError(`Cannot add network ${network.name}`);
        }
      } else {
        console.error("Failed to switch network:", switchError);
        setError(`Cannot switch to ${network.name}`);
      }
    }
  };

  const getTokenBalances = async (
    address: string,
    network: Network
  ): Promise<Token[]> => {
    const commonTokens: { [key: string]: Token[] } = {
      "0x1": [
        {
          address: "0xA0b86a33E6441b8C4505E2E0c41ad4b88c0E8Ac0",
          symbol: "USDT",
          decimals: 6,
          balance: "0",
          name: "Tether USD",
        },
        {
          address: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
          symbol: "USDC",
          decimals: 6,
          balance: "0",
          name: "USD Coin",
        },
      ],
      "0x38": [
        {
          address: "0x55d398326f99059fF775485246999027B3197955",
          symbol: "USDT",
          decimals: 18,
          balance: "0",
          name: "Tether USD",
        },
        {
          address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          symbol: "USDC",
          decimals: 18,
          balance: "0",
          name: "USD Coin",
        },
      ],
    };

    return commonTokens[network.chainId] || [];
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAddress = accounts[0];

      await switchNetwork(selectedNetwork);

      const walletAddress = await connectMetaMask();

      const nonce = `Login at ${new Date().toISOString()}`;
      const signature = await signMessage(walletAddress, nonce);

      // Step 3: send to API
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: walletAddress,
          message: nonce,
          signature,
        }),
      });

      const json = await res.json();

      console.log({ json });

      // const tokens = await getTokenBalances(userAddress, selectedNetwork);

      // let transactions: Transaction[] = [];
      // if (selectedNetwork.apiUrl && selectedNetwork.apiKey) {
      //   try {
      //     const url = `${selectedNetwork.apiUrl}?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${selectedNetwork.apiKey}`;
      //     const res = await axios.get(url);
      //     transactions = res.data.result?.slice(0, 10) || [];
      //   } catch (apiError) {
      //     console.warn("Could not fetch transactions:", apiError);
      //   }
      // }

      // const newWalletData: WalletData = {
      //   account: userAddress,
      //   balance: balanceInEth,
      //   transactions,
      //   tokens,
      //   currentNetwork: selectedNetwork,
      // };

      // setWalletData(newWalletData);
      // localStorage.setItem("walletSession", JSON.stringify(newWalletData));
      router.push("/");
    } catch (error) {
      console.error("Connection error:", error);
      setError("Failed to connect to MetaMask");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async (network?: Network) => {
    if (!walletData) return;

    const currentNetwork = network || selectedNetwork;
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceInWei = await provider.getBalance(walletData.account);
      const balanceInEth = ethers.formatEther(balanceInWei);

      const tokens = await getTokenBalances(walletData.account, currentNetwork);

      let transactions: Transaction[] = [];
      if (currentNetwork.apiUrl && currentNetwork.apiKey) {
        try {
          const url = `${currentNetwork.apiUrl}?module=account&action=txlist&address=${walletData.account}&startblock=0&endblock=99999999&sort=desc&apikey=${currentNetwork.apiKey}`;
          const res = await axios.get(url);
          transactions = res.data.result?.slice(0, 10) || [];
        } catch (apiError) {
          console.warn("Could not fetch transactions:", apiError);
        }
      }

      const updatedWalletData: WalletData = {
        ...walletData,
        balance: balanceInEth,
        transactions,
        tokens,
        currentNetwork,
      };

      setWalletData(updatedWalletData);
      localStorage.setItem("walletSession", JSON.stringify(updatedWalletData));
    } catch (error) {
      console.error("Refresh error:", error);
      setError("Cannot update data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center max-w-md w-full shadow-2xl ">
        <Avatar.Root className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg">
          <Avatar.Fallback
            className="w-full h-full rounded-full flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: selectedNetwork.color }}
          >
            <Wallet size={48} />
          </Avatar.Fallback>
        </Avatar.Root>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 my-6">
          Connect Wallet
        </h1>

        <p className="text-gray-600 text-lg mb-8 font-medium">
          Choose your network and connect to start managing your crypto
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Network
          </label>
          <Select.Root
            value={selectedNetwork.chainId}
            onValueChange={(value) => {
              const network = NETWORKS.find((n) => n.chainId === value);
              if (network) setSelectedNetwork(network);
            }}
          >
            <Select.Trigger className="w-full bg-white/80 border border-gray-200 rounded-2xl px-4 py-3 flex items-center justify-between hover:bg-white/90 transition-colors">
              <Select.Value />
              <Select.Icon>
                <ChevronDown size={20} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                <Select.Viewport className="p-2">
                  {NETWORKS.map((network) => (
                    <Select.Item
                      key={network.chainId}
                      value={network.chainId}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer outline-none"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: network.color }}
                      />
                      <Select.ItemText className="font-medium">
                        {network.name}
                      </Select.ItemText>
                      <span
                        className="ml-auto px-2 py-1 rounded-md text-xs font-semibold text-white"
                        style={{ backgroundColor: network.color }}
                      >
                        {network.symbol}
                      </span>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <Button onClick={connectWallet} disabled={loading}>
          {loading ? (
            <Loader2 size={24} className="animate-spin" />
          ) : (
            <Wallet size={24} />
          )}
          {loading ? "Connecting..." : `Connect with ${selectedNetwork.name}`}
        </Button>
      </div>
    </div>
  );
}
