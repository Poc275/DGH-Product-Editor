import React, { Component } from 'react';

class Product extends Component {
    render() {
        const imageUrl = this.props.imageUrl !== "" ? this.props.imageUrl : "images/image-aqua.png";
        const categories = this.props.categories !== "" ? this.props.categories : null;
        const tags = this.props.tags !== "" ? this.props.tags : null;

        return (
            <div className="item">
                <div className="image">
                    <img src={imageUrl} alt="Product thumbnail" />
                </div>
                <div className="middle aligned content">
                    <div className="header">
                        {this.props.title}
                    </div>
                    <div className="meta">
                        <span className="price">
                            {new Intl.NumberFormat('en-GB', {style: 'currency', currency: 'GBP'}).format(this.props.price)}
                        </span>
                        <span className="stock">Stock: {this.props.stock}</span>
                    </div>
                    <div className="description">
                        <p>{this.props.description}</p>
                    </div>
                    <div className="extra">
                        <small>{categories}</small>
                        <small>
                            {tags === null ? null : <i className="tags icon"></i>}
                            {tags}
                        </small>
                        <div className="ui right floated button">
                            Edit
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;