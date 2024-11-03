import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { LOTTO_PRICE } from "./constant/constant.js";

class LotteryMachine {
  #purchaseCount;
  #lottos;

  constructor() {
    this.#purchaseCount = 0;
    this.#lottos = [];
  }

  buyLottos(money) {
    const count = money / LOTTO_PRICE;
    this.#purchaseCount += count

    for (let i=0 ; i<count ; i++) {
      const randomNumbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      this.#lottos.push(new Lotto(randomNumbers));
    }
  }

  checkLottos() {
    MissionUtils.Console.print(`${this.#purchaseCount}개를 구매했습니다.`);
    this.#lottos.forEach(lotto => lotto.print());
  }
}

export default LotteryMachine;