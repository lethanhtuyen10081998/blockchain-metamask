import { ethers } from "ethers";

export async function connectMetaMask() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const address = accounts[0];
  return address;
}

export async function signMessage(address: string, message: string) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(address);
  const signature = await signer.signMessage(message);
  return signature;
}
