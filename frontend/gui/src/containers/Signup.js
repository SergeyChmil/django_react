import React from 'react';

import {
    Form,
    Input,
    Icon,
 Button,
} from 'antd';
import {NavLink} from 'react-router-dom';
import * as actions from '../store/actions/auth';
import {connect} from 'react-redux';

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onAuth(
                    values.username,
                    values.email,
                    values.password,
                    values.confirm
                );
            }
            this.props.history.push('/');
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        }
        else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true,
                            message: 'Please input your username!'
                        }],
                    })(
                        <Input
                            prefix={<Icon type="user"
                                          style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input
                        prefix={<Icon type="mail"
                                      style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Email"
                    />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password/>)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            style={{marginRight: '10px'}}>Signup</Button>
                    Or
                    <NavLink style={{marginLeft: '10px'}} to='/login/'>
                        login
                    </NavLink>
                </Form.Item>

            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) =>
            dispatch(actions.authSignup(username, email, password1, password2)),
    };
};

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);