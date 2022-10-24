import { providers } from "near-api-js";
import give_rewards from "xtoearn-near-sdk";

function getConnInfo() {
  const networkId = process.env.NEAR_ENV;
  return { url: `https://rpc.${networkId}.near.org` };
}

async function getTransactionDetails(transactionHashes) {
  const connInfo = getConnInfo();
  const provider = new providers.JsonRpcProvider(connInfo);
  const transaction = await provider.txStatus(transactionHashes, "unnused");
  return transaction;
}

export default async function giveReward(userAccountId) {
  const args = {
    reward_name: "commits",
    program_name: "pm",
    user_wallet: userAccountId,
    program_owner: process.env.ACCOUNT_ID,
    credentials_dir: process.env.CREDENTIALS_DIR,
  };
  const reward = await give_rewards(
    process.env.CONTRACT_ID,
    process.env.ACCOUNT_ID,
    process.env.METHOD_NAME,
    args,
    process.env.ATTACHED_DEPOSIT
  );
  return getTransactionDetails(reward.transaction.id);
}
