import { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import FoodDeliveryLayout from "../../components/organisms/FoodDeliveryLayout";
import AppContext from "../../context/foodDelivery/AppContext";
import { login, registerUser } from "../../libs/foodDelivery/auth";

const Login = () => {
  const appContext = useContext(AppContext);

  const [data, setData] = useState({ identifier: "", password: "" });
  // console.log(data.identifier, data.password);

  const handleLogin = async () => {
    login(data.identifier, data.password)
      .then((res) => {
        appContext.setUserState(res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FoodDeliveryLayout>
        <Container>
          <Row>
            <Col>
              <div className="paper">
                <div className="header">
                  <h2>ログイン</h2>
                </div>
              </div>
              <section className="wrapper">
                <Form>
                  <fieldset>
                    <FormGroup>
                      <Label>メールアドレス：</Label>
                      <Input
                        type="email"
                        name="identifier"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>パスワード</Label>
                      <Input
                        type="password"
                        name="password"
                        style={{ height: 50, fontSize: "1.2rem" }}
                        onChange={(e) => handleChange(e)}
                      />
                    </FormGroup>
                    <span>
                      <a href="">
                        <small>パスワードをお忘れですか？</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120, marginTop: 20 }}
                      color="primary"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      ログイン
                    </Button>
                  </fieldset>
                </Form>
              </section>
            </Col>
          </Row>
          <style jsx>
            {`
            .paper {
              text-align: center;
              margin-top: 50px
            }
            .header {
              width: 100%
              margin-bottom: 30px
            }
            .wrapper {
              padding: 10px 30px 20px 30px
            }
          `}
          </style>
        </Container>
      </FoodDeliveryLayout>
    </>
  );
};

export default Login;
