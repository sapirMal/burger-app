import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withError from '../../hoc/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const ordersArr = [];
                for (let key in res.data) {
                    ordersArr.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: ordersArr, loading: false});
            })
            .catch(err => {
                this.setState({loading: false})
            }
            )
    }
    render() {
        return (
            <div>
                {this.state.orders.map(
                    order =>
                        <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={+order.price} />)}
            </div>
        );
    }
}

export default withError(Orders, axios);
