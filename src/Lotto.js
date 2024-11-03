import { MissionUtils } from "@woowacourse/mission-utils";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현
  print() {
    MissionUtils.Console.print(this.#numbers);
  }

  getWinningRank(winningNumbers, bonusNumber) {
    const correctCount = this.#numbers.filter(number => winningNumbers.includes(number)).length;
    
    if (correctCount === 6) {
      return 1;
    }
    if (correctCount === 5 && winningNumbers.some(number => number === bonusNumber)) {
      return 2;
    }
    if (correctCount === 5) {
      return 3;
    }
    if (correctCount === 4) {
      return 4;
    }
    if (correctCount === 3) {
      return 5;
    }

    return -1;
  }
}

export default Lotto;
