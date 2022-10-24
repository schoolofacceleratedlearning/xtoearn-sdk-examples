import { Wallet } from "./near-wallet";
import giveReward from "./near-interface";
const wallet = new Wallet(process.env.NODE_ENV);

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

const hideLoadingAndShowAlert = ({
  className,
  message,
  loadingElement,
  alertElement,
  alertTextElement,
}) => {
  if (loadingElement && alertElement) {
    loadingElement.style.display = "none";
    alertElement.style.display = "flex";
  }
  if (alertElement && alertTextElement) {
    alertElement.classList.add(className);
    alertTextElement.innerText = message;
  }
};

document.querySelector("#submit").onclick = async () => {
  const loadingElement = document.querySelector("#loading");
  const alertElement = document.querySelector("#alert");
  const alertTextElement = document.querySelector("#alert-content");
  const programName = document.querySelector("#program-name").value.trim();
  const rewardName = document.querySelector("#reward-name").value.trim();
  try {
    if (!programName || !rewardName) {
      alertTextElement.innerText = `Please provide ${
        !programName ? "program name" : "reward name"
      }`;
      alertElement.classList.add("alert-danger");
      alertElement.style.display = "flex";
      return;
    }
    loadingElement.style.display = "block";
    const transaction = await giveReward(
      wallet.accountId,
      programName,
      rewardName
    );
    hideLoadingAndShowAlert({ loadingElement, alertElement });
    if ("SuccessValue" in transaction?.status) {
      hideLoadingAndShowAlert({
        className: "alert-success",
        message: "Reward paid out successfully!",
        alertTextElement,
        alertElement,
      });
      return;
    }
    hideLoadingAndShowAlert({
      className: "alert-danger",
      message: "Failed to pay reward!",
      alertTextElement,
      alertElement,
    });
  } catch (err) {
    hideLoadingAndShowAlert({
      loadingElement,
      alertElement,
      className: "alert-danger",
      message: err.message,
      alertTextElement,
    });
  }
};

document.querySelector("#alert-close").onclick = () => {
  document.querySelector("#alert").style.display = "none";
};
