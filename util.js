const { MTProto } = require("telegram-mtproto");

const LAYER = 57;
const INIT_CONNECTION = 0x69796de9;

class TelegramSignUp {
  constructor(api_id, api_hash, dev_server) {
    this._apiId = api_id;
    this._apiHash = api_hash;

    // eslint-disable-next-line new-cap
    this._client = MTProto({
      server: {
        dev: dev_server,
      },
      api: {
        layer: LAYER,
        initConnection: INIT_CONNECTION,
        api_id,
      },
    });
  }

  async sendCode(phone_number) {
    const { phone_code_hash } = await this._client("auth.sendCode", {
      phone_number,
      current_number: false,
      api_id: this._apiId,
      api_hash: this._apiHash,
    });

    return phone_code_hash;
  }

  signUp(phone_number, phone_code_hash, phone_code, first_name, last_name) {
    const params = {
      phone_number,
      phone_code_hash,
      phone_code,
      first_name,
    };

    if (last_name) params.last_name = last_name;

    return this._client("auth.signUp", params);
  }

  getStorage() {
    return this._client.storage.store;
  }
}

module.exports = TelegramSignUp;
