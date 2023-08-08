import Link from "next/link";
import {
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Row,
  Button,
} from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import FoodDeliveryLayout from "../../components/organisms/FoodDeliveryLayout";
import Cart from "../../components/organisms/Cart";
import { useContext } from "react";
import AppContext from "../../context/foodDelivery/AppContext";

const GET_RESTAURANT_DISHS = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
        quantity
      }
    }
  }
`;
type Props = {
  search: string;
};

const Restaurants = (props: Props) => {
  const addContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHS, {
    variables: { id: router.query.id },
  });

  if (error) return "レストランの読み込みに失敗しました";
  if (loading) return <h2>ロード中・・・</h2>;
  // console.log(data);

  // if (data.restaurant && data.restaurant.length) {
  if (data.restaurant) {
    const { restaurant } = data;

    return (
      <>
        <FoodDeliveryLayout>
          <h1>{restaurant.name}</h1>
          <Row>
            {restaurant.dishes.map((res) => (
              <Col xs="6" sm="4" key={res.id} style={{ padding: 0 }}>
                <Card style={{ margin: "0 10" }}>
                  <CardImg
                    src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                    top={true}
                    style={{ height: 250 }}
                  />
                  <CardBody>
                    <CardTitle>{res.name}</CardTitle>
                    <CardTitle>{res.description}</CardTitle>
                  </CardBody>
                  <div className="card-footer">
                    <Button
                      outline
                      color="primary"
                      onClick={() => addContext.addItem(res)}
                    >
                      + カートに入れる
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}

            <style jsx>
              {`
              a {
                color: white;
              }
              a: link {
                text-decoration: none
                color: white
              };
  
              a:hover {
                color: white
              }
              .card-colums {
                column-count: 3
              }
            `}
            </style>
            <Col xs="3" style={{ padding: 0 }}>
              <div>
                <Cart />
              </div>
            </Col>
          </Row>
        </FoodDeliveryLayout>
      </>
    );
  } else {
    return <h1>レストランがありませんでした</h1>;
  }
};

export default Restaurants;
