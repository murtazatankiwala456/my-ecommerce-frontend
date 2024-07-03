import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useEffect, useState } from "react";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../common/Pagination";

function AdminOrder() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    console.log("Editing order ID:", order.id);
    setEditableOrderId(order.id);
  };

  const handleShow = () => {
    console.log("show");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1); // Optionally reset the editable order ID after update
  };
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 ms-4 text-purple-600 ";
      case "dispatched":
        return "bg-yellow-200 ms-4 text-yellow-600 ";
      case "delivered":
        return "bg-green-200 ms-4 text-green-600 ";
      case "pending":
        return "bg-red-200 ms-4 text-red-600 ";
      case "cancelled":
        return "bg-red-200 ms-4 text-red-600 ";
      default:
        return "bg-purple-200 ms-4 text-purple-600 ";
    }
  };
  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  return (
    <div className="overflow-x-auto w-full">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden w-full">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6 w-full">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-xs md:text-sm leading-normal">
                  <th className="py-2 px-2 md:px-6 text-left">Order#</th>
                  <th className="py-2 px-2 md:px-6 text-left">Items</th>
                  <th className="py-2 px-2 md:px-6 text-center hidden md:table-cell">
                    Total Amount
                  </th>
                  <th className="py-2 px-2 md:px-6 text-center hidden md:table-cell">
                    Shipping Address
                  </th>
                  <th className="py-2 px-2 md:px-6 text-center">Status</th>
                  <th className="py-2 px-2 md:px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-xs md:text-sm font-light">
                {orders.map((order) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={order.id}
                  >
                    <td className="py-2 px-2 md:px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 md:px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center" key={item.id}>
                          <div className="mr-2">
                            <img
                              className="w-4 h-4 md:w-6 md:h-6 rounded-full"
                              src={item.thumbnail}
                              alt={item.title}
                            />
                          </div>
                          <span className="text-xs md:text-sm">
                            {item.title} - #{item.quantity} - $
                            {discountedPrice(item)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-2 md:px-6 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-2 px-2 md:px-6 text-center hidden md:table-cell">
                      <div className="text-xs md:text-sm">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>
                        </div>
                        <div>{order.selectedAddress.street}</div>
                        <div>{order.selectedAddress.city}</div>
                        <div>{order.selectedAddress.pinCode}</div>
                        <div>{order.selectedAddress.phone}</div>
                      </div>
                    </td>
                    <td className="py-2 px-2 md:px-6 text-center">
                      {order.id === editableOrderId ? (
                        <div className="flex items-center justify-center">
                          <select
                            className="text-xs md:text-sm"
                            onChange={(e) => handleUpdate(e, order)}
                            value={order.status}
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2 md:px-6 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-2 mr-2 md:mr-6 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon
                            className="w-4 h-4 md:w-6 md:h-6"
                            onClick={() => handleShow(order)}
                          />
                        </div>
                        <div className="w-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon
                            className="w-4 h-4 md:w-6 md:h-6"
                            onClick={() => handleEdit(order)}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
}

export default AdminOrder;
