import React from 'react';
import axios from 'axios';

import {Card, Button} from 'antd';

import CustomForm from '../components/Form';

class ArticleDetail extends React.Component {
    state = {
        article: {}
    };

    componentDidMount() {
        const articleID = this.props.match.params.articleID;

        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res => {
                this.setState({
                    article: res.data,
                });
                console.log(res.data);
            });
    }

    handleDelete = (event) => {
        event.preventDefault();
        const articleID = this.props.match.params.articleID;
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`);

        this.props.history.push('/');
        // this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                    <h4>{this.state.article.description}</h4>
                    <p>{this.state.article.content}</p>
                </Card>
                <CustomForm
                    requestType="put"
                    btnText="Update"
                    articleID={this.props.match.params.articleID}
                />
                <form onSubmit={(e) => this.handleDelete(
                    e,
                    this.props.requestType,
                    this.props.articleID,
                )}>
                    <Button
                        type="danger"
                        htmlType="submit"
                    >Delete</Button>
                </form>
            </div>
        );
    }
}

export default ArticleDetail;