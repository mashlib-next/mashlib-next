import { RDF, SCHEMA, QU } from "@mashlib-next/utils";
import { renderTransaction } from "./render.js";
const TRANSACTION_TYPES = [
  QU("Transaction").value,
  QU("BankAccount").value,
  QU("PaymentCard").value,
  SCHEMA("Invoice").value,
  SCHEMA("MoneyTransfer").value,
  SCHEMA("PayAction").value,
  SCHEMA("BankAccount").value
];
function isTransaction(subject, store) {
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  for (const t of TRANSACTION_TYPES) {
    if (types.includes(t)) return true;
  }
  if (store.any(subject, QU("transaction"), null, null)) return true;
  if (store.any(subject, SCHEMA("totalPaymentDue"), null, null)) return true;
  if (store.any(subject, QU("amount"), null, null)) return true;
  return false;
}
const transactionPane = {
  label: "Transactions",
  icon: "\u{1F4B3}",
  canHandle(subject, store) {
    return isTransaction(subject, store);
  },
  render(subject, store, container) {
    renderTransaction(subject, store, container);
  }
};
export {
  transactionPane
};
