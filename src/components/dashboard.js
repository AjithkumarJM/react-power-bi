import React, { Component } from 'react'
import Report from './Report'
import cookie from 'react-cookies';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // get the id , accessToken , embedUrl from here --- https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#             

            embedConfig: {
                id: "c52af8ab-0468-4165-92af-dc39858d66ad",
                embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed?reportId=c52af8ab-0468-4165-92af-dc39858d66ad",
                accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsIndjbiI6IlBvd2VyQmlBenVyZVNhbXBsZXMiLCJ3aWQiOiJmODFjMTk2Ni1lZGVlLTQxMWItOGY4YS1mODQ0NjAxOWIwNDQiLCJyaWQiOiJjNTJhZjhhYi0wNDY4LTQxNjUtOTJhZi1kYzM5ODU4ZDY2YWQiLCJpc3MiOiJQb3dlckJJU0RLIiwiYXVkIjoiaHR0cHM6Ly9hbmFseXNpcy53aW5kb3dzLm5ldC9wb3dlcmJpL2FwaSIsImV4cCI6MTUxNzMyMzU0MiwibmJmIjoxNTE3MzE5OTQyfQ._9uXlMR_EqgbV2FaSPMkbRG_yXoXJ22K9cTTEsYZAOQ"
            },            
        }
        this.onEmbedded = this.onEmbedded.bind(this);
    }

    onEmbedded(embed) {
        this.state.embedElement = embed // embed contains the element to be passed for  Report component
        console.log(`Report embedded: `, embed, this);
    }

    //  for custom filter     
    customFilter() {
        const filter = {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
                table: "Store",
                column: "Chain"
            },
            operator: "In",
            values: ["Lindseys"]
        };

        this.state.embedElement.setFilters([filter])
            .catch(function (errors) {
                Log.log(errors);
            });
    }

    render() {
        return (
            <div className="sample">
                <div className='padAdjust'>
                    <button className='btn btn-primary btn-sm' onClick={this.customFilter.bind(this)}>Click Here For Cutom Filter</button>
                </div>
                <div className="mainComponent">
                    <Report
                        id={this.state.embedConfig.id}
                        embedUrl={this.state.embedConfig.embedUrl}
                        accessToken={this.state.embedConfig.accessToken}
                        onEmbedded={this.onEmbedded}
                        filterPaneEnabled={true}
                        navContentPaneEnabled={true}
                    />
                </div>
            </div>
        )
    }
}

// For further assistance refer below links 
// 1. power bi react -- https://github.com/Microsoft/PowerBI-React 
// 2. power bi live demo -- https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#