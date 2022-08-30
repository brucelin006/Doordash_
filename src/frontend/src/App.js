import { Layout, Col, Row } from "antd";
import { useState } from "react";
import Cart from "./components/cart";
import FoodList from "./components/foodList";
import LoginForm from "./components/loginForm";
import SignupForm from "./components/signupForm";

const { Header, Content, Footer } = Layout;

function App() {
  const [authed, setAuthed] = useState(false);

  return (
    <>
      <Layout className="layout" style={{ height: "100vh" }}>
        <Header>
          <Row>
            <Col span={6}>
              <h2
                style={{
                  color: "white",
                  lineHeight: "inherit",
                  marginBottom: 0,
                }}
              >
                Doordash+
              </h2>
            </Col>
            <Col span={18}>
              <div style={{float: "right"}}>{authed ? <Cart /> : <SignupForm />}</div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            padding: "50px",
            maxHeight: "calc(100% - 64px)",
            overflowY: "auto",
          }}
        >
          {authed ? (
            <FoodList />
          ) : (
            <LoginForm onSuccess={() => setAuthed(true)} />
          )}
        </Content>
      </Layout>
      <Footer style={{textAlign: "center"}}>Doordash+ by Bruce Lin</Footer>
    </>
  );
}

export default App;
