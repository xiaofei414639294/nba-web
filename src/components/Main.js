import React from 'react';
import { Profile } from './Profile';
import nba from 'nba';
import { DataViewContainer } from './DataViewContainer';
import { SearchBar } from './SearchBar';
import { DEFAULT_PLAYER_INFO } from '../constants';

export class Main extends React.Component {
    state = {
        playerInfo: DEFAULT_PLAYER_INFO,
    }

    componentDidMount() {
        this.loadPlayerInfo(DEFAULT_PLAYER_INFO.fullName);
    }

    loadPlayerInfo = (playerName) => {
        const playerId = nba.findPlayer(playerName).playerId;
        nba.stats.playerInfo({PlayerID: playerId}).then((response) => {
            const playerInfo = Object.assign({},
                response.commonPlayerInfo[0],
                response.playerHeadlineStats[0]);

            this.setState({
                playerInfo
            });
        });
    }

    render() {
        console.log(this.state.playerInfo);
        return (
            <div className='main'>
                <SearchBar loadPlayerInfo = {this.loadPlayerInfo}/>
                <div className='player'>
                    <Profile playerInfo = {this.state.playerInfo}/>
                    <DataViewContainer playerId = {this.state.playerInfo.playerId} />
                </div>
            </div>
        );
    }
}