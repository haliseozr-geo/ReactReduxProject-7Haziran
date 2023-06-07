import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Table, Button } from "reactstrap";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";

class Detail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " removed from cart!");
  }
  totalPrice() {
    let total = 0;
    this.props.cart.map((cartItem) => {
      total += cartItem.product.price * cartItem.quantity;
    });
    return total;
  }
  componentDidMount(){
    this.totalPrice()
  }

  render() {
    return (
      <div>
        <h2>Cart Detail</h2>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.product.price}</td>
                <td>{cartItem.quantity * cartItem.product.price}</td>
                
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.removeFromCart(cartItem.product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h2>{this.totalPrice() + " TL"}</h2>
        <Button color="warning"><Link to="/credit">Satın Al</Link></Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
      totalPrice: bindActionCreators(cartActions.totalPrice, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
