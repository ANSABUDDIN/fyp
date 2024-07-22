import { Avatar, Empty, InputNumber } from "antd";
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const OrderTabel: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([
    { id: 1, name: "Product 1", price: 10, quantity: 1 },
    { id: 2, name: "Product 2", price: 20, quantity: 1 },
    { id: 3, name: "Product 3", price: 30, quantity: 1 },
    { id: 4, name: "Product 4", price: 90, quantity: 1 },
    { id: 5, name: "Product 5", price: 98, quantity: 1 },
    { id: 6, name: "Product 6", price: 56, quantity: 1 },
  ]);

  // Function to handle quantity change
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(newCart);
  };

  // Function to calculate total price
  const getTotalPrice = (): string => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const handleDeleteProduct = (productId: number) => {
    // Play beep sound
    const beepSound = new Audio("/sound.mp3"); // Provide the path to your beep sound file
    beepSound.play();

    // Filter out the product to be deleted
    const newCart = cart.filter((item) => item.id !== productId);

    // Update the cart state
    setCart(newCart);
  };
  return (
    <div className="flex flex-col justify-between">
      <div className="flex justify-between my-3">
        <h1 className="text-lg font-semibold">Order Detail</h1>
        {/* <h1 className="text-sm font-semibold">Orders #34562</h1> */}
      </div>
      <div className="p-1 border-b-2 border-t-2  grid items-center grid-cols-5  ">
        <div className="col-span-2 items-center font-semibold text-sm">
          Product
        </div>
        <div className="text-center font-semibold text-sm pe-4">Qty</div>
        <div className="text-center text-sm font-semibold pe-4">Price</div>
        <div className="text-center text-sm font-semibold pe-4">Action</div>
      </div>
      <ScrollArea className="h-[40vh] py-2 pe-4">
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div className="py-4 border-b-2  grid items-center grid-cols-5  ">
                <div className="flex gap-2 col-span-2 items-center">
                  <Avatar
                    shape="square"
                    src="https://shopnsave.pk/cdn/shop/products/16615017232617db168d42c382bdddf0e2008b91cf.jpg?v=1692172075"
                    size={40}
                  />
                  <div>
                    <h6 className="text-sm font-semibold ">{item.name}</h6>
                    <h6 className="text-xs font-normal ">${item.price}</h6>
                  </div>
                </div>
                <div className="text-center">
                  <InputNumber
                    size="small"
                    type="number"
                    className="w-16 p-1 border"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e != null ? +e : 0)
                    }
                  />
                </div>
                <div className="text-center text-sm font-semibold">
                  $
                  {item.quantity <= 0
                    ? item.price * 1
                    : item.price * item.quantity}
                </div>
                <div
                  onClick={() => handleDeleteProduct(item.id)}
                  className="text-center flex justify-center cursor-pointer text-destructive text-sm font-semibold"
                >
                  <Trash2 />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="h-full flex justify-center items-center mt-10">
            <Empty description="Product Not Added" />
          </div>
        )}
      </ScrollArea>
      <div className=" flex gap-2 flex-col">
        <div className="flex justify-between items-center">
          <div className="text-end font-semibold text-sm pe-4">Discount :</div>
          <div className="text-end font-semibold text-sm pe-4">
            <InputNumber
              size="small"
              type="number"
              className="p-1 border"
              min={1}
              //   value={item.quantity}
              //   onChange={(e) => handleQuantityChange(item.id, parseInt(e))}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-end font-semibold text-sm pe-4">Total :</div>
          <div className="text-end font-normal text-sm pe-4">
            {getTotalPrice()} Rs
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-end font-semibold text-sm pe-4">
            Total Discount :
          </div>
          <div className="text-end font-normal text-sm pe-4">
            {getTotalPrice()} Rs
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-end font-semibold text-sm pe-4">
            Grand Total :
          </div>
          <div className="text-end font-normal text-sm pe-4">
            {getTotalPrice()} Rs
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full mt-3">
        <Button className="w-full">Receive Payment</Button>
        <Button className="w-full">Reset</Button>
      </div>
    </div>
  );
};

export default OrderTabel;
