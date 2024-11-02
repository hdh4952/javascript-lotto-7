import Input from "./Input.js";

class App {
  async run() {
    const purchaseAmount = await Input.readPurchaseAmount();
    const winningNumbers = await Input.readWinningNumbers();
    const bonusNumber = await Input.readBonusNumber(winningNumbers);
  }
}

export default App;
