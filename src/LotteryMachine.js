import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { FIFTH_PRIZE_MONEY, FIRST_PRIZE_MONEY, FOURTH_PRIZE_MONEY, LOTTO_PRICE, LOTTO_STATISTICS_MESSAGE, SECOND_PRIZE_MONEY, THIRD_PRIZE_MONEY } from "./constant/constant.js";

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

  checkEarningsRate(winningNumbers, bonusNumber) {
    const winningRanks = this.#lottos.map(lotto => lotto.getWinningRank(winningNumbers, bonusNumber));
    const rankCounts =  winningRanks.reduce((rankCounts, rank) => {
      if (1 <= rank && rank <= 5) {
        rankCounts[rank] += 1;
      }
      return rankCounts;
    }, Array(6).fill(0));
    const earnedMoney = rankCounts.map((count, rank) => this.#getPrizeMoney(rank) * count).reduce((acc, cur) => acc + cur, 0);
    console.log(earnedMoney);
    const earningRate = ((earnedMoney / (this.#purchaseCount * LOTTO_PRICE)) * 100).toFixed(2);

    const printMessage = LOTTO_STATISTICS_MESSAGE +
    `3개 일치 (5,000원) - ${rankCounts[5]}개\n` +
    `4개 일치 (50,000원) - ${rankCounts[4]}개\n` +
    `5개 일치 (1,500,000원) - ${rankCounts[3]}개\n` +
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankCounts[2]}개\n` +
    `6개 일치 (2,000,000,000원) - ${rankCounts[1]}개\n` +
    `총 수익률은 ${earningRate}%입니다.`;
    MissionUtils.Console.print(printMessage);
  }

  #getPrizeMoney(rank) {
    if (rank === 1) {
      return FIRST_PRIZE_MONEY;
    }
    if (rank === 2) {
      return SECOND_PRIZE_MONEY;
    }
    if (rank === 3) {
      return THIRD_PRIZE_MONEY;
    }
    if (rank === 4) {
      return FOURTH_PRIZE_MONEY;
    }
    if (rank === 5) {
      return FIFTH_PRIZE_MONEY;
    }

    return 0;
  }
}

export default LotteryMachine;