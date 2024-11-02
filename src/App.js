import Input from "./Input.js";

class App {
  async run() {
    const purchaseAmount = await Input.readPurchaseAmount();
  }
}

export default App;
