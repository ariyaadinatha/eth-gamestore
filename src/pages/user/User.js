import React, { Component } from 'react';
import { Container } from 'react-bootstrap';


export default function User() {
    return (
        <div>
            <Container>
                <h3 className="text-center pt-3"> Post your best game here </h3>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const title = this.gameTitle.value
                    this.props.uploadGame(title)
                }}>
                    <div className="form-group game-form">
                        <br />
                        <input 
                            id="gameTitle" 
                            type="text" 
                            // ref={(input) => {this.gameTitle = input}}
                            className="form-control"
                            placeholder="Game title"
                            required
                         />
                         <input 
                            id="gameTitle" 
                            type="text" 
                            // ref={(input) => {this.gameTitle = input}}
                            className="form-control"
                            placeholder="Release year"
                            required
                         />
                         <input 
                            id="gameTitle" 
                            type="text" 
                            // ref={(input) => {this.gameTitle = input}}
                            className="form-control"
                            placeholder="Price"
                            required
                         />
                         <input 
                            id="gameTitle" 
                            type="text" 
                            // ref={(input) => {this.gameTitle = input}}
                            className="form-control"
                            placeholder="Picture link (optional)"
                         />
                    </div>
                        <button type="submit" className="btn btn-primary btn-block btn-lg"> Upload </button>
                </form>
            </Container>
        </div>
    );
}