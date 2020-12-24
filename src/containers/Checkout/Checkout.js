import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // dummy data
    /*  state = {
          ingredients: null,
          totalPrice: null,
      }
  
      componentWillMount() {
          const query = new URLSearchParams(this.props.location.search);
          const ingredients = {};
          let price = null;
          for (let param of query.entries()) {
              const key = param[0], val = param[1];
              if (key === 'price')
                  price = +val;
              else
                  ingredients[key] = +val;
          }
          this.setState({ingredients: ingredients, totalPrice: price})
  
      } */
    CheckoutCancelledHandler = () => {this.props.history.goBack()};
    CheckoutContinuedHandler = () => {this.props.history.replace('/checkout/contact-data')};


    render() {
        return (<Aux>
            <CheckoutSummary
                ingredients={this.props.ingredients}
                checkoutCancelled={this.CheckoutCancelledHandler}
                checkoutContinued={this.CheckoutContinuedHandler} />

            <Route
                path={this.props.match.path + '/contact-data'}
                component={ContactData} />
        </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    };
}
export default connect(mapStateToProps)(Checkout);
