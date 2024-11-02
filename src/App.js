import Input from "./Input";

class App {
  async run() {
    const purchaseAmount = await Input.readPurchaseAmount();
  }
}

export default App;
