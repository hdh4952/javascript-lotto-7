import Input from "./Input.js";
import LotteryMachine from "./LotteryMachine.js";

class App {
  async run() {
    const purchaseAmount = await Input.readPurchaseAmount();
    const lotteryMachine = new LotteryMachine();
    lotteryMachine.buyLottos(purchaseAmount);
    lotteryMachine.checkLottos();
    const winningNumbers = await Input.readWinningNumbers();
    const bonusNumber = await Input.readBonusNumber(winningNumbers);
    lotteryMachine.checkEarningsRate(winningNumbers, bonusNumber);
  }
}

export default App;
