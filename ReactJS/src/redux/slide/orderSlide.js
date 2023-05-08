import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  orderItemsSlected: [],
  itemsPrice: 0,
  totalPrice: 0,
  userId: "",
  userEmail: "",
  isPaid: false,
  paidAt: "",
  isSucessOrder: false,
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.course === orderItem.course
      );
      if (itemOrder) {
        alert("đã có trong giỏ hàng");
      } else {
        state.orderItems.push(orderItem);
      }
    },
    resetOrder: (state) => {
      state.isSucessOrder = false;
    },
    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSlected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === idProduct
      );
      const itemOrderSelected = state?.orderItemsSlected?.find(
        (item) => item?.product === idProduct
      );
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const { id } = action.payload;

      const itemOrder = state?.orderItems?.filter(
        (item) => item?.course !== id
      );
      const itemOrderSeleted = state?.orderItemsSlected?.filter(
        (item) => item?.course !== id
      );

      state.orderItems = itemOrder;
      state.orderItemsSlected = itemOrderSeleted;
    },
    removeAllOrderProduct: (state, action) => {
      const itemOrders = [];
      state.orderItems = itemOrders;
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order);
        }
      });
      state.orderItemsSlected = orderSelected;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder,
} = orderSlide.actions;

export default orderSlide.reducer;
