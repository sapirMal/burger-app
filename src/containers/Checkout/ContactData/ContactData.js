import React, {Component} from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        formOrder: {
            name: {
                value: '',
                label: 'Full Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                elementType: 'input'
            },
            phone: {
                value: '',
                label: 'Phone Number',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone',
                    pattern: '05[0-9]{8}'

                },
                rules: {},
                valid: false,
                tach: false,
                elementType: 'input'
            },
            email: {
                value: '',
                label: 'Email',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                elementType: 'input'
            },
            street: {
                label: 'Address',
                value: '',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                elementType: 'input'
            },
            number: {
                value: '',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Apartment number'
                },
                elementType: 'input'
            },
            city: {
                value: '',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                elementType: 'input'
            },
            deliveryMethod: {
                label: 'Delivery Method',
                value: '',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                elementType: 'select'
            },

        },

        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const data = {};
        for (const key in this.state.formOrder) {
            data[key] = this.state.formOrder[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            // in real app this calculate will be on the serve! 
            price: this.props.price,
            contactData: data,

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

    inputChangeHandler = (event, id) => {
        const updateForm = {...this.state.formOrder};
        const updateInput = {...updateForm[id]};
        updateInput.value = event.target.value;
        updateForm[id] = updateInput;
        this.setState({formOrder: updateForm});
    }

    render() {
        let form;
        let inputsArray = [];
        for (let key in this.state.formOrder) {
            inputsArray.push({id: key, config: this.state.formOrder[key]});
        }
        if (this.state.loading)
            form = <Spinner />;
        else
            form = <form onSubmit={this.orderHandler}>
                {inputsArray.map(el =>
                    <Input
                        key={el.id}
                        {...el.config}
                        changed={(e) => this.inputChangeHandler(e, el.id)} />
                )}
                <Button
                    btnType='Success'>
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