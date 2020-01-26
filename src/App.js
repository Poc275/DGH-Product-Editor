import React, { Component } from 'react';
import './App.css';
import ProductList from './ProductList';
import 'animate.css/animate.min.css';

class App extends Component {
  state = {
    productsFileUrl: null
  };

  animateCss = (element, animationName, callback) => {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      if (typeof callback === 'function') {
        callback();
      }
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

  loadProductsFile = (e) => {
    // prevent form submission forcing a page reload
    e.preventDefault();
    const fileInput = document.getElementById("products-file").files;
    if(fileInput.length > 0) {
      const selectedFile = document.getElementById("products-file").files[0];
      const selectedFileUrl = window.URL.createObjectURL(selectedFile);
      this.setState({
        productsFileUrl: selectedFileUrl
      }, () => {
        // animate transitions
        this.animateCss('#products-upload-form', 'slideOutUp', function() {
          // hide after animation
          const node = document.querySelector('#products-upload-form');
          node.className += ' hidden';
        });

        // show products list div and animate it in
        const node = document.querySelector('#product-list');
        node.className -= ' hidden';
        this.animateCss('#product-list', 'fadeInUp');
      });
    }
  }

  componentWillUnmount() {
    // remove ref to file URL
    window.URL.revokeObjectURL(this.state.productsFileUrl);
  }

  render() {
    return (
      <div>
        <form className="ui form" id="products-upload-form" encType="multipart/form-data" onSubmit={this.loadProductsFile}>
            <div className="field">
                <label>Load products export (CSV file)</label>
                <input type="file" id="products-file" name="products-file" accept=".csv" />
            </div>
            <button className="ui button">Load</button>
        </form>

        <div className="hidden" id="product-list">
          <h3>Edit products</h3>
          <ProductList fileUrl={this.state.productsFileUrl} />
        </div>
      </div>
    );
  }
}

export default App;
