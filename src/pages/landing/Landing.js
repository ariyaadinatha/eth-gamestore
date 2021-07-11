import React, { Component, useState } from 'react';
import { Container, Row, Card } from 'react-bootstrap';


export default function Landing(props) {
    return (
        <Container>
            <div>
                <ul>
                  {props.games.map(game => (
                    <li key={game.id}>{game.title}</li>
                  ))}
                </ul>
          </div>
        </Container>
    );
}