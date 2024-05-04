/* eslint-disable react/prop-types */
import { Component } from 'react';

class KommunicateChat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { user } = this.props;

        (function (d, m) {
            var kommunicateSettings = {
                appId: 'fb7f7439f6702da9b5d0e46b4bffc911',
                popupWidget: true,
                automaticChatOpenOnNavigation: true,
                // userDetails: {
                //     name: user.fullName,
                //     email: user.email,
                // },
            };
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
            var h = document.getElementsByTagName('head')[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }

    render() {
        return <div></div>;
    }
}

export default KommunicateChat;
