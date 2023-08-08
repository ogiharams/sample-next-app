import { ChangeEvent, useContext, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import FoodDeliveryLayout from "../../components/organisms/FoodDeliveryLayout";
import RestaurantList from "../../components/templates/RestaurantList";
// import AppContext from "../../context/foodDelivery/AppContext";

const Index = () => {
  const [query, setQuery] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    setQuery(value);
    console.log(value);
  };
  // const { userState, setUserState } = useContext(AppContext) ?? {
  //   userState: { username: "", email: "", password: "" },
  //   setUserState: () => null,
  // };

  return (
    // <AppContext.Provider value={{ userState, setUserState }}>
    <div>
      <FoodDeliveryLayout>
        <div className="container-fluid">
          <Row>
            <Col>
              <div className="search">
                <InputGroup>
                  <InputGroupText>探す</InputGroupText>
                  <Input
                    placeholder="レストラン名を検索してください"
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </div>
              <RestaurantList search={query} />
            </Col>
          </Row>
          <style jsx>
            {`
              .search {
                margin: 20px;
                width: 500px;
              }
            `}
          </style>
        </div>
      </FoodDeliveryLayout>
    </div>
    // </AppContext.Provider>
  );
};

export default Index;
