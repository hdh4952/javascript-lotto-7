import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO_PRICE, PURCHASE_AMOUNT_INPUT_GUIDE } from "./constant/constant.js";
import CustomError from "./CustomError.js";
import { PURCHASE_AMOUNT_IS_AVAILABLE_NUMBER, PURCHASE_AMOUNT_IS_DIVISIBLE_BY_LOTTO_PRICE } from "./constant/error-message.js";

class Input {
  #input;

  constructor(input) {
    this.#input = input;
  }

  static async readPurchaseAmount() {
    const rawInput = await MissionUtils.Console.readLineAsync(PURCHASE_AMOUNT_INPUT_GUIDE);
    
    try {
      return new Input(rawInput).#parsePurchaseAmount();
    } catch (e) {
      MissionUtils.Console.print(e.message);
      return await this.readPurchaseAmount();
    }
  }

  #parsePurchaseAmount() {
    const purchaseAmount = parseInt(this.#input);
    if (Number.isNaN(purchaseAmount)) {
      throw new CustomError(PURCHASE_AMOUNT_IS_AVAILABLE_NUMBER);
    }

    if (purchaseAmount % LOTTO_PRICE !== 0) {
      throw new CustomError(PURCHASE_AMOUNT_IS_DIVISIBLE_BY_LOTTO_PRICE);
    } 

    return purchaseAmount;
  }
}

export default Input;