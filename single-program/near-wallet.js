import "regenerator-runtime/runtime";
import { keyStores, connect, WalletConnection } from "near-api-js";
import { APP_KEY_PREFIX, getConfig } from "./config";

export class Wallet {
  wallet;
  network;
  constructor(network = "testnet") {
    this.network = network;
  }

  async init() {
    const nearConfig = getConfig(this.network);
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const nearConnection = await connect({ keyStore, ...nearConfig });
    this.wallet = new WalletConnection(nearConnection, APP_KEY_PREFIX);
    return this.wallet.isSignedIn();
  }

  signIn() {
    this.wallet.requestSignIn({});
  }

  signOut() {
    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }
}
