const userInputEl = document.querySelector("#placement");
const sizeOptionsEl = document.querySelector(".size");
const BGColor = document.querySelector("#color1");
const FGColor = document.querySelector("#color2");
const containerEl = document.querySelector(".container");
const submitBtnEl = document.querySelector("#generate");
const downloadBtnEl = document.querySelector("#download-btn");

let QR_Code;
let sizeChoise = 300;
let BGColorChoise = "#000000";
let FGColorChoise = "#ffffff";

function getSize() {
  sizeChoise = sizeOptionsEl.value;
}

function getColor(el) {
  BGColorChoise = el.value;
}
function getColor2(el) {
  FGColorChoise = el.value;
}

function disabledBtn() {
  if (userInputEl.value.trim().length < 1) {
    submitBtnEl.disabled = true;
    downloadBtnEl.href = "";
    downloadBtnEl.classList.add("hide");
  } else {
    submitBtnEl.disabled = false;
  }
}

const inputFormatter = (val) => {
  val = val.replace(/[^a-z0-9A-Z]+/g, "");
  return val;
};

const generateQRCode = async () => {
  containerEl.innerHTML = ``;
  QR_Code = await new QRCode(containerEl, {
    text: userInputEl.value,
    width: sizeChoise,
    height: sizeChoise,
    colorDark: FGColorChoise,
    colorLight: BGColorChoise,
  });

  const src = containerEl.firstChild.toDataURL("imag/png");
  downloadBtnEl.href = src;
  let userValue = userInputEl.value;
  try {
    userValue = new URL(userValue).hostname;
  } catch (_) {
    userValue = inputFormatter(userValue);
  }
  downloadBtnEl.download = `${userValue}QR`;
  downloadBtnEl.classList.remove("hide");
};

window.onload = () => {
  containerEl.innerHTML = "";
  sizeOptionsEl.value = sizeChoise;
  userInputEl.value = "";
  BGColor.value = BGColorChoise;
  FGColor.value = FGColorChoise;
  downloadBtnEl.classList.add("hide");
  submitBtnEl.disabled = true;
};

userInputEl.addEventListener("input", disabledBtn);
sizeOptionsEl.addEventListener("change", getSize);
BGColor.addEventListener("input", () => getColor(BGColor));
FGColor.addEventListener("input", () => getColor2(FGColor));
submitBtnEl.addEventListener("click", generateQRCode);
