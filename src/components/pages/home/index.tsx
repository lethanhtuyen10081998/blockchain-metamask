"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import * as Select from "@radix-ui/react-select";
import * as Tabs from "@radix-ui/react-tabs";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Wallet,
  History,
  LogOut,
  RefreshCw,
  Copy,
  ExternalLink,
  TrendingUp,
  Building2,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/provider/supabase-client";
import { useRouter } from "next/navigation";

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
    apiKey: process.env.NEXT_PUBLIC_WALLET_TOKEN,
    color: "#627EEA",
  },
  {
    chainId: "0x38",
    name: "BSC Mainnet",
    symbol: "BNB",
    rpcUrl: "https://bsc-dataseed1.binance.org/",
    blockExplorer: "https://bscscan.com",
    apiUrl: "https://api.bscscan.com/api",
    apiKey: process.env.NEXT_PUBLIC_WALLET_TOKEN,
    color: "#F3BA2F",
  },
  {
    chainId: "0x89",
    name: "Polygon Mainnet",
    symbol: "MATIC",
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com",
    apiUrl: "https://api.polygonscan.com/api",
    apiKey: process.env.NEXT_PUBLIC_WALLET_TOKEN,
    color: "#8247E5",
  },
  {
    chainId: "0xa86a",
    name: "Avalanche C-Chain",
    symbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorer: "https://snowtrace.io",
    apiUrl: "https://api.snowtrace.io/api",
    apiKey: process.env.NEXT_PUBLIC_WALLET_TOKEN,
    color: "#E84142",
  },
];

export default function App() {
  const router = useRouter();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(NETWORKS[0]);
  const [tabValue, setTabValue] = useState("transactions");

  // Check for existing session on component mount
  useEffect(() => {
    const savedWalletData = localStorage.getItem("walletSession");
    if (savedWalletData) {
      try {
        const parsedData = JSON.parse(savedWalletData);
        setWalletData(parsedData);
        setSelectedNetwork(parsedData.currentNetwork || NETWORKS[0]);
        setIsConnected(true);
      } catch (err) {
        console.error("Error parsing saved wallet data:", err);
        localStorage.removeItem("walletSession");
      }
    }
  }, []);

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

  const disconnect = () => {
    setWalletData(null);
    setIsConnected(false);
    supabaseBrowser.auth.signOut();
    router.push("/sign-in");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(Number.parseInt(timestamp) * 1000).toLocaleString("en-US");
  };

  return (
    <Tooltip.Provider>
      <div className="min-h-screen">
        {/* Header */}
        <div
          className="rounded-b-3xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${walletData?.currentNetwork.color}dd, ${walletData?.currentNetwork.color})`,
          }}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Wallet size={32} />
                <h1 className="text-2xl font-bold">My Wallet</h1>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm opacity-90">
                  {walletData?.currentNetwork.name}
                </span>

                <Select.Root
                  value={selectedNetwork.chainId}
                  onValueChange={(value) => {
                    const network = NETWORKS.find((n) => n.chainId === value);
                    if (network) switchNetwork(network);
                  }}
                >
                  <Select.Trigger className="bg-white/10 border border-white/30 rounded-xl px-3 py-2 flex items-center gap-2 hover:bg-white/20 transition-colors">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: selectedNetwork.color }}
                    />
                    <Select.Value />

                    <Select.Icon>
                      <ChevronDown size={16} />
                    </Select.Icon>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                      <Select.Viewport className="p-2">
                        {NETWORKS.map((network) => (
                          <Select.Item
                            key={network.chainId}
                            value={network.chainId}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer outline-none"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: network.color }}
                            />
                            <Select.ItemText>{network.symbol}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => refreshData()}
                      disabled={loading}
                      className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw
                        size={20}
                        className={loading ? "animate-spin" : ""}
                      />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded-lg text-sm">
                      Refresh Data
                      <Tooltip.Arrow className="fill-gray-900" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={disconnect}
                      className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                    >
                      <LogOut size={20} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded-lg text-sm">
                      Disconnect
                      <Tooltip.Arrow className="fill-gray-900" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Main Balance Card */}
          <div
            className="rounded-3xl border p-6 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${walletData?.currentNetwork.color}15, ${walletData?.currentNetwork.color}05)`,
              borderColor: `${walletData?.currentNetwork.color}20`,
            }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-600 font-medium mb-2">Total Balance</p>
                <h2
                  className="text-5xl font-bold mb-3"
                  style={{ color: walletData?.currentNetwork.color }}
                >
                  {Number.parseFloat(walletData?.balance || "0").toFixed(4)}
                </h2>
                <span
                  className="px-3 py-1 rounded-full text-white font-semibold"
                  style={{ backgroundColor: walletData?.currentNetwork.color }}
                >
                  {walletData?.currentNetwork.symbol}
                </span>
              </div>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${walletData?.currentNetwork.color}20`,
                }}
              >
                <TrendingUp
                  size={40}
                  style={{ color: walletData?.currentNetwork.color }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-600">Wallet Address:</span>
              <span className="font-semibold">
                {formatAddress(walletData?.account || "")}
              </span>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => copyToClipboard(walletData?.account || "")}
                    className="p-1 rounded-lg hover:bg-white/50 transition-colors"
                    style={{
                      backgroundColor: `${walletData?.currentNetwork.color}15`,
                      color: walletData?.currentNetwork.color,
                    }}
                  >
                    <Copy size={16} />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded-lg text-sm">
                    Copy Address
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Building2
                  style={{ color: walletData?.currentNetwork.color }}
                />
                <h3 className="text-xl font-semibold">Network Info</h3>
              </div>
              <h4 className="text-2xl font-bold mb-2">
                {walletData?.currentNetwork.name}
              </h4>
              <p className="text-gray-600">
                Connected to {walletData?.currentNetwork.symbol} network
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <History style={{ color: walletData?.currentNetwork.color }} />
                <h3 className="text-xl font-semibold">Activity</h3>
              </div>
              <h4 className="text-2xl font-bold mb-2">
                {walletData?.transactions.length || 0}
              </h4>
              <p className="text-gray-600">Recent transactions</p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Tabs.Root value={tabValue} onValueChange={setTabValue}>
              <Tabs.List className="flex border-b border-gray-200 px-6 pt-4">
                <Tabs.Trigger
                  value="transactions"
                  className="px-4 py-2 font-semibold text-gray-600 border-b-2 border-transparent hover:text-gray-900 data-[state=active]:border-current transition-colors"
                  style={{
                    color:
                      tabValue === "transactions"
                        ? walletData?.currentNetwork.color
                        : undefined,
                    borderColor:
                      tabValue === "transactions"
                        ? walletData?.currentNetwork.color
                        : undefined,
                  }}
                >
                  Transaction History
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="tokens"
                  className="px-4 py-2 font-semibold text-gray-600 border-b-2 border-transparent hover:text-gray-900 data-[state=active]:border-current transition-colors"
                  style={{
                    color:
                      tabValue === "tokens"
                        ? walletData?.currentNetwork.color
                        : undefined,
                    borderColor:
                      tabValue === "tokens"
                        ? walletData?.currentNetwork.color
                        : undefined,
                  }}
                >
                  Token Balance
                </Tabs.Trigger>
              </Tabs.List>

              <div className="p-6">
                <Tabs.Content value="transactions">
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <Loader2
                        size={32}
                        className="animate-spin"
                        style={{ color: walletData?.currentNetwork.color }}
                      />
                    </div>
                  ) : walletData?.transactions.length === 0 ? (
                    <div className="text-center py-12">
                      <History
                        size={64}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No transactions found
                      </h3>
                      <p className="text-gray-500">
                        Your transaction history will appear here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {walletData?.transactions.map((tx) => (
                        <div
                          key={tx.hash}
                          className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
                          style={{
                            backgroundColor: `${walletData?.currentNetwork.color}08`,
                            borderColor: `${walletData?.currentNetwork.color}30`,
                          }}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-600">
                              {formatTimestamp(tx.timeStamp)}
                            </span>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button
                                  onClick={() =>
                                    window.open(
                                      `${walletData?.currentNetwork.blockExplorer}/tx/${tx.hash}`,
                                      "_blank"
                                    )
                                  }
                                  className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                                  style={{
                                    backgroundColor: `${walletData?.currentNetwork.color}15`,
                                    color: walletData?.currentNetwork.color,
                                  }}
                                >
                                  <ExternalLink size={16} />
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded-lg text-sm">
                                  View on Explorer
                                  <Tooltip.Arrow className="fill-gray-900" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                To: {formatAddress(tx.to)}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatAddress(tx.hash)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p
                                className="text-xl font-bold"
                                style={{
                                  color: walletData?.currentNetwork.color,
                                }}
                              >
                                {Number.parseFloat(
                                  ethers.formatEther(tx.value)
                                ).toFixed(6)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {walletData?.currentNetwork.symbol}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Tabs.Content>

                <Tabs.Content value="tokens">
                  {walletData?.tokens && walletData.tokens.length > 0 ? (
                    <div className="space-y-4">
                      {walletData.tokens.map((token) => (
                        <div
                          key={token.address}
                          className="bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-lg font-semibold mb-1">
                                {token.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {formatAddress(token.address)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p
                                className="text-xl font-bold"
                                style={{
                                  color: walletData?.currentNetwork.color,
                                }}
                              >
                                {token.balance}
                              </p>
                              <p className="text-sm text-gray-600">
                                {token.symbol}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Building2
                        size={64}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No tokens found
                      </h3>
                      <p className="text-gray-500">
                        Your token balances will appear here
                      </p>
                    </div>
                  )}
                </Tabs.Content>
              </div>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
}
