import React from 'react';
import {ShotChart} from "./ShotChart";
import { Radio } from 'antd';
import { Switch } from 'antd';
import _ from 'lodash';
import { CountSlider } from "./CountSlider";

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: "hexbin",
        displayTooltip: true,
    }

    onCountSliderChange = (value) => {
        this.setState({
            minCount: value,
        });
    }

    onTooltipChange = (checked) =>{
        this.setState({
            displayTooltip: checked,
        });
    }

    onChartTypeChange = (e) => {
        this.setState({
            chartType: e.target.value,
        });
    }

    render(){
            const { minCount, chartType, displayTooltip } = this.state;

            return (
                <div className='data-view' >
                    <ShotChart playerId = {this.props.playerId}
                               minCount = {minCount}
                               chartType = { chartType }
                               displayTooltip = {displayTooltip} />
                    {
                        (chartType === "hexbin" ? <CountSlider onChange = {_.debounce(this.onCountSliderChange, 500)}
                                                                defaultValue = {minCount}/> : null )
                    }

                    <div className='controller'>
                        <RadioGroup onChange={this.onChartTypeChange} value={chartType}>
                            <Radio value="hexbin">Hexbin</Radio>
                            <Radio value="scatter">Scatter</Radio>
                        </RadioGroup>
                        <Switch checkedChildren="on" unCheckedChildren="off" defaultChecked onChange={this.onTooltipChange}/>
                    </div>
                </div>
             );
        }
}