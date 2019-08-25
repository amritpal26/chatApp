import React, { Component } from 'react';
import './message.css'

export default class Message extends Component {

    render(){

        const {
            text,
            isMine,
            startsSequence,
            endsSequence
        } = this.props;

        return(
            <div className={[
                'message',
                `${isMine ? 'mine' : ''}`,  
                `${startsSequence ? 'start' : ''}`,    
                `${endsSequence ? 'end' : ''}`    
            ].join(' ')}>
                <div className='bubble-container'>
                    <div className='bubble'>
                        { text }
                    </div>
                </div>
            </div>
        )
    }
}