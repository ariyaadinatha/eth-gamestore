import React, { Component } from 'react';
import Web3 from 'web3';
import Navbar from './component/Navbar';
import GameStore from './build/GameStore.json';
import Landing from './pages/landing/Landing';
import Store from './pages/store/Store';
import User from './pages/user/User';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from './pages/games/GameCard';
import { Link, Route, Switch } from "wouter";
// import { render } from '@testing-library/react';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

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
    // alert(networkId)
    const networkData = GameStore.networks[networkId]
    console.log(networkData)
    this.setState({ loading: false })
    
    if (networkData) { // Get address
      // alert('a')
      const gamestore = new web3.eth.Contract(GameStore.abi, networkData.address)
      this.setState({ gamestore })
      // console.log('gamestore')
      // console.log(gamestore)
      const gamesCount = await gamestore.methods.gameCount().call()
      console.log('gameCount')
      console.log(gamesCount)

      // fetch
      this.setState({ gamesCount })
      // Title, Year, Price
      // const game1 = await gamestore.methods.createGame("Elder Scroll VI", 2042, 1).call()
      // const game2 = await gamestore.methods.createGame("Cyberbug", 2077, 2).call()
      // const game3 = await gamestore.methods.createGame("GTA VI", 2025, 2).call()
      // const game4 = await gamestore.methods.createGame("DOTA 3", 2069, 2).call()

      console.log('fetch game')
      // fetch game
      for (var i = 1; i <= gamesCount; i++) {
        const game = await gamestore.methods.games(i).call()
        console.log('ini game')
        console.log(game)
        this.setState({
          games: [...this.state.games, game]
        })

      }
      console.log('state games')
      console.log(this.state.games)

      this.setState({ loading: false})

    } else {
      alert('Unable to find network')
    }
  }

  // Start
  uploadGame(title, year, price) {
    this.setState({ loading:true })
    this.state.gamestore.methods.createGame('Elder Scroll VI', '2042', '1').call()
    this.setState({ loading:false })
  }

  // tipImageOwner(id, tipAmount) {
  //   this.setState({ loading: true })
  //   this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
  //     this.setState({ loading: false })
  //   })
  // }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  // End

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      gamestore: null,
      gamesOwned: [],
      loading : true,
      value : '',
      games : []
    }
    console.log('a')
    console.log(this.state.games)
    this.uploadGame = this.uploadGame.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  

  render() {
  
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="app-container">

          {/* <div>
            <ul>
              {this.state.games.map(game => (
                <li key={game.id}>{game.title}</li>
              ))}
            </ul>
              </div> */}

        { this.state.loading ? <div id="loader" className="text-center mt-5"> Loading... </div>      
        : <Landing 
            games={this.state.games}
            uploadGame={this.uploadGame}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit} 
            /> 
        }

        </div>

      </div>
    );
  }
}

export default App;
