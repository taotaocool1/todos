import React from 'react';
export default class OtherPage extends React.Component {
    render() {
        return (
            <div className="otherBackground">
                <span>
                    <a href="/">这是一个路由跳转的新的页面:<br />
                        (获取参数:{this.props.location.query.values})
                    </a>
                </span>

            </div>
        );
    }
}