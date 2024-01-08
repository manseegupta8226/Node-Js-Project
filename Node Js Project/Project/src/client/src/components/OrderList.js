const OrderList = ({ orders }) => {
    return (
      <div className="blog-list">
        {orders.map(order => (
          <div className="blog-preview" key={order._id} >
            <h3>{ order.orderItem }</h3>
            <p> subtotal: { order.sub_total }</p>
          </div>
        ))}
      </div>
    );
  }
   
  export default OrderList;