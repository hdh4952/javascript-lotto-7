import { MissionUtils } from "@woowacourse/mission-utils";
import { BONUS_NUMBER_INPUT_GUIDE, LOTTO_PRICE, PURCHASE_AMOUNT_INPUT_GUIDE, WINNING_NUMBERS_INPUT_GUIDE } from "./constant/constant.js";
import CustomError from "./CustomError.js";
import { BONUS_NUMBER_DUPLICATES_NOT_ALLOWED, BONUS_NUMBER_OUT_OF_RANGE, PURCHASE_AMOUNT_IS_AVAILABLE_NUMBER, PURCHASE_AMOUNT_IS_DIVISIBLE_BY_LOTTO_PRICE, WINNING_NUMBERS_DUPLICATES_NOT_ALLOWED, WINNING_NUMBERS_LENGTH_INVALID, WINNING_NUMBERS_OUT_OF_RANGE } from "./constant/error-message.js";

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

  static async readWinningNumbers() {
    const rawInput = await MissionUtils.Console.readLineAsync(WINNING_NUMBERS_INPUT_GUIDE);

    try {
      return new Input(rawInput).#parseWinningNumbers();
    } catch (e) {
      MissionUtils.Console.print(e.message);
      return await this.readWinningNumbers();
    }
  }

  #parseWinningNumbers() {
    const winningNumbers = this.#input.split(',').map(e => parseInt(e));
    if (winningNumbers.length !== 6) {
      throw new CustomError(WINNING_NUMBERS_LENGTH_INVALID);
    }

    if (!winningNumbers.every(number => (1 <= number && number <= 45))) {
      throw new CustomError(WINNING_NUMBERS_OUT_OF_RANGE);
    }

    if (!this.#hasUniqueElements(winningNumbers)) {
      throw new CustomError(WINNING_NUMBERS_DUPLICATES_NOT_ALLOWED);
    }

    return winningNumbers;
  }

  #hasUniqueElements(arr) {
    const set = new Set(arr);
    return arr.length === set.size;
  }

  static async readBonusNumber(winningNumbers) {
    const rawInput = await MissionUtils.Console.readLineAsync(BONUS_NUMBER_INPUT_GUIDE);

    try {
      return new Input(rawInput).#parseBonusNumber(winningNumbers);
    } catch (e) {
      MissionUtils.Console.print(e.message);
      return await this.readBonusNumber(winningNumbers);
    }
  }

  #parseBonusNumber(winningNumbers) {
    const bonusNumber = parseInt(this.#input);
    if (!(1 <= bonusNumber && bonusNumber <= 45)) {
      throw new CustomError(BONUS_NUMBER_OUT_OF_RANGE);
    }

    if (!this.#hasUniqueElements([...winningNumbers, bonusNumber])) {
      throw new CustomError(BONUS_NUMBER_DUPLICATES_NOT_ALLOWED);
    }

    return bonusNumber;
  }
}

export default Input;