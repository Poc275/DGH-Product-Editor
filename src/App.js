import React, { Component } from 'react';
import './App.css';
import ProductList from './ProductList';

class App extends Component {
  state = {
    productsFileUrl: null
  };

  loadProductsFile = (e) => {
    // prevent form submission forcing a page reload
    e.preventDefault();
    const fileInput = document.getElementById("products-file").files;
    if(fileInput.length > 0) {
      const selectedFile = document.getElementById("products-file").files[0];
      const selectedFileUrl = window.URL.createObjectURL(selectedFile);
      this.setState({
        productsFileUrl: selectedFileUrl
      });
    }
  };

  componentWillUnmount() {
    // remove ref to file URL
    window.URL.revokeObjectURL(this.state.productsFileUrl);
  }

  render() {
    return (
      <div>
        <form className="ui form" encType="multipart/form-data" onSubmit={this.loadProductsFile}>
            <div className="field">
                <label>1. Load products export (CSV file)</label>
                <input type="file" id="products-file" name="products-file" accept=".csv" />
            </div>
            <button className="ui button">Load</button>
        </form>

        <ProductList fileUrl={this.state.productsFileUrl} />
      </div>
    );
  }
}

export default App;
