import {
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";
import Router from "next/router";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Checkout() {
  const [order, setOder] = useState(function () {
    let order;
    try {
        order = JSON.parse(localStorage.getItem("order")) || "";
    } catch (error) {
        order = "";
    }
    return order;
});
  console.log(order)
  return (
    <div className={styles.container}>
      <PaymentForm
        applicationId="sandbox-sq0idb-sRNqzQHou2IvQHiuOfyd0Q"
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          const response = await fetch("/api/pay", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              sourceId: token.token,
              orderId: order.id,
              totalMoney: order.totalMoney.amount

            }),
          });
          console.log(await response.json());
          localStorage.clear();
          Router.push("/");
        }}
        locationId="L8PQE1FX87X0V"
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
}
