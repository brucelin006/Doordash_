import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";

const { Text } = Typography;

const Cart = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!cartVisible) return;

    setLoading(true);
    getCart()
      .then((data) => setCartData(data))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  }, [cartVisible]);

  const onCheckout = () => {
    setChecking(true);

    checkout()
      .then(() => {
        message.success("Successful checkout");
        setChecking(false);
      })
      .catch((err) => message.error(err.message))
      .finally(() => setChecking(false));
  };

  const onOpenCart = () => setCartVisible(true);

  const onCloseCart = () => setCartVisible(false);

  return (
    <>
      <Button type="primary" shape="round" onClick={onOpenCart}>
        Cart
      </Button>
      <Drawer
        title="My Shopping Cart"
        onClose={onCloseCart}
        visible={cartVisible}
        width={520}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text strong>{`Total: $${cartData?.totalPrice}`}</Text>
            <div>
              <Button onClick={onCloseCart} style={{ marginRight: 8 }} danger>
                cancel
              </Button>
              <Button
                onClick={onCheckout}
                type="primary"
                loading={checking}
                disabled={loading || cartData?.orderItemList.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={cartData?.orderItemList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.menuItem.name}
                description={`$${item.price}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default Cart;
