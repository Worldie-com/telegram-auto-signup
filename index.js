require("dotenv").config();

const TelegramSignUp = require("./util");
const axios = require("axios");

const fivesimApi = axios.create({
  baseURL: "https://5sim.net/v1",
  headers: {
    Authorization: process.env.FIVESIM_API_TOKEN,
  },
});

const telegram = new TelegramSignUp(
  process.env.TELEGRAM_API_KEY,
  process.env.TELEGRAM_API_HASH,
  true
);

const createUser = async () => {
  try {
    const {
      data: { id, phone },
    } = await fivesimApi.get("/user/buy/activation/cambodia/any/telegram");

    const firstName = "Seungmin";
    const lastName = "Lee";

    const phoneCodeHash = await telegram.sendCode(phone);
    console.log("Phone Code Hash: " + phoneCodeHash);

    const intervalRequest = await setInterval(async () => {
      const { data } = await fivesimApi.get(`/user/check/${id}`);
      if (!(data.sms === [])) {
        const signUp = await telegram.signUp(
          phone,
          phoneCodeHash,
          sms[0].code,
          firstName,
          lastName
        );
        console.log(signUp.user);
      }
    }, 5000);

    await fivesimApi.get(`/user/cancel/${id}`);

    clearInterval(intervalRequest);

    console.log(telegram.getStorage());
  } catch (err) {
    console.log(err);
  }
};

for (var i = 0; i < 6; ) {
  createUser();
  i++;
}
