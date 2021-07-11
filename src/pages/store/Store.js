import React, { Component } from 'react';
import { Container } from 'react-bootstrap';


export default function Store() {
    return (
        <div>
            <Container>
            { this.props.games.map((game, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <small className="text-muted">{game.storeId}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{game.title}</p>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </Container>
        </div>
    );
}