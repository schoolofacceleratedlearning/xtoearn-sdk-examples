import "regenerator-runtime/runtime";
import { keyStores, connect, WalletConnection } from "near-api-js";
import { APP_KEY_PREFIX, getConfig } from "./config";

export async function init() {
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const nearConnection = await connect({ keyStore, ...nearConfig });
  const walletConnection = new WalletConnection(nearConnection, APP_KEY_PREFIX);
  return walletConnection;
}
