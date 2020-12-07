import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        address: {
            street: '',
            number: '',
            city: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            // in real app this calculate will be on the serve! 
            price: this.props.price,
            costumer: {
                name: 'Sapir Mal',
                address: {
                    street: 'Ben-Gurion',
                    number: '120',
                    city: 'Be\'er-Sheva',
                },
                email: 'blabla@gmail.com',
                phone: '052222254',
            },
            deliveryMethod: 'fastest',
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false});
                console.log(res);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
            });
    }

    render() {
        let form;
        if (this.state.loading)
            form = <Spinner />;
        else
            form = <form>
                <input type='text' name='name' placeholder='Your Name'></input>
                <input type='number' name='phone' placeholder='Your Phone'></input>
                <input type='email' name='email' placeholder='Your Mail'></input>
                <input type='text' name='street' placeholder='Street'></input>
                <input type='text' name='postcode' placeholder='Postal Code'></input>
                <Button
                    btnType='Success'
                    clicked={this.orderHandler}>
                    ORDER</Button>
            </form>;
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;