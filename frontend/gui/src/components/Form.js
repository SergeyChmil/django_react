import React from 'react';
import {Form, Input, Button} from 'antd';

import axios from 'axios';

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleId) => {
        event.preventDefault(); // stop page on reloading on submit
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        const content = event.target.elements.content.value;

        switch (requestType) {
            case 'post':
                return axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    description: description,
                    content: content,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            case 'put':
                return axios.put(`http://127.0.0.1:8000/api/${articleId}/`, {
                    title: title,
                    description: description,
                    content: content,
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            default:
        }
    };

    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.handleFormSubmit(
                    e,
                    this.props.requestType,
                    this.props.articleID,
                )}>
                    <Form.Item label="Title">
                        <Input name="title" placeholder="Put a title here"/>
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input name="description" placeholder="put description"/>
                    </Form.Item>
                    <Form.Item label="Content">
                        <Input name="content" placeholder="Put a content here"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default CustomForm;