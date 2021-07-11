import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export default function User() {
    
    return (
        <div>
            <Container>
                <h3 className="text-center pt-3"> Post your best game here </h3>
                <form onSubmit={()=> this.handleSubmit()}>
                    <div className="form-group game-form">
                        <br />
                        <input
                            id="gameTitle"
                            type="text"
                            // value={this.state.value}
                            // onChange={this.handleChange}
                            className="form-control"
                            placeholder="Game title"
                            required />
                        <input
                            id="gameYear"
                            type="text"
                            // ref={(input) => { this.gameYear = input }}
                            className="form-control"
                            placeholder="Game year"
                            required />
                        <input
                            id="gamePrice"
                            type="text"
                            // ref={(input) => { this.gamePrice = input }}
                            className="form-control"
                            placeholder="Game price"
                            required />
                         
                    </div>
                        <button type="submit" className="btn btn-primary btn-block btn-lg"> Upload </button>
                </form>
            </Container>
        </div>
    );
}