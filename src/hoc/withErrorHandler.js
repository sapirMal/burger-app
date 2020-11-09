import React, {Component} from 'react';
import Aux from './Auxiliary';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {

        state = {
            error: null,
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                /* must have return value */
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        closeModalError = () => {
            this.setState({error: null})
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        closeModal={this.closeModalError}  >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            );

        }
    }
}

export default withErrorHandler;