import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'

export default class PostDetails extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        if (isEmptyObject(this.props.eventDetails)) {
            hashHistory.push("/gateway")
        }
    }

    render() {
        const {eventDetails, pathname} = this.props
        if (isEmptyObject(eventDetails)) {
            return (<div></div>)
        }
        const vals = Object.keys(eventDetails).map(function (key) {
            return eventDetails[key];
        });
        const postDataJSON = JSON.parse(vals[0][0].PostData);
        const responseContentJSON = JSON.parse(vals[0][0].ResponseContent);

        return (
            <div style={{ backgroundColor: "#fff", height: "100%", overflow: "auto" }}>
                {
                    pathname.indexOf("postData") !== -1 ?
                        <div>
                            <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(postDataJSON) }} style={{ fontSize: "36px" }}></pre>
                        </div>
                        :
                        <div>
                            <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(responseContentJSON) }} style={{ fontSize: "36px" }} ></pre>
                        </div>
                }
            </div>
        )
    }
}


function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 1).replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;").replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
    }
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

