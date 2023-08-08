import Link from "next/link";
import { Col, Card, CardBody, CardImg, CardTitle, Row } from "reactstrap";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const query = gql`
  {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;
type Props = {
  search: string;
};

const RestaurantList = (props: Props): JSX.Element => {
  const { loading, error, data } = useQuery(query);
  if (error) return <h2>レストランの読み込みに失敗しました</h2>;
  if (loading) return <h2>ロード中・・・</h2>;
  // console.log(data.restaurants);
  if (data.restaurants && data.restaurants.length) {
    const searchQuery = data.restaurants.filter(
      (restautant: { name: string }) =>
        restautant.name.toLowerCase().includes(props.search)
    );
    // console.log(searchQuery);
    return (
      <>
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image[0].url}`}
                  top={true}
                  style={{ height: 250 }}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardTitle>{res.description}</CardTitle>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/foodDelivery/Restaurants/${res.id}`}
                    href={`/foodDelivery/Restaurants?id=${res.id}`}
                  >
                    <a className="btn btn-primary">もっと見る</a>
                  </Link>
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
        </Row>
      </>
    );
  } else {
    return <h1>レストランがありませんでした</h1>;
  }
};

export default RestaurantList;
