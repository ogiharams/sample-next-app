import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import client from "../libs/foodDelivery/apollo";
import { ApolloProvider } from "@apollo/client";
import AppContext from "../context/foodDelivery/AppContext";
import { useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
import store from "../stores/store";
import { Provider } from "react-redux";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const user = { username: null, email: null, password: null };
  const [userState, setUserState] = useState({
    username: null,
    email: null,
    password: null,
  });

  // items:商品、total:合計の値段
  const [cartState, setCartState] = useState({
    items: ["aaa"],
    total: 0,
  });

  useEffect(() => {
    const token = Cookie.get("token");
    const cart = Cookie.get("cart");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (cart) {
      console.log("cart", cart);
      const cartObj = JSON.parse(cart);
      const items = Object.values(cartObj.items);
      console.log(items);
      if (cart !== "undefined" && typeof cart === "string") {
        console.log("cookie情報でcartStateを更新");
        items.forEach((item) => {
          setUserState({
            items: items,
            total: item.price * item.quantity,
          });
        });
      }
      console.log("cartState", cartState);
    }

    const API_URL = apiUrl || "http://localhost:1337";
    // console.log(token);
    // エラー出るので一時的にコメントアウト20230604
    // fetch(`${API_URL}/users/me`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }).then(async (res) => {
    //   if (!res.ok) {
    //     Cookie.remove("token");
    //     setUserState((prevState) => ({ ...prevState, username: null }));
    //     // console.log(userState);
    //     return null;
    //   }
    //   const user = await res.json();
    //   setUserState(user);
    // });
  }, []);

  // カートへ商品を追加
  const addItem = (item) => {
    let { items } = cartState;
    console.log("追加されるitem", item);
    const newItem = items?.find((i) => i.id === item.id);
    console.log(newItem);
    // // if (!newItem || newItem === undefined) {
    if (!newItem) {
      console.log("最初に商品を追加する場合");
      const firstItem = { ...item, quantity: 1 };
      console.log("最初なのでitemをquantity: 1にした", firstItem);
      // cartに追加
      setCartState({
        items: [...cartState.items, firstItem],
        total: cartState.total + item.price,
      });
      console.log("カートに最初に商品が追加された状態", cartState);

      Cookie.set("cart", cartState, { expires: 7 });
    } else {
      // すでに同じ商品がカートに入っているとき
      console.log("既に商品が入っている場合");
      console.log("追加されるitemId", item.id);
      console.log("カートに入っているitemId", newItem.id);
      setCartState({
        items: items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item
        ),
        total: cartState.total + item.price,
      });
      console.log("複数商品がある場合", cartState);
    }
    Cookie.set("cart", cartState, { expires: 7 });
  };

  // カートから商品を削除
  const removeItem = (item) => {
    let { items } = cartState;
    console.log("削除されるitem", item);
    const newItem = items?.find((i) => i.id === item.id);
    console.log(newItem);
    if (newItem.quantity > 1) {
      // cartにから削除
      setCartState({
        items: items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity - 1 })
            : item
        ),
        total: cartState.total - item.price,
      });

      Cookie.set("cart", cartState, { expires: 7 });
    } else {
      // カートに入っているその商品が一つの場合
      const items = [cartState.items];
      console.log("入っている商品", items);
      const index = items.findIndex((i) => i.id === newItem.id);
      console.log("取り除かれる商品のIndex番号商品", items);
      items.splice(index, 1);

      setCartState({
        items: items,
        total: cartState.total - item.price,
      });
    }
    Cookie.set("cart", cartState, { expires: 7 });
  };

  return (
    <>
      <AppContext.Provider
        value={{
          userState,
          setUserState,
          cartState,
          setCartState,
          addItem,
          removeItem,
        }}
      >
        <Provider store={store}>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
            />
          </Head>

          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </AppContext.Provider>
    </>
  );
};

export default MyApp;
