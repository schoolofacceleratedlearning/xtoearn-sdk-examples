import { CONTRACT_NAME } from "./config";
import { init } from "./near-wallet";
let wallet;
window.onload = async () => {
  wallet = await init();
  if (wallet.isSignedIn()) {
    signedInFlow();
  } else {
    signedOutFlow();
  }
};

// Log in and log out users using NEAR Wallet
document.querySelector(".sign-in .btn").onclick = () => {
  wallet.requestSignIn(CONTRACT_NAME);
};
document.querySelector(".sign-out .btn").onclick = () => {
  wallet.signOut();
};

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector(".sign-in").style.display = "block";
  document
    .querySelectorAll(".interact")
    .forEach((button) => (button.disabled = true));
}

// Displaying the signed in flow container and display counter
async function signedInFlow() {
  document.querySelector(".sign-out").style.display = "block";
  document
    .querySelectorAll(".interact")
    .forEach((button) => (button.disabled = false));
}
