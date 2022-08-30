import { Button, Card, List, message, Select, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Text } = Typography;

const AddToCartButton = ({ itemId }) => {
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    setLoading(true);

    addItemToCart(itemId)
      .then(() => message.success("Successfully added to cart"))
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Tooltip title="Add to shopping cart">
      <Button
        loading={loading}
        type="primary"
        icon={<PlusOutlined />}
        onClick={addToCart}
      ></Button>
    </Tooltip>
  );
};

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  const [curRestaurant, setCurRestaurant] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRestaurant, setLoadingRestaurant] = useState(false);

  useEffect(() => {
    setLoadingRestaurant(true);

    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch((err) => message.error(err.message))
      .finally(() => setLoadingRestaurant(false));
  }, []);

  useEffect(() => {
    if (curRestaurant) {
      setLoading(true);

      getMenus(curRestaurant)
        .then((data) => setFoodData(data))
        .catch((err) => message.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [curRestaurant]);

  return (
    <>
      <Select
        value={curRestaurant}
        onSelect={(value) => setCurRestaurant(value)}
        placeholder="Select a restaurant"
        loading={loadingRestaurant}
        style={{ width: 300, marginRight: "auto"}}
        onChange={() => {}}
      >
        {restaurants.map((rest) => (
          <Option key={rest.id} value={rest.id}>{rest.name}</Option>
        ))}
      </Select>

      {curRestaurant && (
        <List
          style={{ marginTop: 20 }}
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 3,
            xxl: 3,
          }}
          dataSource={foodData}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                extra={<AddToCartButton itemId={item.id} />}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ height: 220, width: "100%", display: "block" }}
                />
                <Text style={{float: "right"}} strong>{`$${item.price}`}</Text>
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
};

export default FoodList;
