import { Wallet } from "./near-wallet";
import giveReward from "./near-interface";
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
  console.log("Start Loading...");
  const transaction = await giveReward(wallet.accountId);
  console.log("End Loading...");
  if ("SuccessValue" in transaction?.status) {
    // show alert
    console.log("Reward paid out successfully");
    return;
  }
  console.log("Reward paid out failed");
};
