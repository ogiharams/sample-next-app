import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Col, Row } from "reactstrap";
import Cart from "../../components/organisms/Cart";
import CheckoutForm from "../../components/organisms/CheckoutForm";

const Checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51MpYOyAQo1VHFUfhsQhgTtfVqOVS7YTrFGQ98ivjqL90rUcvatGYcQHQlX1MvreJj65ln4GSJHFMK3Buw74Ew6xP00jzZDmTJY"
  );
  return (
    <>
      <Row>
        <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
          <h1 style={{ margin: 20, textAlign: "center", fontSize: 20 }}>
            チェックアウト
          </h1>
          <Cart />
        </Col>
        <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
