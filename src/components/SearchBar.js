import React from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import nba from 'nba';
import {PROFILE_PIC_URL_PREFIX, TEAM_PIC_URL_PREFIX} from "../constants"

const Option = AutoComplete.Option;

export class SearchBar extends React.Component{
    state = {
        dataSource: [],
    }

    onSelect = (value) => {
        console.log('onSelect', value);
        this.props.loadPlayerInfo(value);
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(
                ({fullName, playerId}) =>
                    <Option key={playerId} value={fullName}>
                        <img className = 'player-option-image'
                             src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                             alt = "Profile"
                        />
                        <span className='player-option-label'>{fullName}</span>
                    </Option>
            ),
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                className='search-bar'
                dataSource={dataSource}
                onSelect={this.onSelect}
                size="large"
                onSearch={this.handleSearch}
                placeholder="Search NBA Player"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" />} />
            </AutoComplete>
        )
    }
}