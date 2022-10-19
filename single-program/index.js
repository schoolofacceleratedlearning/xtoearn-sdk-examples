import give_rewards from "xtoearn-near-sdk";
import { Wallet } from "./near-wallet";
import dotenv from "dotenv";

dotenv.config();
const wallet = new Wallet(process.env.NEAR_ENV);

window.onload = async () => {
  const isSignedIn = await wallet.init();
  if (isSignedIn) {
    signedInFlow();
  } else {
    signedOutFlow();
  }
};

// Log in and log out users using NEAR Wallet
document.querySelector(".sign-in .btn").onclick = () => {
  wallet.signIn();
};
document.querySelector(".sign-out .btn").onclick = () => {
  wallet.signOut();
};

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector(".sign-in").style.display = "block";
}

// Displaying the signed in flow container and display counter
async function signedInFlow() {
  document.querySelector(".sign-out").style.display = "block";
}

document.querySelector("#like-video").onclick = async () => {
  const args = {
    reward_name: "video_likes",
    program_name: "pe",
    user_wallet: wallet.accountId,
    program_owner: process.env.ACCOUNT_ID,
  };

  const response = await give_rewards(
    process.env.CONTRACT_ID,
    process.env.ACCOUNT_ID,
    process.env.PRIVATE_KEY,
    process.env.METHOD_NAME,
    args,
    process.env.ATTACHED_DEPOSIT
  );
  console.log(response);
};
