import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './component/Navbar';
import GameStore from './build/GameStore.json';
import Landing from './pages/landing/Landing';
import Store from './pages/store/Store';
import User from './pages/user/User';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { render } from '@testing-library/react';


class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockChainData()
  }

  // Load web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected.')
    }
  }

  async loadBlockChainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    // console.log(accounts[0])
    this.setState({ account: accounts[0] })

    // Get network ID
    const networkId = await web3.eth.net.getId()
    const networkData = GameStore.networks[networkId]
    this.setState({ loading: false })
    
    if (networkData) { // Get address
      const gamestore = new web3.eth.Contract(GameStore.abi, networkData.address)
      this.setState({ gamestore })
      const gameCount = await gamestore.methods.gameCount().call() 

      // fetch
      for (var i = 1; i <= gameCount; i++) {
        const game = await gamestore.games(i)
        const gameId = game[0].toNumber()
        const gameTitle = game[1]
        const gameYear = game[2]
        const gamePrice = game[3]
        // const storeId = game[4]
      }
    } else {
      alert('Unable to find network')
    }
  }

  // Handle submit
  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      gamestore: null,
      gamesOwned: [],
      loading : true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="app-container">
        { this.state.loading ? <div id="loader" className="text-center mt-5"> Loading... </div> : <Store /> }

        </div>

      </div>
    );
  }
}

export default App;
