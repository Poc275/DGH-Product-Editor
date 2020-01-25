import React, { Component } from 'react';
import Product from './Product';

class ProductList extends Component {
    state = {
        products: [],
    };

    componentDidUpdate(prevProps) {
        // remember to set a condition otherwise an infinite loop will occur
        // as the component keeps updating and calling this function
        if(this.props.fileUrl !== prevProps.fileUrl) {
            window.d3.csv(this.props.fileUrl).then(data => {
                this.setState({
                    products: data
                });
            });
        }
    }

    render() {
        // remember to use parens in the map() inner function as this 
        // returns an object (curly braces evaluate an expression)
        const productComponents = this.state.products.map((product) => (
            <Product 
                key={product.ID}
                title={product.Name}
                description={product["Short description"]}
                categories={product.Categories}
                tags={product.Tags}
                stock={product.Stock}
                price={product["Regular price"]}
                imageUrl={product.Images.split(',')[0]}
            />
        ));

        return (
            <div className="ui divided unstackable items">
                {productComponents}
            </div>
        );
    }
}

export default ProductList;