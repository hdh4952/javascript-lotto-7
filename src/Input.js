import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO_PRICE } from "./constant/constant";
import CustomError from "./CustomError";
import { PURCHASE_AMOUNT_IS_AVAILABLE_NUMBER, PURCHASE_AMOUNT_IS_DIVISIBLE_BY_LOTTO_PRICE } from "./constant/error-message";

class Input {
  #input;

  constructor(input) {
    this.#input = input;
  }

  static async readPurchaseAmount() {
    const rawInput = await MissionUtils.Console.readLineAsync();
    return new Input(rawInput).#parsePurchaseAmount();
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